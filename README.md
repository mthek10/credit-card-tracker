# CardTracker - Credit Card Benefits Tracker

A web app to track your credit card benefits, annual fees, and see if you're getting your money's worth.

## Features

- **Card Library**: Browse popular credit cards (Amex, Chase, Capital One, Citi)
- **Wallet Management**: Add cards with your open date for cardmember year tracking
- **Benefit Tracking**: Log usage of credits, perks, and bonuses with progress bars
- **Value Dashboard**: See net positive/negative for each card and overall wallet
- **Magic Link Auth**: Passwordless login via email
- **Multi-User Support**: Each user has their own wallet and custom cards

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         RAILWAY                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Web Service                             │  │
│  │  ┌─────────────────┐      ┌─────────────────────────────┐ │  │
│  │  │  React Frontend │      │     Express Backend         │ │  │
│  │  │  (Static Build) │ ───► │     (Node.js API)           │ │  │
│  │  │                 │      │                             │ │  │
│  │  │  • Dashboard    │      │  • /api/users   (auth)      │ │  │
│  │  │  • Wallet       │      │  • /api/cards   (templates) │ │  │
│  │  │  • Card Library │      │  • /api/wallet  (user cards)│ │  │
│  │  │  • Card Details │      │  • /api/benefits (tracking) │ │  │
│  │  └─────────────────┘      └──────────────┬──────────────┘ │  │
│  │                                          │                 │  │
│  └──────────────────────────────────────────┼─────────────────┘  │
│                                             │                    │
│  ┌──────────────────────┐    ┌──────────────▼──────────────┐    │
│  │   Persistent Volume  │    │         Resend API          │    │
│  │   ┌──────────────┐   │    │   (Magic Link Emails)       │    │
│  │   │   SQLite DB  │   │    └─────────────────────────────┘    │
│  │   │  wallet.db   │   │                                        │
│  │   └──────────────┘   │                                        │
│  └──────────────────────┘                                        │
└─────────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 18 + Vite | Single-page application |
| **Styling** | TailwindCSS | Utility-first CSS with custom animations |
| **State** | React Context | Global state for user & wallet data |
| **Routing** | React Router v6 | Client-side navigation |
| **Backend** | Express.js | REST API server |
| **Database** | SQLite (better-sqlite3) | Embedded database with WAL mode |
| **Email** | Resend | Transactional email delivery |
| **Hosting** | Railway | Full-stack deployment with persistent storage |

## Database Schema

```sql
┌─────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   users     │     │  card_templates │     │   card_benefits │
├─────────────┤     ├─────────────────┤     ├─────────────────┤
│ id (PK)     │◄────┤ user_id (FK)    │◄────┤ card_template_id│
│ email       │     │ id (PK)         │     │ id (PK)         │
│ name        │     │ name            │     │ name            │
│ created_at  │     │ issuer          │     │ type            │
└─────────────┘     │ annual_fee      │     │ value           │
      │             │ is_custom       │     │ max_value       │
      │             │ image_color     │     │ reset_period    │
      │             └─────────────────┘     └─────────────────┘
      │                     │
      ▼                     ▼
┌─────────────────┐   ┌─────────────────┐
│  magic_links    │   │   user_cards    │
├─────────────────┤   ├─────────────────┤
│ id (PK)         │   │ id (PK)         │
│ email           │   │ user_id (FK)    │────►┌─────────────────┐
│ token           │   │ card_template_id│     │  benefit_usage  │
│ expires_at      │   │ open_date       │     ├─────────────────┤
│ used            │   │ nickname        │     │ id (PK)         │
└─────────────────┘   └─────────────────┘     │ user_card_id(FK)│
                                              │ benefit_id (FK) │
                                              │ amount_used     │
                                              │ used_date       │
                                              │ notes           │
                                              └─────────────────┘
```

