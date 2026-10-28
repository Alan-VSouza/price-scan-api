# Price Scan

A price comparison web app. Search for a product and see offers from **Mercado Livre** and **Amazon Brasil** side by side.

## Stack

**Front-end:** React, TypeScript, Vite, Material UI, Redux Toolkit, Axios, Framer Motion.

**Back-end:** Node.js, Express, Axios and Cheerio (Amazon page parsing), Mercado Livre search API.

## Project structure

`backend/` is the Express API. `frontend/` is the Vite + React app.

## Getting started

**Requirements:** Node 18+ and a Mercado Livre API access token.

**1. Back-end**

```bash
cd backend
npm install
cp .env.example .env   # set ML_ACCESS_TOKEN
npm start
```

The API listens on http://localhost:5000 and exposes `GET /api/preco/:produto`.

**2. Front-end**

```bash
cd frontend
npm install
npm run dev
```

To point the front-end at another API, set `VITE_API_URL` (default: `http://localhost:5000/api`).

## Known limitations

**Amazon results** come from parsing public HTML, so they can break when the page layout changes or when the site blocks automated requests.

**Mercado Livre** requires a valid access token, which expires; refresh it when requests start failing.

**Tests:** there are none yet.
