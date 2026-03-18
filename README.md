# Patient Visit Tracker

Small internal tool to track patient visits by clinicians.

## Project Structure
- `client/` React + Vite UI
- `server/` Node.js + Express + Prisma API

## Local Setup

### 1) Install dependencies
```bash
npm run install:all
```

### 2) Configure environment
Create a `server/.env` file:
```bash
DATABASE_URL="file:./dev.db"
```

### 3) Initialize the database
```bash
npm run prisma:migrate --prefix server
```

### 4) Run both client and server
```bash
npm run dev
```

Client runs on the Vite default port (usually `5173`).
Server runs on `http://localhost:5174`.

## Useful Commands
- `npm run dev:client` - Run only the client
- `npm run dev:server` - Run only the server
- `npm run prisma:studio --prefix server` - Open Prisma Studio
