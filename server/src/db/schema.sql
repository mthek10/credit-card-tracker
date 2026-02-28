-- Users table (email-based auth with magic links)
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Magic link tokens for passwordless auth
CREATE TABLE IF NOT EXISTS magic_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires_at TEXT NOT NULL,
    used INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Card templates (pre-defined and custom cards)
CREATE TABLE IF NOT EXISTS card_templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    issuer TEXT NOT NULL,
    annual_fee REAL NOT NULL DEFAULT 0,
    is_custom INTEGER NOT NULL DEFAULT 0,
    user_id INTEGER,
    image_color TEXT DEFAULT '#4F46E5',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Benefits associated with each card template
CREATE TABLE IF NOT EXISTS card_benefits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    card_template_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL CHECK (type IN ('credit', 'points_multiplier', 'perk')),
    value REAL NOT NULL,
    max_value REAL,
    category TEXT,
    reset_period TEXT DEFAULT 'cardmember_year',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (card_template_id) REFERENCES card_templates(id) ON DELETE CASCADE
);

-- User's cards in their wallet
CREATE TABLE IF NOT EXISTS user_cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    card_template_id INTEGER NOT NULL,
    open_date TEXT NOT NULL,
    nickname TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (card_template_id) REFERENCES card_templates(id) ON DELETE CASCADE
);

-- Benefit usage tracking
CREATE TABLE IF NOT EXISTS benefit_usage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_card_id INTEGER NOT NULL,
    benefit_id INTEGER NOT NULL,
    amount_used REAL NOT NULL,
    used_date TEXT NOT NULL,
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_card_id) REFERENCES user_cards(id) ON DELETE CASCADE,
    FOREIGN KEY (benefit_id) REFERENCES card_benefits(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_magic_links_token ON magic_links(token);
CREATE INDEX IF NOT EXISTS idx_magic_links_email ON magic_links(email);
CREATE INDEX IF NOT EXISTS idx_card_templates_user ON card_templates(user_id);
CREATE INDEX IF NOT EXISTS idx_card_benefits_template ON card_benefits(card_template_id);
CREATE INDEX IF NOT EXISTS idx_user_cards_user ON user_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_user_cards_template ON user_cards(card_template_id);
CREATE INDEX IF NOT EXISTS idx_benefit_usage_user_card ON benefit_usage(user_card_id);
CREATE INDEX IF NOT EXISTS idx_benefit_usage_benefit ON benefit_usage(benefit_id);
