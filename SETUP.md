# FixFinder.no — Local Setup Guide (Windows)

## Prerequisites

- Node.js v18+ (installed: ✓)
- npm v8+
- MongoDB (local or Docker)

## Quick Start

### Option 1: Using Docker Compose (Recommended - Easiest)

If you have Docker Desktop installed:

```powershell
cd c:\Users\alnaj\Desktop\FixFinder.no
docker compose up --build
```

Then:
- Open http://localhost:3000 for the frontend
- Backend API is at http://localhost:4000
- MongoDB runs in a container

### Option 2: Manual Setup

#### Step 1: Start MongoDB
You need MongoDB running. Either:

**A) Using Docker (if available):**
```powershell
docker run -d -p 27017:27017 --name mongodb mongo:6
```

**B) Download MongoDB Community and run `mongod.exe`**
From: https://www.mongodb.com/try/download/community

#### Step 2: Setup Backend

```powershell
cd c:\Users\alnaj\Desktop\FixFinder.no\backend

# Make sure npm is in PATH
$env:Path += ";C:\Program Files\nodejs"

# Install dependencies
& "C:\Program Files\nodejs\npm.cmd" install

# Copy env template
copy .env.example .env

# Edit .env if needed (default MONGO_URI should work)

# Start backend
& "C:\Program Files\nodejs\node.exe" src/server.js
```

Backend will start on http://localhost:4000

#### Step 3: Setup Frontend (New PowerShell Window)

```powershell
cd c:\Users\alnaj\Desktop\FixFinder.no\frontend

# Add npm to PATH
$env:Path += ";C:\Program Files\nodejs"

# Install dependencies
& "C:\Program Files\nodejs\npm.cmd" install

# Start dev server
& "C:\Program Files\nodejs\node.exe" node_modules\.bin\vite.cmd
```

Frontend will start on http://localhost:3000

#### Step 4: Populate Demo Data (Optional)

```powershell
cd c:\Users\alnaj\Desktop\FixFinder.no\backend
& "C:\Program Files\nodejs\node.exe" scripts\seed.js
```

This creates sample users and jobs.

## Features Included

✅ User Authentication (Email/Password)
✅ Post Jobs (with price)
✅ Browse Job Feed
✅ Assign & Complete Jobs
✅ User Profiles & Ratings
✅ Payment Placeholders (Stripe/Vipps)
✅ Responsive UI (Tailwind CSS)
✅ Docker Support

## Troubleshooting

**"npm command not found":**
- Use full path: `& "C:\Program Files\nodejs\npm.cmd" install`
- Or add to PATH: `$env:Path += ";C:\Program Files\nodejs"`

**"Cannot find module vite":**
- Ensure npm install completed: `& "C:\Program Files\nodejs\npm.cmd" install`

**MongoDB connection fails:**
- Ensure MongoDB is running
- Check MONGO_URI in `backend/.env`
- Default: `mongodb://localhost:27017/fixfinder`

**Port already in use:**
- Backend: Edit `backend/src/server.js` to change PORT
- Frontend: Edit `frontend/vite.config.js` to change port

## Next Steps

1. Get servers running (use Docker if available)
2. Register a user account
3. Post a job
4. Try assigning/completing jobs
5. Check profile page
6. Integrate Stripe/Vipps for payments (code skeleton ready)
7. Deploy to production

## File Structure

```
FixFinder.no/
├── backend/
│   ├── src/
│   │   ├── server.js          # Express server
│   │   ├── models/            # Mongoose schemas
│   │   ├── routes/            # API endpoints
│   │   └── middleware/        # Auth middleware
│   ├── scripts/
│   │   └── seed.js            # Demo data
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Main app
│   │   ├── pages/             # Page components
│   │   ├── utils/             # API helpers
│   │   └── index.css          # Tailwind styles
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## API Endpoints

**Auth:**
- POST `/api/auth/register` — Create account
- POST `/api/auth/login` — Login
- GET `/api/auth/me` — Current user (protected)

**Jobs:**
- GET `/api/jobs` — List jobs
- POST `/api/jobs` — Create job (protected)
- GET `/api/jobs/:id` — Get job details
- POST `/api/jobs/:id/assign` — Assign to helper (protected)
- POST `/api/jobs/:id/complete` — Mark done (protected)

**Users:**
- GET `/api/users/:id` — Get user profile
- PUT `/api/users/me` — Update profile (protected)
- POST `/api/users/:id/rate` — Rate user

**Payments:**
- POST `/api/payments/create-payment-intent` — Stripe (placeholder)

---

Need help? The project is ready to run — just follow the Quick Start above!
