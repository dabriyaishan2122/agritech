# AgriTech: Smart Farming Management (MERN)

Full-stack platform that helps farmers make data-driven decisions: farm and crop management, soil analysis, weather forecasts with advice, pest alerts, resource ordering, expert consultation and an admin dashboard.

## Features
- JWT auth with bcrypt password hashing; roles: farmer and admin
- Farm profiles and crop monitoring with automatic soil-health advice (pH, N, P, K)
- Weather forecast and field advice (OpenWeather, with sample-data fallback)
- Pest alerts published by admin
- Resource catalogue, order placement and tracking; admin approves orders
- Expert questions, community forum, replies
- Admin dashboard: stats, users, orders, alerts, catalogue
- Responsive Bootstrap UI, English and Hindi, charts with Recharts

## Tech
MongoDB, Express, React, Node.js, Axios, React Router, Bootstrap, JWT

## Run locally
```bash
cd backend && cp .env.example .env   # fill MONGO_URI and JWT_SECRET
npm install && npm run seed && npm start
cd ../frontend && npm install && npm start
```
Demo logins (after seeding): `admin@agritech.com` and `farmer@agritech.com`, password `Password@123`

## Deploy
- Database: MongoDB Atlas (free M0)
- Backend: Render web service, root `backend`, start `node server.js`; env `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` (the Vercel URL)
- Frontend: Vercel, root `frontend`; env `REACT_APP_API_URL=https://<render-app>.onrender.com/api`

## API
`/api/auth`, `/api/farms`, `/api/crops`, `/api/weather`, `/api/alerts`, `/api/resources`, `/api/orders`, `/api/posts`, `/api/admin`
