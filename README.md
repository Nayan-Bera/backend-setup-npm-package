# backend-easy-setup

Create a ready-to-code Express + TypeScript backend with one `npx` command.

> Use this package as a CLI scaffold instead of adding it as a project dependency.

`backend-easy-setup` saves developers from repeating the same backend setup every time
they start a new project. It generates the folder structure, starter files,
middleware, config, database setup, Docker files, TypeScript config, ESLint
config, validators, and utilities so you can start building features faster.

## Quick Start

Create a new backend:

```bash
npx backend-easy-setup my-api
```

Run the generated project:

```bash
cd my-api
npm install
npm run dev
```

Use your own project name:

```bash
npx backend-easy-setup ecommerce-api
npx backend-easy-setup admin-backend
npx backend-easy-setup school-management-api
```

Scaffold into the current empty folder:

```bash
npx backend-easy-setup .
```

You can also use:

```bash
npx backend-easy-setup create my-api
```

## Why Developers Use It

- Creates a complete backend structure in seconds.
- Saves setup time on every new Express + TypeScript project.
- Keeps projects organized from day one.
- Includes common backend files most APIs need.
- Gives you middleware, utilities, validators, database setup, and Docker setup
  without manual copy-paste.
- Works directly with `npx`, so there is no global install step.

## Generated Folder Structure

```txt
my-api/
├── src/
│   ├── @types/
│   │   ├── express.d.ts
│   │   └── payload.types.ts
│   ├── config/
│   │   └── index.ts
│   ├── constants/
│   ├── controller/
│   ├── db/
│   │   ├── schema/
│   │   │   ├── index.ts
│   │   │   └── users.ts
│   │   └── index.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   └── notFound.ts
│   ├── routes/
│   │   └── index.ts
│   ├── services/
│   │   └── responseHandler.ts
│   ├── utils/
│   │   ├── asyncHandler.ts
│   │   ├── customErrorHandler.ts
│   │   └── jwtServices.ts
│   ├── validators/
│   │   └── user.ts
│   ├── app.ts
│   ├── drizzle.config.ts
│   ├── index.ts
│   └── server.ts
├── .dockerignore
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── Dockerfile.dev
├── eslint.config.mjs
├── package.json
└── tsconfig.json
```

## What It Creates

### Backend Core

- Express app setup
- TypeScript setup
- Environment config with `dotenv`
- Health check route
- Central route file
- Graceful server shutdown

### Middleware

- Auth middleware
- Global error handler
- Not found handler
- CORS setup
- JSON body parser

### Database Setup

- Drizzle ORM config
- PostgreSQL connection starter
- User schema example
- Migration scripts

### Utilities

- JWT service
- Async handler
- Custom error handler
- Response handler
- Zod user validators

### Dev Tooling

- ESLint config
- Nodemon + TSX dev server
- Dockerfile
- Dockerfile.dev
- Docker Compose
- `.env.example`
- Build, start, migration, seed, and reset scripts

## Generated Project Scripts

After creating a backend, these scripts are available inside your new project:

```bash
npm run dev
npm run build
npm start
npm run db:generate
npm run db:migrate
npm run db:seed
npm run db:reset:dev
```

## CLI Commands

```bash
npx backend-easy-setup <project-name>
npx backend-easy-setup .
npx backend-easy-setup create <project-name>
npx backend-easy-setup --help
npx backend-easy-setup --version
```

## Publishing This Package

For maintainers:

```bash
npm run pack:check
npm publish
```

## License

ISC
