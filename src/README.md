# Frontend Documentation

This directory contains all the frontend code for the DeliveryApp application.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin-specific components
│   ├── common/         # Common UI components
│   └── ui/             # Basic UI elements
├── constants/          # Application constants and types
├── hooks/              # Custom React hooks
├── pages/              # Application pages/components
│   ├── admin/         # Admin pages
│   └── user/          # User-facing pages
├── services/           # API services and data fetching
├── store/              # Global state management (Redux)
└── types/              # TypeScript type definitions
```

## Getting Started

### Prerequisites
- Node.js v14 or higher
- npm or yarn package manager

### Installation

```bash
cd restaurantes
npm install
# or
yarn install
```

### Running the Application

```bash
npm start
# or
yarn start
```

This will start the development server at `http://localhost:3000`.

## Performance Considerations

### Frontend Optimization
- **Code Splitting**: Use React.lazy and Suspense for code splitting
- **Lazy Loading**: Implement lazy loading for components that are not immediately visible
- **Memoization**: Use React.memo() to prevent unnecessary re-renders of components
- **API Optimization**: Optimize API calls by batching or debouncing when possible
- **Image Optimization**: Use WebP format and responsive images

### Backend Optimization
- Ensure proper indexing on database columns used in queries
- Implement caching mechanisms for frequently accessed data
- Optimize slow queries with EXPLAIN and adjust as needed
- Consider implementing rate limiting for API endpoints

## Deployment

The frontend is built using Vite, which provides fast builds and optimized production code.

```bash
npm run build
# or
yarn build
```

This will create an optimized production build in the `dist` directory.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_API_URL=http://localhost:8080/api
VITE_PORT=3000
```

## Testing

Run the test suite with:

```bash
npm test
# or
yarn test
```

This will run all tests using Jest and React Testing Library.

## Linting

Check code quality with ESLint:

```bash
npm run lint
# or
yarn lint
```

Fix automatic fixable issues with:

```bash
npm run lint:fix
# or
yarn lint:fix
```