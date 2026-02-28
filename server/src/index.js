import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { initializeDatabase } from './db/init.js';
import usersRouter from './routes/users.js';
import cardsRouter from './routes/cards.js';
import walletRouter from './routes/wallet.js';
import benefitsRouter from './routes/benefits.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// CORS for development
if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}

app.use(express.json());

const db = initializeDatabase();

// API routes
app.use('/api/users', usersRouter(db));
app.use('/api/cards', cardsRouter(db));
app.use('/api/wallet', walletRouter(db));
app.use('/api/benefits', benefitsRouter(db));

// Serve static frontend in production
const clientDistPath = join(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

// Handle client-side routing - serve index.html for all non-API routes
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(join(clientDistPath, 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
