# CardTracker - Credit Card Benefits Tracker

A web app to track your credit card benefits, annual fees, and see if you're getting your money's worth.

## Features

- **Card Library**: Browse popular credit cards (Amex, Chase, Capital One, Citi)
- **Wallet Management**: Add cards with your open date for cardmember year tracking
- **Benefit Tracking**: Log usage of credits, perks, and bonuses with progress bars
- **Value Dashboard**: See net positive/negative for each card and overall wallet
- **Magic Link Auth**: Passwordless login via email

## Tech Stack

- **Frontend**: React 18 + Vite + TailwindCSS
- **Backend**: Node.js + Express
- **Database**: SQLite
- **Auth**: Magic link emails via Nodemailer

## Local Development

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
# Install dependencies
npm install

# Start development servers
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## Deployment on Render

### Quick Deploy

1. Push this repo to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Click "New" → "Blueprint"
4. Connect your GitHub repo
5. Render will auto-detect `render.yaml` and deploy

### Environment Variables (Optional)

For real email sending, set these in Render dashboard:

| Variable | Description |
|----------|-------------|
| `SMTP_HOST` | SMTP server (e.g., smtp.gmail.com) |
| `SMTP_PORT` | SMTP port (usually 587) |
| `SMTP_USER` | Email username |
| `SMTP_PASS` | Email password or app password |
| `SMTP_FROM` | From address (e.g., "CardTracker" <noreply@example.com>) |

Without SMTP config, magic links are logged to console (dev mode).

## Project Structure

```
credit-card-rewards/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── context/        # React contexts
│   │   └── App.jsx
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── services/       # Email service
│   │   └── db/             # Database schema & seed
│   └── package.json
├── render.yaml             # Render deployment config
└── package.json            # Root workspace config
```

## License

MIT
