# LUMINA E-Commerce — Monorepo

```
ecom/
├── backend/     ← Express + TypeScript + PostgreSQL REST API (port 5000)
└── frontend/    ← Next.js 16 + Tailwind CSS v4 UI (port 3000)
```

## Quick Start

### 1. Backend (PostgreSQL)
```bash
cd backend
npm.cmd install
# Edit .env with your PostgreSQL DATABASE_URL
npm.cmd run dev              # starts on http://localhost:5000
```

### 2. Frontend (Next.js)
```bash
cd frontend
npm.cmd run dev              # starts on http://localhost:3000
```
