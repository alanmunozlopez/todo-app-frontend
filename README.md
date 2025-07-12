# TODO App Frontend

React + TypeScript frontend for managing tasks with priorities and due dates.

## Setup

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_API_BASE_URL=http://localhost:3000
```

## Running the Project

```bash
# Development
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

## Testing

```bash
# Run tests
npm run test

# Run tests once
npm run test:run
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
