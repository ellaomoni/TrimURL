# TrimURL

A scalable URL shortener with analytics, built with Node.js, TypeScript, PostgreSQL, and Prisma.

---

## Overview

TrimURL is a backend-focused SaaS-style URL shortener that allows users to:

* Create short links
* Track link performance
* View analytics (clicks, activity, trends)
* Manage links securely with authentication

This project focuses on **backend architecture, API design, and real-world system behavior**.

---

## Features

### Authentication

* User registration
* Secure login (JWT-based)
* Protected routes
* Current user endpoint (`/auth/me`)

### Link Management

* Create short links
* Custom aliases
* Expiry dates
* Delete links
* Paginated link retrieval

### Redirect System

* Public short link access
* Expiry validation
* Automatic redirect to original URL

### Analytics

* Track every click
* Total clicks per link
* Recent activity
* Click trends over time

---

## Tech Stack

### Backend

* Node.js
* Express
* TypeScript

### Database

* PostgreSQL
* Prisma ORM

### Validation & Auth

* Zod
* JWT
* Bcrypt

---

## Project Structure

```
src/
  config/
  middleware/
  modules/
    auth/
    links/
    analytics/
  utils/
```

---

## Setup Instructions

### 1. Clone the repo

```
git clone https://github.com/YOUR_USERNAME/TRIMURL.git
cd TRIMURL
```

### 2. Install dependencies

```
npm install
```

### 3. Set up environment variables

Create `.env` file:

```
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
APP_BASE_URL=http://localhost:5000
```

### 4. Run database migration

```
npx prisma migrate dev
```

### 5. Start development server

```
npm run dev
```

---

## Authentication Flow

1. Register → `/auth/register`
2. Login → `/auth/login`
3. Receive JWT token
4. Use token in headers:

```
Authorization: Bearer YOUR_TOKEN
```

---

## API Documentation

### Base URL

```
http://localhost:5000
```

---

### Auth Endpoints

#### Register

```
POST /auth/register
```

Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

---

#### Login

```
POST /auth/login
```

---

#### Get Current User

```
GET /auth/me
```

---

### Link Endpoints

#### Create Link

```
POST /links
```

Body:

```json
{
  "longUrl": "https://example.com",
  "customAlias": "my-link",
  "expiresAt": "2026-05-01T12:00:00.000Z"
}
```

---

#### Get All Links

```
GET /links?page=1&limit=10
```

---

#### Get Single Link

```
GET /links/:id
```

---

#### Delete Link

```
DELETE /links/:id
```

---

### Redirect

```
GET /links/r/:shortCode
```

Example:

```
http://localhost:5000/links/r/abc123
```

---

### Analytics

```
GET /analytics/:linkId
```

Response includes:

* total clicks
* recent clicks
* clicks over time

---

## Example Response

```json
{
  "success": true,
  "message": "Links fetched successfully",
  "data": {
    "items": [],
    "meta": {}
  }
}
```

---

## Testing

Use:

* Postman
* Thunder Client
* cURL

---

##  Deployment

You can deploy using:

* Railway
* Render
* Fly.io
* Vercel (frontend later)

---

## Engineering Highlights

* Modular architecture (feature-based)
* JWT authentication with protected routes
* Prisma ORM with relational modeling
* Analytics tracking system
* Pagination and structured API responses
* Clean error handling and validation

---

## Future Improvements

* Redis caching for redirects
* Rate limiting
* QR code generation
* Custom domains
* Frontend dashboard (React)

---

## Author

Built by Ella Omoni.

