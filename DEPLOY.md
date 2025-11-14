FixFinder — Deployment checklist and commands

This file lists exact steps to deploy the app as an MVP today.

Overview
- Backend: Node.js/Express (in `backend/`) — will deploy to Render (or another host)
- Frontend: React + Vite (in `frontend/`) — will deploy to Vercel (or similar)
- Database: MongoDB Atlas (cloud)
- Payments: Stripe (optional to accept real payments)

What I prepared for you in the repo
- `frontend/src/utils/api.js` now reads `VITE_API_BASE` (so frontend can point to production API)
- `backend/.env.production.example` — production env template
- `frontend/.env.production.example` — example of `VITE_API_BASE`

Step A — Push code to GitHub
1. Install Git for Windows if not already installed: https://git-scm.com/download/win
2. In PowerShell (project root) run:

```powershell
cd c:\Users\alnaj\Desktop\FixFinder.no
git init
git remote remove origin 2>$null
git remote add origin https://github.com/Abdaln1/FixFinder.git
git branch -M main
git add .
git commit -m "Initial commit - FixFinder MVP"
git push -u origin main
```

Step B — Create MongoDB Atlas cluster
1. Go to https://www.mongodb.com/cloud/atlas and create a free account
2. Create a free cluster (Shared Tier)
3. Under 'Database Access' create a database user and password
4. Under 'Network Access' add your IP address (or allow access from anywhere during setup: 0.0.0.0/0)
5. Get the connection string and replace `<user>` and `<password>` and the default DB name with `fixfinder`
Example:
```
mongodb+srv://deployuser:StrongPassword@cluster0.abcd.mongodb.net/fixfinder?retryWrites=true&w=majority
```

Step C — Create Stripe account (optional now, required for payments)
1. Go to https://dashboard.stripe.com/register and create account
2. In Developers -> API keys copy the `Secret key` (starts with `sk_test_` for test mode)
3. We'll use this in `backend` env as `STRIPE_SECRET`

Step D — Deploy backend to Render (recommended)
1. Sign up at https://render.com and connect your GitHub account
2. Create a new Web Service -> Connect to repo `FixFinder` -> Choose `backend` folder
3. Build Command: `npm install && npm run build` (if no build step, use `npm install`)
   Start Command: `node src/server.js` or `npm start`
4. Set environment variables in Render from `backend/.env.production.example`:
   - `MONGO_URI` (use Atlas URI)
   - `JWT_SECRET` (a long random string)
   - `STRIPE_SECRET` (if using Stripe)
5. Deploy — Render will build and expose the backend URL (e.g. `https://fixfinder-backend.onrender.com`)

Step E — Deploy frontend to Vercel
1. Go to https://vercel.com and sign in with GitHub
2. Import Project and select `FixFinder` repo
3. Set Root Directory to `frontend` when asked
4. Add Environment Variable in Vercel dashboard:
   - `VITE_API_BASE` -> `https://<your-backend-url>/api` (use the Render URL)
5. Deploy — Vercel will output your production frontend URL (e.g. `https://fixfinder.vercel.app`)

Step F — Test production
1. Open frontend URL and try to register/login with seeded accounts or create a new user
2. If you used Stripe, test with Stripe test card numbers
3. Monitor backend logs (Render) for errors

Optional: GitHub Actions or automatic deploys
- Both Vercel and Render support automatic deploys on push to `main` once you connect GitHub. No additional CI is required.

If you want I can:
- Prepare a ready-to-paste `backend` environment file (you provide Atlas URI and JWT secret)
- Walk you step-by-step while you create Atlas and Stripe accounts and add secrets
- Complete the first deploy once your repo is on GitHub (I'll give you the exact clicks and values)

Tell me which step you want help with next (I recommend: 1) confirm Git push succeeded, 2) create Atlas cluster, 3) provide Atlas URI and JWT secret and I will prepare the backend env and guide you to deploy).