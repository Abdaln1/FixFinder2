# FixFinder.no — Marketplace for local small jobs

Starter full-stack scaffold (React + Vite frontend, Node + Express backend, MongoDB).

# FixFinder — Task Marketplace Platform

A full-stack web application where users can post jobs and skilled helpers can take them on. Built with Node.js/Express, React/Vite, MongoDB, and Stripe/Vipps payments.

---

## Quick Start

1) Backend: open `backend` folder and install + run

```powershell
cd backend
npm install
cp .env.example .env
# Edit .env to add MONGO_URI and JWT_SECRET
npm run dev
```

2) Frontend: open `frontend` folder and install + run

```powershell
cd frontend
npm install
npm run dev
```

Next steps:
- Add BankID / Vipps integration (placeholders are in code)
- Add Stripe or Vipps checkout for payments
- Add Google Maps API key to frontend for location search

This scaffold is a starting point — implement features, secure production config, and run tests before deploying.

Payments & Identity (placeholders)

- Stripe: A recommended quick way to accept card payments. Add `STRIPE_SECRET` to `backend/.env` and use the `/api/payments/create-payment-intent` endpoint (implemented as a placeholder in `backend/src/routes/payments.js`).
- Vipps: For Norway-native payments consider Vipps integration; this scaffold includes placeholder comments in `backend/src/routes/payments.js` where Vipps OAuth/webhook calls should be implemented. Vipps requires registration and credentials from Vipps dev portal.
- BankID: For strong identity verification, integrate BankID (via local BankID providers). This requires backend support and secure handling; see BankID docs and note: do not store BankID credentials in repo.

Docker & local dev

- A `docker-compose.yml` is included to start `backend`, `frontend` and a `mongo` service for easy local testing. Build images with Docker and run `docker compose up --build`.

Seed/demo data

- To quickly create demo users and jobs run the seed script from the `backend` folder:

```powershell
cd backend
npm install
copy .env.example .env
# ensure MONGO_URI in .env points to a running MongoDB (docker compose provides one)
npm run seed
```

This creates sample users `alice@example.com` and `bob@example.com` and a few example jobs you can use to demo the app.

Security & production notes

- Never commit `.env` with secrets. Use environment variables in your deployment platform.
- Use HTTPS and proper CORS origins in production.
