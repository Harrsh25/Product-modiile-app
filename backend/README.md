# Inventia Backend API

Node.js + Express + MongoDB REST API for the Inventia HR & Project Management app.

## Quick Start

```bash
cd backend
cp .env.example .env
# Fill in your MongoDB URI and JWT secrets in .env
npm install
npm run dev
```

## API Endpoints

Base URL: `http://localhost:3000/api/v1`

### Auth
| Method | Route               | Auth | Description           |
|--------|---------------------|------|-----------------------|
| POST   | /auth/register      | ❌   | Register new user     |
| POST   | /auth/login         | ❌   | Login, get tokens     |
| POST   | /auth/refresh       | ❌   | Refresh access token  |
| GET    | /auth/me            | ✅   | Get current user      |

### Projects
| Method | Route               | Auth | Description           |
|--------|---------------------|------|-----------------------|
| GET    | /projects           | ✅   | List all projects     |
| GET    | /projects/:id       | ✅   | Get single project    |
| POST   | /projects           | ✅   | Create project        |
| PATCH  | /projects/:id       | ✅   | Update project        |
| DELETE | /projects/:id       | ✅   | Delete project        |

### Assignments
| Method | Route                        | Auth | Description            |
|--------|------------------------------|------|------------------------|
| GET    | /assignments                 | ✅   | My assignments         |
| GET    | /assignments/:id             | ✅   | Get single assignment  |
| PATCH  | /assignments/:id/status      | ✅   | Update status          |

### Attendance
| Method | Route                   | Auth | Description           |
|--------|-------------------------|------|-----------------------|
| POST   | /attendance/punch-in    | ✅   | Punch in              |
| POST   | /attendance/punch-out   | ✅   | Punch out             |
| GET    | /attendance/history     | ✅   | Attendance history    |
| GET    | /attendance/summary     | ✅   | Monthly summary       |

## Connecting the Mobile App

In `inventia-app/src/services/api.ts`, set:
```ts
const USE_MOCK = false;
const BASE_URL = 'http://YOUR_SERVER_IP:3000/api/v1';
```

Then add the Authorization header to all requests:
```ts
headers: { 'Authorization': `Bearer ${accessToken}` }
```

## Response Format

All responses follow a consistent envelope:

```json
// Success
{ "success": true, "data": { ... }, "meta": { "page": 1, "total": 42 } }

// Error
{ "success": false, "error": { "message": "...", "code": "ERROR_CODE" } }
```

## Folder Structure

```
backend/src/
  config/       → Database connection
  controllers/  → HTTP request handlers
  middleware/   → Auth, validation, error handling
  models/       → Mongoose schemas
  routes/       → Route definitions
  services/     → Business logic (extend as needed)
  utils/        → Logger, JWT helpers, response helpers
  app.ts        → Express app setup
  server.ts     → Entry point
```
