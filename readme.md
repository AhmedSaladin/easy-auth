# Authentication Module

A full-stack application with user authentication features (sign up, sign in, and protected routes).

## Project Structure

- `server/`: NestJS backend with MongoDB
- `client/`: React frontend with TypeScript

## Backend (NestJS + MongoDB)

### Prerequisites

- Node.js (v16 or later)
- MongoDB (local instance or MongoDB Atlas or docker compose)

### Setup

1. Navigate to the backend directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   DATABASE_URL="mongodb://localhost:27017/easy?authSource=admin&directConnection=true&replicaSet=rs0&retryWrites=true&w=majority"
   NODE_ENV='development'
   PORT=8000
   SWAGGER_PASSWORD='secret'
   REQUEST_LIMIT=10
   REQUEST_TIME=10000
   JWT_SECRET='secret'
   JWT_SECRET_TIME='3d'
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The API will be available at http://localhost:3000.

### API Documentation

Once the server is running, you can access the Swagger API documentation at:
http://localhost:3000/docs

### API Endpoints

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login a user and receive JWT token
- `GET /` - Get the server uptime (protected route)

## Frontend (React + TypeScript)

### Prerequisites

- Node.js (v16 or later)

### Setup

1. Navigate to the frontend directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at http://localhost:5173.

### Pages

- `/signup` - User registration page
- `/login` - User login page
- `/app` - Protected application page (requires authentication)

## Features

1. User Registration with form validation:

   - Email (valid format)
   - Name (minimum 3 characters)
   - Password (minimum 8 characters, at least one letter, one number, one special character)

2. User Authentication:

   - JWT-based authentication
   - Protected routes requiring authentication

3. Security Features:

   - Password hashing with bcrypt
   - JWT token-based authentication
   - Form validation (frontend and backend)
   - CORS protection
   - Rate limiter

4. Additional Features:
   - API documentation with Swagger
   - Comprehensive logging
   - Error handling

## Development Notes

### Backend Technologies

- NestJS (Node.js framework)
- MongoDB (database)
- Prisma (ORM)
- Passport & JWT (authentication)
- Pino (logging)
- Swagger (API documentation)

### Frontend Technologies

- React (UI library)
- TypeScript (type-safe JavaScript)
- React Router (routing)
- Formik & Yup (form handling and validation)
- Tailwindcss (css utility)
- Axios (HTTP client)
