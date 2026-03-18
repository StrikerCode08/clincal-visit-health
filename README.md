# Patient Visit Tracker

Small internal tool to track patient visits by clinicians.

## Project Structure

- `client/` React + Vite UI
- `server/` Node.js + Express + Prisma API

## Local Setup

### 1) Install dependencies

```bash
npm i
npm run install:all
```

This installs both `client/` and `server/` dependencies.

### 2) Configure environment

Create a `server/.env` file:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME?schema=public"
```

### 3) Initialize the database

```bash
npm run prisma:migrate --prefix server
```

This creates and applies migrations to your database.

### 4) Seed dummy data

```bash
npm run prisma:seed --prefix server
```

### 5) Run both client and server

```bash
npm run dev
```

This uses `concurrently` to run:

- `npm run dev --prefix client`
- `npm run dev --prefix server`

Client runs on the Vite default port (usually `5173`).
Server runs on `http://localhost:5174`.

## Useful Commands

- `npm run dev:client` - Run only the client
- `npm run dev:server` - Run only the server
- `npm run prisma:studio --prefix server` - Open Prisma Studio
- `npm run prisma:migrate --prefix server` - Create/apply migrations
- `npm run install:all` - Install deps for both client and server
