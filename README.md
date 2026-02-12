# Hono Backend

A modern, lightweight backend API built with Hono framework, featuring user authentication and todo management.

## Overview

This project provides a RESTful API for managing todos with user authentication. It uses Hono as the web framework, Drizzle ORM for database operations, and Better Auth for authentication.

## Features

- **User Authentication**: Email/password authentication with session management
- **Todo Management**: Create, read, update, and delete todos
- **Database**: PostgreSQL with Drizzle ORM
- **Validation**: Zod schema validation
- **CORS**: Configured for frontend integration
- **Hot Reload**: Development with Bun's hot reload

## Tech Stack

- **Framework**: Hono
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: Better Auth
- **Validation**: Zod
- **Runtime**: Bun
- **Container**: Docker Compose

## Installation

1. Clone the repository
2. Install dependencies:
   ```sh
   bun install
   ```

## Setup

### Database

1. Start the PostgreSQL database:

   ```sh
   bun run db:up
   ```

2. Set up environment variables. Create a `.env` file with:

   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/todo_db
   ```

3. Run database migrations:
   ```sh
   bun run db:migrate
   ```

### Authentication

The authentication is handled by Better Auth with email and password. The API endpoints are available at `/api/auth/*`.

## Running the Application

Start the development server:

```sh
bun run dev
```

The server will start at http://localhost:3000

## API Documentation

### Authentication Endpoints

Better Auth provides the following authentication endpoints:

- `POST /api/auth/sign-up` - Register a new user
- `POST /api/auth/sign-in` - Sign in
- `POST /api/auth/sign-out` - Sign out
- `GET /api/auth/session` - Get current session

For detailed authentication API documentation, run the server and visit: http://localhost:3000/api/auth/reference

### Todo Endpoints

All todo endpoints require authentication.

#### Get Todos

```
GET /api/todos
```

Returns all todos for the authenticated user.

#### Create Todo

```
POST /api/todos
Content-Type: application/json

{
  "title": "My Todo",
  "description": "Optional description",
  "completed": false
}
```

#### Update Todo

```
PUT /api/todos/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "completed": true
}
```

#### Delete Todo

```
DELETE /api/todos/:id
```

## Database Schema

### Users

- `id` (text, primary key)
- `name` (text)
- `email` (text, unique)
- `emailVerified` (boolean)
- `image` (text)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

### Todos

- `id` (uuid, primary key)
- `userId` (text, foreign key to users.id)
- `title` (varchar(500))
- `description` (varchar(1000))
- `completed` (boolean)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

### Sessions, Accounts, Verifications

Additional tables for authentication management.

## Development Scripts

- `bun run dev` - Start development server with hot reload
- `bun run db:up` - Start PostgreSQL database
- `bun run db:down` - Stop PostgreSQL database
- `bun run db:generate:migration` - Generate new migration
- `bun run db:migrate` - Run pending migrations
- `bun run db:studio` - Open Drizzle Studio for database management
- `bun run open-auth-docs` - Open authentication API documentation

## Project Structure

```
src/
├── db/
│   ├── db.ts              # Database connection
│   ├── schema.ts          # Database schema definitions
│   └── migrations/        # Database migrations
├── lib/
│   └── auth.ts            # Authentication configuration
├── middlewares/
│   └── auth.middleware.ts # Authentication middleware
├── routes/
│   └── todos.routes.ts    # Todo API routes
├── validators/
│   └── todo.validator.ts  # Request validation schemas
├── index.ts               # Application entry point
├── queries.ts             # Database query functions
└── types.ts               # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests (if any)
5. Submit a pull request

## License

This project is licensed under the MIT License.
