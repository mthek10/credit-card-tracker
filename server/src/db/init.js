import Database from 'better-sqlite3';
import { readFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function initializeDatabase() {
  // Use environment variable for data path (Railway uses /data volume)
  // Fallback to local data folder for development
  const dataDir = process.env.DATA_PATH || process.env.RAILWAY_VOLUME_MOUNT_PATH || join(__dirname, '../../data');
  
  // Ensure data directory exists
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }
  
  const dbPath = join(dataDir, 'wallet.db');
  const db = new Database(dbPath);
  
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // Check if we need to migrate (check for magic_links table)
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='magic_links'").get();
  
  if (!tables) {
    console.log('Initializing database schema...');
    
    // Drop and recreate tables for clean schema
    db.exec(`
      DROP TABLE IF EXISTS benefit_usage;
      DROP TABLE IF EXISTS user_cards;
      DROP TABLE IF EXISTS card_benefits;
      DROP TABLE IF EXISTS card_templates;
      DROP TABLE IF EXISTS magic_links;
      DROP TABLE IF EXISTS users;
    `);
  }

  const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
  db.exec(schema);

  // Check card count - if less than 30, reseed with expanded library
  const hasCards = db.prepare('SELECT COUNT(*) as count FROM card_templates WHERE user_id IS NULL').get();
  if (hasCards.count < 30) {
    console.log('Seeding database with expanded card library...');
    
    // Need to delete in correct order due to foreign key constraints:
    // 1. benefit_usage references user_cards
    // 2. user_cards references card_templates
    // 3. card_benefits references card_templates
    
    // Get IDs of global card templates
    const globalTemplateIds = db.prepare('SELECT id FROM card_templates WHERE user_id IS NULL').all().map(r => r.id);
    
    if (globalTemplateIds.length > 0) {
      const idList = globalTemplateIds.join(',');
      
      // Delete benefit_usage for user_cards that use global templates
      db.exec(`
        DELETE FROM benefit_usage WHERE user_card_id IN (
          SELECT id FROM user_cards WHERE card_template_id IN (${idList})
        );
      `);
      
      // Delete user_cards that reference global templates
      db.exec(`DELETE FROM user_cards WHERE card_template_id IN (${idList});`);
      
      // Delete card_benefits for global templates
      db.exec(`DELETE FROM card_benefits WHERE card_template_id IN (${idList});`);
      
      // Delete global card templates
      db.exec(`DELETE FROM card_templates WHERE user_id IS NULL;`);
    }
    
    const seed = readFileSync(join(__dirname, 'seed.sql'), 'utf-8');
    db.exec(seed);
    console.log('Database seeded with', db.prepare('SELECT COUNT(*) as count FROM card_templates WHERE user_id IS NULL').get().count, 'cards');
  }

  return db;
}

export function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

export function generateTokenExpiry(minutes = 15) {
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + minutes);
  return expiry.toISOString();
}