## Authentication Flow

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  User    │     │ Frontend │     │ Backend  │     │  Resend  │
└────┬─────┘     └────┬─────┘     └────┬─────┘     └────┬─────┘
     │                │                │                │
     │ Enter email    │                │                │
     │───────────────►│                │                │
     │                │ POST /magic-link               │
     │                │───────────────►│                │
     │                │                │ Generate token │
     │                │                │ Store in DB    │
     │                │                │                │
     │                │                │ Send email     │
     │                │                │───────────────►│
     │                │                │                │
     │                │◄───────────────│                │
     │ "Check email"  │                │                │
     │◄───────────────│                │                │
     │                │                │                │
     │ Click link     │                │                │
     │ (/auth/verify?token=xxx)        │                │
     │───────────────►│                │                │
     │                │ POST /verify   │                │
     │                │───────────────►│                │
     │                │                │ Validate token │
     │                │                │ Mark as used   │
     │                │◄───────────────│                │
     │                │ Return user    │                │
     │ Logged in!     │ Store in localStorage           │
     │◄───────────────│                │                │
     └────────────────┴────────────────┴────────────────┘
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/magic-link` | Request magic link email |
| POST | `/api/users/verify` | Verify token and log in |
| GET | `/api/users/:id` | Get user profile |

### Cards
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cards?userId=X` | Get all card templates (global + user's custom) |
| POST | `/api/cards` | Create custom card template |
| PUT | `/api/cards/:id` | Update custom card |
| DELETE | `/api/cards/:id` | Delete custom card |

### Wallet
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/wallet?userId=X` | Get user's wallet cards with benefits |
| POST | `/api/wallet` | Add card to wallet |
| DELETE | `/api/wallet/:id` | Remove card from wallet |

### Benefits
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/benefits/usage/:userCardId` | Get benefit usage history |
| POST | `/api/benefits/usage` | Log benefit usage |
| DELETE | `/api/benefits/usage/:id` | Delete usage entry |

## Project Structure

```
credit-card-rewards/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/             # Reusable UI components
│   │   │   │   ├── CreditCard3D.jsx    # 3D card visual
│   │   │   │   ├── WalletCard.jsx      # Card in wallet
│   │   │   │   ├── ProgressBar.jsx     # Benefit progress
│   │   │   │   └── ...modals
│   │   │   ├── Dashboard.jsx   # Main dashboard
│   │   │   ├── Wallet.jsx      # User's cards
│   │   │   ├── CardLibrary.jsx # Browse templates
│   │   │   ├── CardDetails.jsx # Single card view
│   │   │   ├── AuthPage.jsx    # Login/signup
│   │   │   └── VerifyPage.jsx  # Magic link handler
│   │   ├── context/
│   │   │   ├── UserContext.jsx   # Auth state
│   │   │   └── WalletContext.jsx # Card/wallet state
│   │   ├── App.jsx             # Routes & auth guard
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Tailwind + animations
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                     # Express backend
│   ├── src/
│   │   ├── routes/
│   │   │   ├── users.js        # Auth endpoints
│   │   │   ├── cards.js        # Card templates
│   │   │   ├── wallet.js       # User wallet
│   │   │   └── benefits.js     # Usage tracking
│   │   ├── services/
│   │   │   └── email.js        # Resend integration
│   │   ├── db/
│   │   │   ├── init.js         # DB setup & migrations
│   │   │   ├── schema.sql      # Table definitions
│   │   │   └── seed.sql        # Initial card data
│   │   └── index.js            # Express app
│   └── package.json
│
├── railway.json                # Railway config
├── render.yaml                 # Render config (alternative)
└── package.json                # Workspace root
```

## Local Development

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
# Install dependencies
npm install

# Start development servers (frontend + backend)
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001

In development, magic links appear in the UI (no email needed).

## Deployment on Railway

### Quick Deploy

1. Push this repo to GitHub
2. Go to [Railway](https://railway.app) and sign in with GitHub
3. Click **New Project** → **Deploy from GitHub repo**
4. Select your repository
5. Add a volume for persistent data:
   - Go to your service → **Settings** → **Volumes**
   - Click **Add Volume**, set mount path (e.g., `/data`)
6. Add environment variables in **Variables** tab:
   - `DATA_PATH` = your volume mount path
   - `RESEND_API_KEY` = your Resend API key (optional)
7. Deploy!

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATA_PATH` | Yes | Path to persistent volume for SQLite |
| `NODE_ENV` | Auto | Set to `production` by Railway |
| `PORT` | Auto | Set by Railway |
| `RESEND_API_KEY` | No | Resend API key for email delivery |
| `EMAIL_FROM` | No | From address (default: onboarding@resend.dev) |

### Setting up Email (Resend)

1. Sign up at [resend.com](https://resend.com) (free: 100 emails/day)
2. Get your API key from the dashboard
3. Add `RESEND_API_KEY` to Railway Variables
4. (Optional) Add a custom domain for branded emails

Without `RESEND_API_KEY`, magic links show in the UI for testing.

## Alternative Deployment: Render

You can deploy on Render using the included `render.yaml`:

1. Connect your GitHub repo to Render
2. Use "Blueprint" deployment
3. Note: Free tier doesn't include persistent storage

## License

MIT
