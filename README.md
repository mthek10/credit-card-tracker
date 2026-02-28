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

## Deployment on Railway (Recommended)

### Quick Deploy

1. Push this repo to GitHub
2. Go to [Railway](https://railway.app) and sign in with GitHub
3. Click **New Project** → **Deploy from GitHub repo**
4. Select `credit-card-tracker`
5. Add a volume for persistent data:
   - Go to your service → **Settings** → **Volumes**
   - Click **Add Volume**
   - Mount path: `/data`
6. Add environment variable:
   - Go to **Variables** tab
   - Add `DATA_PATH` = `/data`
7. Redeploy to apply changes

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATA_PATH` | Yes | Set to `/data` (matches volume mount) |
| `SMTP_HOST` | No | SMTP server (e.g., smtp.gmail.com) |
| `SMTP_PORT` | No | SMTP port (usually 587) |
| `SMTP_USER` | No | Email username |
| `SMTP_PASS` | No | Email password or app password |
| `SMTP_FROM` | No | From address |

Without SMTP config, magic links are logged to console (check Railway logs).

## Alternative: Render

You can also deploy on Render using the included `render.yaml`, but the free tier doesn't include persistent storage.

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
