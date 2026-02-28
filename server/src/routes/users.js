import { Router } from 'express';
import { generateToken, generateTokenExpiry } from '../db/init.js';
import { sendMagicLinkEmail } from '../services/email.js';

export default function usersRouter(db) {
  const router = Router();

  // Request magic link (login or signup)
  router.post('/magic-link', async (req, res) => {
    try {
      const { email, name } = req.body;
      console.log('Magic link request:', { email, name: name || '(not provided)' });

      if (!email || !email.includes('@')) {
        console.log('Invalid email rejected');
        return res.status(400).json({ error: 'Valid email is required' });
      }

      const normalizedEmail = email.toLowerCase().trim();

      // Check if user exists
      let user = db.prepare('SELECT * FROM users WHERE email = ?').get(normalizedEmail);
      
      // If new user, name is required
      if (!user && !name) {
        console.log('New user, name required');
        return res.status(400).json({ 
          error: 'Name is required for new accounts',
          isNewUser: true 
        });
      }
      console.log('User lookup:', user ? `Found user ${user.id}` : 'Creating new user');

      // Create user if doesn't exist
      if (!user) {
        try {
          const result = db.prepare('INSERT INTO users (email, name) VALUES (?, ?)').run(normalizedEmail, name.trim());
          user = { id: result.lastInsertRowid, email: normalizedEmail, name: name.trim() };
          console.log('Created user:', user.id);
        } catch (dbError) {
          console.error('Failed to create user:', dbError.message);
          throw dbError;
        }
      }

      // Generate magic link token
      const token = generateToken();
      const expiresAt = generateTokenExpiry(15); // 15 minutes
      console.log('Generated token, expires:', expiresAt);

      // Invalidate any existing unused tokens for this email
      try {
        db.prepare('UPDATE magic_links SET used = 1 WHERE email = ? AND used = 0').run(normalizedEmail);
        console.log('Invalidated old tokens');
      } catch (dbError) {
        console.error('Failed to invalidate old tokens:', dbError.message);
        throw dbError;
      }

      // Store new token
      try {
        db.prepare(`
          INSERT INTO magic_links (email, token, expires_at)
          VALUES (?, ?, ?)
        `).run(normalizedEmail, token, expiresAt);
        console.log('Stored new token');
      } catch (dbError) {
        console.error('Failed to store token:', dbError.message);
        throw dbError;
      }

      // Send email
      const baseUrl = req.headers.origin || `http://localhost:${process.env.PORT || 5173}`;
      const hasSmtp = !!process.env.SMTP_HOST;
      
      try {
        const emailResult = await sendMagicLinkEmail(normalizedEmail, token, baseUrl);
        res.json({ 
          success: true, 
          message: hasSmtp ? 'Magic link sent! Check your email.' : 'Magic link generated!',
          // Include token when no SMTP configured (for testing)
          ...(!hasSmtp && { devToken: token })
        });
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        // If email fails but no SMTP configured, still return token
        if (!hasSmtp) {
          res.json({ 
            success: true, 
            message: 'Magic link generated (no email configured)',
            devToken: token
          });
        } else {
          res.status(500).json({ error: 'Failed to send email. Please try again.' });
        }
      }
    } catch (error) {
      console.error('Error requesting magic link:', error);
      res.status(500).json({ error: 'Failed to process request' });
    }
  });

  // Verify magic link token
  router.post('/verify', (req, res) => {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({ error: 'Token is required' });
      }

      // Find the token
      const magicLink = db.prepare(`
        SELECT * FROM magic_links WHERE token = ? AND used = 0
      `).get(token);

      if (!magicLink) {
        return res.status(400).json({ error: 'Invalid or expired link. Please request a new one.' });
      }

      // Check expiry
      if (new Date(magicLink.expires_at) < new Date()) {
        db.prepare('UPDATE magic_links SET used = 1 WHERE id = ?').run(magicLink.id);
        return res.status(400).json({ error: 'This link has expired. Please request a new one.' });
      }

      // Mark token as used
      db.prepare('UPDATE magic_links SET used = 1 WHERE id = ?').run(magicLink.id);

      // Get or create user
      const user = db.prepare('SELECT * FROM users WHERE email = ?').get(magicLink.email);

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.created_at,
      });
    } catch (error) {
      console.error('Error verifying token:', error);
      res.status(500).json({ error: 'Failed to verify token' });
    }
  });

  // Get user by ID
  router.get('/:id', (req, res) => {
    try {
      const user = db.prepare(`
        SELECT id, email, name, created_at FROM users WHERE id = ?
      `).get(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.created_at,
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  });

  // Update user name
  router.put('/:id', (req, res) => {
    try {
      const { name } = req.body;

      if (!name || name.trim().length === 0) {
        return res.status(400).json({ error: 'Name is required' });
      }

      db.prepare('UPDATE users SET name = ? WHERE id = ?').run(name.trim(), req.params.id);

      res.json({ success: true });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  });

  // Cleanup expired tokens (can be called periodically)
  router.delete('/cleanup-tokens', (req, res) => {
    try {
      const result = db.prepare(`
        DELETE FROM magic_links WHERE expires_at < datetime('now') OR used = 1
      `).run();

      res.json({ deleted: result.changes });
    } catch (error) {
      console.error('Error cleaning up tokens:', error);
      res.status(500).json({ error: 'Failed to cleanup tokens' });
    }
  });

  return router;
}
