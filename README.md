# MERN Auth Demo

This project contains a React frontend and an Express + MongoDB backend for a simple authentication flow.

## Features

- Separate register and login forms in the React UI
- Client-side validation with inline field errors
- Express auth routes for `/api/auth/register` and `/api/auth/login`
- Server-side request validation and normalized email handling
- Password hashing with `bcryptjs`
- MongoDB persistence with Mongoose
- JWT generation on successful login

## Frontend setup

In the project root:

```bash
npm install
npm start
```

The frontend runs on `http://localhost:3000` and expects the backend API at `http://localhost:5000/api` by default.

You can override the frontend API target with:

```bash
REACT_APP_API_URL=http://localhost:5000/api
```

## Backend setup

Inside [`backend`](/e:/DemoProject/demo/backend):

```bash
npm install
```

Create a `.env` file in `backend` with:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/auth-demo
JWT_SECRET=replace-with-a-secure-secret
```

Then start the server:

```bash
cd backend
npm run dev
```

## API

### `POST /api/auth/register`

Request body:

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "password": "secret123"
}
```

### `POST /api/auth/login`

Request body:

```json
{
  "email": "ada@example.com",
  "password": "secret123"
}
```

Successful login returns a JWT token and the user profile.

## Scripts

- Root: `npm start`, `npm test`, `npm run build`
- Backend: `npm start`, `npm run dev`

## Notes

- The backend exits early if `MONGODB_URI` is missing.
- The login route also requires `JWT_SECRET`.
