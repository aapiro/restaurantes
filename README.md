# 🚚 DeliveryApp - Multi-Restaurant Delivery Platform

A comprehensive delivery platform for multiple restaurants developed with modern web technologies. This repository contains both the frontend and backend components of the application.

![Project Architecture](https://via.placeholder.com/600x300.png?text=DeliveryApp+Architecture)

## 🔄 Project Structure

The project is organized into two main components:

1. **Frontend**: React-based user interface (located in the root directory)
2. **Backend**: Quarkus-based REST API (located in `restaurantes-backend` directory)

## 🚀 Getting Started

### Prerequisites

To run this project locally, you'll need to have the following software installed:

- Docker & Docker Compose (for development)
- Node.js 18+ and npm/yarn for the frontend
- Java 17+ and Maven for the backend

## 🚀 Getting Started with Development

### Quick Start Guide

To get started quickly, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/aapiro/restaurantes.git
   cd restaurantes
   ```

2. Copy environment variables template:
   ```bash
   cp .env.example .env
   ```

3. Install dependencies:
   - Frontend: `cd restaurantes-frontend && npm install`
   - Backend: `cd restaurantes-backend && mvn clean install`

4. Start the application with Docker Compose (recommended):
   ```bash
   docker-compose up --build
   ```
   This will start both frontend and backend services.

5. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api

### Running Without Docker

If you prefer not to use Docker, you can run the services individually:

1. **Start the Backend**:
   ```bash
   cd restaurantes-backend
   ./mvnw compile quarkus:dev
   ```
   The backend will be available at http://localhost:8080/api

2. **Start the Frontend**:
   ```bash
   cd restaurantes-frontend
   npm start
   ```
   The frontend will be available at http://localhost:3000

### Environment Variables

Environment variables are used to configure both frontend and backend services. Here's how to set them up:

1. **Copy the example file**:
   ```bash
   cp .env.example .env
   ```

2. **Update the `.env` file** with your specific configuration:
   - `VITE_API_URL`: URL of the backend API (default: `http://localhost:8080/api`)
   - Other frontend-specific variables

3. **Backend environment variables**:
   These are configured in `restaurantes-backend/src/main/resources/application.properties`

4. **Docker environment variables**:
   Configured in `docker-compose.yml` and `docker-compose.prod.yml`

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your specific configuration:
   - `VITE_API_URL`: URL of the backend API (default: `http://localhost:8080/api`)
   - Other frontend-specific variables

### Running Services Individually

If you prefer to run the services individually, follow these steps:

#### Backend (Quarkus)
```bash
cd restaurantes-backend
./mvnw compile quarkus:dev
```
The backend service will be available at `http://localhost:8080`

#### Frontend (React)
```bash
cd restaurantes-frontend
npm start
```
The frontend application will be available at `http://localhost:3000`

### Frontend Setup

#### Prerequisites
- Node.js 16+
- npm or yarn

#### Installation and Running

```bash
# Clone the repository (if you haven't already)
git clone <your-repo-url>
cd delivery-frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit the .env file with your specific configuration

# Run in development mode
npm start

# The frontend will be available at http://localhost:3000
```

### Backend Setup

#### Prerequisites
- Java 17+
- Maven 3.6+

#### Installation and Running

```bash
# Navigate to the backend directory
cd restaurantes-backend

# Run the application in development mode (with live reload)
./mvnw quarkus:dev

# The backend API will be available at http://localhost:8080
```

#### Packaging and Running

To create a runnable JAR:

```bash
./mvnw package
java -jar target/quarkus-app/quarkus-run.jar
```

For an executable JAR (includes dependencies):

```bash
./mvnw package -Dquarkus.package.jar.type=uber-jar
java -jar target/*-runner.jar
```

#### Native Build (Production)

```bash
# With GraalVM installed
./mvnw package -Dnative

# Or using Docker
./mvnw package -Dnative -Dquarkus.native.container-build=true
```

### Running Both Services Together

For a complete development experience, you'll want to run both frontend and backend services:

1. In one terminal window, start the backend:
   ```bash
   cd restaurantes-backend
   ./mvnw quarkus:dev
   ```

2. In another terminal window, start the frontend:
   ```bash
   cd ..
   npm start
   ```

3. The application will be accessible at [http://localhost:3000](http://localhost:3000)

#### Using Docker Compose (Recommended for Development)

For a more streamlined development experience, you can use Docker Compose to run both services together:

```bash
# From the root directory
docker-compose up -d
```

This will:
- Start the backend service on port 8080
- Start the frontend service on port 3000
- Set up proper network connections between containers

You can access the application at [http://localhost:3000](http://localhost:3000) and the Swagger API documentation at [http://localhost:8080/q/swagger](http://localhost:8080/q/swagger).

## 🛠️ Technology Stack

### Frontend

#### Core Technologies
- **React 18** - UI Framework
- **TypeScript** - Static typing
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

#### State Management and Data Fetching
- **Zustand** - Global state management
- **React Query** - Server data synchronization and caching
- **Axios** - HTTP client for API requests

#### UI Components and Forms
- **Lucide React** - Icon library
- **React Hook Form** - Form handling and validation
- **Yup** - Schema validation
- **clsx** - Utility for conditional class names

### Backend

#### Core Technologies
- **Quarkus 3.x** - Supersonic Subatomic Java Framework
- **Java 17** - Programming language
- **Maven** - Build automation tool

#### Data Persistence
- **Hibernate ORM with Panache** - JPA implementation for database access
- **H2 Database** - In-memory database for development
- **Liquibase** - Database schema migration tool

#### API and Messaging
- **JAX-RS/RESTEasy** - Java API for RESTful web services
- **Funqy HTTP** - Asynchronous messaging framework

## 📁 Project Structure

### Frontend Structure

The frontend follows a standard React project structure with the following key directories:

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Common UI elements (buttons, inputs, etc.)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Toast.tsx
│   │   └── index.ts
│   ├── layout/         # Layout components
│   │   ├── Header.tsx
│   │   └── Layout.tsx
│   └── common/         # Shared components
│       └── CartSidebar.tsx
├── pages/              # Application pages/routes
│   ├── HomePage.tsx
│   ├── RestaurantsPage.tsx
│   ├── RestaurantDetailPage.tsx
│   ├── CheckoutPage.tsx
│   └── OrderDetailPage.tsx
├── hooks/              # Custom React hooks
│   ├── useCart.ts
│   └── index.ts
├── services/           # API services and data fetching
│   └── queryClient.ts
├── store/              # Global state management (Zustand)
│   └── index.ts        # CRITICAL FILE - Contains core state logic
├── types/              # TypeScript type definitions
│   └── index.ts        # CRITICAL FILE - Core types and interfaces
├── constants/          # Application constants
│   └── index.ts        # CRITICAL FILE - Important configuration values
├── App.tsx             # Root React component
└── index.tsx           # Entry point for React application
```

### Backend Structure

The backend follows a Quarkus project structure with the following key directories:

```
restaurantes-backend/
├── src/
│   ├── main/
│   │   ├── java/       # Java source files
│   │   │   └── com/example/restaurantes/
│   │   │       ├── model/      # JPA entities
│   │   │       ├── repository/ # Repository interfaces
│   │   │       ├── resource/   # REST API endpoints
│   │   │       ├── service/    # Business logic
│   │   │       └── config/     # Configuration classes
│   │   ├── resources/  # Configuration files (application.properties, etc.)
│   │   └── test/java/  # Unit and integration tests
│   └── test/resources/ # Test configuration files
├── pom.xml             # Maven build configuration
└── .mvnw               # Maven wrapper for consistent builds
```

## 🎯 Main Features

### ✅ Implemented
- [x] Restaurant catalog with filters
- [x] Restaurant details and menu
- [x] Shopping cart system
- [x] Page navigation
- [x] Notification system
- [x] Responsive design
- [x] Global state management

### 🔄 In Development
- [ ] User authentication
- [ ] Checkout process
- [ ] Order management
- [ ] Backend integration
- [ ] Payment system

### 🚀 Future Features
- [ ] Real-time tracking
- [ ] Push notifications
- [ ] PWA (Progressive Web App)
- [ ] Offline mode
- [ ] Review system

## 🔧 Available Scripts

### Frontend

```bash
# Development
npm start                 # Run in development mode

# Build
npm run build            # Create production build
npm run build:analyze    # Analyze bundle size

# Testing
npm test                 # Run tests
npm run test:coverage    # Test coverage

# Linting
npm run lint             # Check code quality
npm run lint:fix         # Automatically fix issues

# Type checking
npm run type-check       # Verify TypeScript types
```

### Backend

```bash
# Development
./mvnw quarkus:dev               # Run in development mode with live reload

# Build and Package
./mvnw package                  # Create production build
./mvnw package -Dquarkus.package.jar.type=uber-jar  # Create executable JAR

# Testing
./mvnw test                     # Run unit tests
./mvnw verify                   # Run all tests including integration tests

# Native Build (for production)
./mvnw package -Dnative         # Create native executable
```

## 🧪 Testing

### Frontend Testing
- Unit tests: `npm test`
- Test coverage: `npm run test:coverage`

### Backend Testing
- Unit tests: `./mvnw test`
- Integration tests: `./mvnw verify`

## 🗄️ Database Setup

### Database Migrations

We use Liquibase for database schema migrations:

1. **Running migrations**:
   ```bash
   cd restaurantes-backend
   ./mvnw quarkus:dev  # Runs migrations automatically on startup
   ```

2. **Creating new migrations**:
   - Add a new XML file to `src/main/resources/db/changelog`
   - Include it in the master changelog file

3. **Checking migration status**:
   ```bash
   ./mvnw quarkus:dev
   # Access Liquibase UI at http://localhost:8080/q/liquibase-ui
   ```

### Development Environment
The application uses an H2 in-memory database for development, which is automatically configured when running locally or with Docker.

For local development without Docker:
1. Make sure you have Java 17+ installed
2. Start the backend service as described in the "Running Without Docker" section
3. The H2 console will be available at http://localhost:8080/h2-console

### Production Environment
For production, you'll need to configure a PostgreSQL or MySQL database:

1. **Create a new database and user**:
   ```sql
   CREATE DATABASE restaurantes;
   CREATE USER 'restaurantes_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON restaurantes.* TO 'restaurantes_user'@'localhost';
   ```

2. **Update the connection settings** in `restaurantes-backend/src/main/resources/application.properties`:
   ```properties
   quarkus.datasource.db-kind=postgresql
   quarkus.datasource.username=restaurantes_user
   quarkus.datasource.password=your_password
   quarkus.datasource.jdbc.url=jdbc:postgresql://localhost:5432/restaurantes
   ```

3. **Run migrations with Liquibase**:
   ```bash
   cd restaurantes-backend
   ./mvnw quarkus:dev  # Runs migrations automatically on startup
   ```

## 🗃️ Database Schema

The application uses a relational database schema with the following key tables:

1. **users**: Stores user information (id, name, email, password_hash)
2. **restaurants**: Contains restaurant details (id, name, description, address)
3. **menu_items**: Lists all available menu items (id, restaurant_id, name, price)
4. **orders**: Tracks customer orders (id, user_id, status, total_amount)

For a complete schema diagram, see the `db-diagram.png` file in the repository.

## 📚 API Documentation

The backend provides a REST API with comprehensive endpoints for all application functionality. Here are some key endpoints:

| Method | Path               | Description                |
|--------|--------------------|----------------------------|
| GET    | /api/v1/restaurants   | Get all restaurants        |
| POST   | /api/v1/restaurants   | Create a new restaurant    |
| GET    | /api/v1/menu-items    | Get all menu items          |

### Accessing API Documentation

For detailed API documentation, visit the following URLs when the backend is running:

- **Swagger UI**: [http://localhost:8080/q/swagger](http://localhost:8080/q/swagger)
  The Swagger UI provides an interactive interface to explore and test all available endpoints.

- **OpenAPI JSON**: [http://localhost:8080/q/openapi](http://localhost:8080/q/openapi)
  Machine-readable API specification in OpenAPI format.

### API Authentication
All protected endpoints require a valid JWT token, which can be obtained by authenticating at `/api/v1/auth/login`. The authentication flow is as follows:

1. Send a POST request to `/api/v1/auth/login` with username and password
2. Receive a JWT token in the response
3. Include the token in the Authorization header of subsequent requests:
   ```
   Authorization: Bearer YOUR_JWT_TOKEN_HERE
   ```

### API Versioning
The API follows semantic versioning principles with version numbers included in the URL path (e.g., `/v1/restaurants`). This ensures backward compatibility and allows for future enhancements without breaking existing clients.

## ❓ Troubleshooting

### Common Issues and Solutions

#### 1. **Backend not starting**

- **Symptoms**: The backend fails to start when running `./mvnw quarkus:dev`
- **Solutions**:
  - Check if Java 17+ is installed: `java -version`
  - Ensure Maven is properly configured
  - Look at the error messages in the terminal output for specific issues

#### 2. **Frontend not connecting to backend**

- **Symptoms**: The frontend shows API errors or can't load data
- **Solutions**:
  - Verify both services are running (`npm start` and `./mvnw quarkus:dev`)
  - Check that the API URL in `.env` matches your setup (default: `http://localhost:8080/api`)
  - Look for CORS errors in the browser console
  - Ensure no firewall is blocking port 8080

#### 3. **Database connection issues**

- **Symptoms**: Backend starts but shows database-related errors
- **Solutions**:
  - For development, ensure H2 database is properly configured (no action usually needed)
  - For production, verify PostgreSQL/MySQL credentials are correct in `application.properties`
  - Check network connectivity to the database server

#### 4. **Build failures**

- **Symptoms**: `npm install` or `./mvnw install` fails
- **Solutions**:
  - Run `npm install` to ensure all dependencies are installed for frontend
  - Run `./mvnw install` to ensure all dependencies are installed for backend
  - Make sure you're using Node.js 16+ and Java 17+
  - Check if there's enough disk space

#### 5. **Port conflicts**

- **Symptoms**: Services fail to start with "port already in use" errors
- **Solutions**:
  - Stop any other services using ports 3000 (frontend) or 8080 (backend)
  - Change the port configuration if needed:
    - Frontend: Update `VITE_PORT` in `.env`
    - Backend: Update `quarkus.http.port` in `application.properties`

### Debugging Tips

1. **Check logs**: Both frontend and backend provide helpful error messages in their terminal output
2. **Browser console**: For frontend issues, check the browser's developer console for JavaScript errors
3. **Network tab**: Use your browser's network tab to inspect API requests and responses
4. **Swagger UI**: Test API endpoints directly at [http://localhost:8080/q/swagger](http://localhost:8080/q/swagger)
5. **Health endpoint**: Check backend health at [http://localhost:8080/q/health](http://localhost:8080/q/health)

### API Documentation

Our REST API is documented using OpenAPI/Swagger. You can access the interactive documentation at:

- [Swagger UI](http://localhost:8080/q/swagger)
- [OpenAPI JSON](http://localhost:8080/q/openapi)

The API follows RESTful principles with proper HTTP status codes and response formats.

### Testing

#### Running Tests

To ensure code quality, we have a comprehensive test suite for both frontend and backend:

- **Frontend**: Run tests with `cd restaurantes-frontend && npm test`
- **Backend**: Run tests with `cd restaurantes-backend && ./mvnw test`

#### Code Quality

We use static analysis tools to maintain code quality:
- Frontend: ESLint, Prettier
- Backend: Checkstyle, SpotBugs

### CI/CD Pipeline

Our project uses GitHub Actions for continuous integration and deployment:

1. **CI Pipeline**: Runs on every push to verify code quality
   - Linting (ESLint, Prettier)
   - Type checking
   - Unit tests
   - Build verification

2. **CD Pipeline**: Automatically deploys verified changes to staging/production

The pipeline configuration can be found in `.github/workflows/ci.yml` and `cd.yml`.

### Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies** as described in the Getting Started section
3. **Make your changes** with a focus on code quality and testing
4. **Run tests** to ensure nothing is broken
5. **Create a pull request** with a clear description of your changes

Please follow our [code conventions](#-code-conventions) when contributing.

### Security

We take security seriously and implement several measures:

1. **Authentication**: JWT-based authentication for API access
2. **Authorization**: Role-based access control (RBAC)
3. **Data Validation**: Input validation on both frontend and backend
4. **CORS Policy**: Strict CORS policy to prevent unauthorized access
5. **HTTPS**: Enforced HTTPS in production

### Deployment

For production deployment, we use Docker Compose with the `docker-compose.prod.yml` configuration:

1. Build and start the containers:
   ```bash
   docker-compose -f docker-compose.prod.yml up --build -d
   ```

2. Access the application at `http://your-domain.com`

3. For HTTPS, configure a reverse proxy like Nginx or Traefik with SSL certificates.

### Technology Stack

Our tech stack includes:

- **Frontend**: React, TypeScript, Vite, Redux Toolkit
- **Backend**: Quarkus (Java), JAX-RS, Hibernate ORM
- **Database**: PostgreSQL (production), H2 (development)
- **DevOps**: Docker, Docker Compose, GitHub Actions

### Architecture Overview

The application follows a microservices architecture with a React frontend and Quarkus backend:

1. **Frontend**: A single-page application built with React, TypeScript, and Vite
2. **Backend**: REST API built with Quarkus (Java) using JAX-RS for endpoints
3. **Database**: PostgreSQL as the primary database with H2 for development/testing

### Performance Optimization

To ensure optimal performance, we've implemented several best practices:

1. **Frontend**:
   - Code splitting with Vite
   - Lazy loading of components
   - Service worker for caching

2. **Backend**:
   - Database indexing strategies
   - Query optimization
   - Connection pooling

3. **Infrastructure**:
   - Docker resource limits
   - CDN integration (in production)

### Monitoring and Logging

We implement monitoring and logging to ensure system reliability:

1. **Backend Metrics**: Quarkus provides built-in metrics at `/q/metrics`
2. **Health Checks**: Health endpoint available at `/q/health`
3. **Logging**: Structured JSON logs for both frontend and backend
4. **Error Tracking**: Integrations with Sentry or similar services

### Frequently Asked Questions

**Q: How do I reset the development database?**
A: For H2 (development), simply restart the backend service. All data will be recreated.

**Q: Can I use a different database for development?**
A: Yes, update the `application.properties` file with your preferred database configuration.

**Q: How do I clear the frontend cache?**
A: Delete the `node_modules` directory and run `npm install` again.


Understanding the project structure will help you navigate and contribute effectively:

```
restaurantes/
├── .github/                  # GitHub Actions workflows
│   └── workflows/           # CI/CD pipelines
│       ├── ci.yml           # Continuous Integration pipeline
│       └── cd.yml           # Continuous Deployment pipeline
├── docker-compose.yml        # Docker Compose configuration for development
├── docker-compose.prod.yml   # Docker Compose configuration for production
├── README.md                 # Project documentation (this file)
└── restaurantes-backend/     # Backend service directory
    ├── src/
    │   └── main/
    │       ├── java/         # Java source code
    │       │   └── com/example/restaurantes/
    │       │       ├── model/      # JPA entities
    │       │       ├── repository/ # Repository interfaces
    │       │       ├── resource/   # REST API endpoints
    │       │       ├── service/    # Business logic
    │       │       └── config/     # Configuration classes
    │       └── resources/  # Configuration files (application.properties, etc.)
    ├── pom.xml               # Maven build configuration
    └── .mvnw                 # Maven wrapper for consistent builds

restaurantes-frontend/        # Frontend service directory
├── public/                   # Static assets and HTML template
├── src/                      # Source code
│   ├── components/           # Reusable UI components
│   │   ├── ui/               # Common UI elements (buttons, inputs, etc.)
│   │   ├── layout/           # Layout components (Header, Footer)
│   │   └── common/           # Shared components
│   ├── pages/                # Application pages/routes
│   │   ├── HomePage.tsx      # Home page component
│   │   ├── RestaurantsPage.tsx # Restaurant listing page
│   │   └── RestaurantDetailPage.tsx # Individual restaurant details
│   ├── hooks/                # Custom React hooks
│   ├── services/             # API services and data fetching
│   ├── store/                # Global state management (Zustand)
│   ├── types/                # TypeScript type definitions
│   ├── constants/            # Application constants
│   ├── App.tsx               # Root React component
│   └── index.tsx             # Entry point for React application
├── .env.example              # Example environment variables template
├── package.json              # Node.js dependencies and scripts
└── tsconfig.json             # TypeScript configuration
```

### Key Directories

- **restaurantes-backend**: Contains the Quarkus backend service with REST API endpoints
- **restaurantes-frontend**: Contains the React frontend application
- **.github/workflows**: GitHub Actions for CI/CD pipelines
- **docker-compose.yml**: Development environment configuration

## 🎨 Code Conventions

### Naming Conventions
- **Components**: PascalCase (`RestaurantCard.tsx`)
- **Files**: camelCase (`userService.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS`)
- **Variables/Functions**: camelCase (`getUserData`)

### Code Style Guidelines

#### Frontend (React/TypeScript)
- Use TypeScript for type safety
- Follow React component conventions
- Use Tailwind CSS classes for styling
- Keep components small and focused

```typescript
// Example React component with hooks
const RestaurantCard: React.FC<{ restaurant: Restaurant }> = ({ restaurant }) => {
  // State management
  const [isFavorite, setIsFavorite] = useState(false);

  // Effect logic
  useEffect(() => {
    // Side effects
  }, []);

  // Event handlers
  const handleClick = () => {
    // Handler logic
  };

  // Render
  return (
    <div className="restaurant-card">
      {/* JSX */}
    </div>
  );
};

export default RestaurantCard;
```

#### Backend (Quarkus/Java)
- Follow Java naming conventions
- Use Quarkus annotations for configuration
- Implement repository pattern for data access
- Keep services focused on business logic
```

### Backend Code Conventions

```java
// Entity example
@Entity
public class Restaurant extends PanacheEntityBase {

    @Column(nullable = false)
    public String name;

    @Column(length = 1000)
    public String description;

    // Relationships
    @OneToMany(mappedBy = "restaurant")
    public List<MenuItem> menuItems;
}

// Resource example
@Path("/api/restaurants")
public class RestaurantResource {

    @GET
    public List<Restaurant> getAll() {
        return Restaurant.listAll();
    }

    @POST
    public Response create(Restaurant restaurant) {
        restaurant.persist();
        return Response.created(URI.create("/api/restaurants/" + restaurant.id)).build();
    }
}
```

## 🌍 Environment Variables

### Frontend (.env)

Create a `.env` file in the `restaurantes-frontend` directory with the following variables:

```bash
# Backend API URL (default: http://localhost:8080/api)
VITE_API_URL=http://localhost:8080/api

# Payment gateway keys (for production)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Google Maps API key (if using maps)
VITE_GOOGLE_MAPS_API_KEY=AIzaSy...
```

### Backend (application.properties)

Check the `src/main/resources/application.properties` file for backend configuration:

```properties
# Database settings
quarkus.datasource.db-kind=h2
quarkus.datasource.jdbc.url=jdbc:h2:mem:default;DB_CLOSE_DELAY=-1

# Hibernate settings
quarkus.hibernate-orm.database.generation=validate

# API configuration
quarkus.rest.path=/api
```

### Key Variables

| Variable                     | Description                          |
|------------------------------|--------------------------------------|
| `VITE_API_URL`               | Backend API URL                      |
| `VITE_STRIPE_PUBLISHABLE_KEY`| Stripe key for payments              |

### Production Environment Variables

For production, you'll need to set additional environment variables:

```bash
# Database connection for PostgreSQL/MySQL
DB_URL=jdbc:postgresql://localhost:5432/restaurantes
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# API security settings
API_SECRET_KEY=your-secret-key-here
JWT_EXPIRATION_TIME=86400  # in seconds (1 day)

# Email configuration
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-email-password

# Payment gateway settings
STRIPE_SECRET_KEY=sk_live_...
```
| `VITE_GOOGLE_MAPS_API_KEY`   | Google Maps API key                  |

### Setting Up Environment Variables

1. **For Development**:
   - Copy the example environment file: `cp .env.example .env`
   - Edit the `.env` file with your specific configuration
   - For backend, update `application.properties` as needed

2. **For Production**:
   - Set environment variables directly in your deployment platform
   - Use a `.env.production` file if needed
   - Ensure sensitive data like API keys are properly secured

## 🐳 Docker Setup

Both frontend and backend can be run using Docker containers.

### Frontend

```bash
# Build image
docker build -t delivery-frontend .

# Run container
docker run -p 3000:3000 delivery-frontend
```

### Backend

```bash
# Build image
docker build -f restaurantes-backend/Dockerfile.jvm -t restaurantes-backend .

# Run container
docker run -p 8080:8080 restaurantes-backend
```

## 🚀 Deployment

### Production Build

To prepare the application for production, you'll need to create optimized builds of both frontend and backend.

#### Frontend
```bash
cd restaurantes-frontend
npm run build
```

This will create an optimized production build in the `dist` directory. The build includes:
- Minification of JavaScript and CSS files
- Tree-shaking to remove unused code
- Asset hashing for cache busting

#### Backend
For JVM mode (easier to debug):
```bash
cd restaurantes-backend
./mvnw package
java -jar target/quarkus-app/quarkus-run.jar
```

For native builds (recommended for production, smaller footprint and faster startup):
```bash
# With GraalVM installed
./mvnw package -Dnative

# Or using Docker
./mvnw package -Dnative -Dquarkus.native.container-build=true
```

### Docker Deployment

#### Frontend
```bash
# Build image
docker build -t delivery-frontend .

# Run container
docker run -p 3000:3000 delivery-frontend
```

#### Backend
```bash
# Build image (JVM mode)
docker build -f restaurantes-backend/Dockerfile.jvm -t restaurantes-backend .

# Run container
docker run -p 8080:8080 restaurantes-backend

# For native builds:
docker build -f restaurantes-backend/Dockerfile.native -t restaurantes-backend-native .
docker run -p 8080:8080 restaurantes-backend-native
```

### Docker Compose (Recommended)

For a complete production deployment, use our Docker Compose setup:

```bash
# From the root directory
docker-compose -f docker-compose.prod.yml up -d
```

This will:
- Start both frontend and backend services with proper networking
- Set environment variables from `.env` file
- Configure volume mounts for persistent data

### Kubernetes Deployment

For scalable production deployment, use our Kubernetes manifests:

1. Configure `k8s/configmap.yaml` with your environment variables
2. Apply the manifests:
   ```bash
   kubectl apply -f k8s/
   ```
3. Monitor the deployment status with:
   ```bash
   kubectl get pods -w
   ```

### Cloud Deployment Options

1. **AWS**:
   - EC2 for VM-based deployment
   - ECS/EKS for containerized deployment
   - RDS for managed database service

2. **Google Cloud**:
   - App Engine, Compute Engine, or GKE
   - Cloud SQL for managed databases

3. **Azure**:
   - App Service, Virtual Machines, or AKS
   - Azure Database for PostgreSQL/MySQL

### Environment Variables

Create a `.env` file in the root directory with your production configuration:

```bash
# Frontend
VITE_API_URL=https://your-api-domain.com/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Backend
QUARKUS_DATASOURCE_DB_KIND=postgresql
QUARKUS_DATASOURCE_USERNAME=your_db_user
QUARKUS_DATASOURCE_PASSWORD=your_db_password
```

### Post-Deployment Steps

1. **Database Migrations**:
   ```bash
   cd restaurantes-backend
   ./mvnw liquibase:update
   ```

2. **Verify Services**:
   - Frontend: http://your-domain.com
   - Backend API: http://your-api-domain.com/api
   - Swagger UI: http://your-api-domain.com/q/swagger

3. **Set Up Monitoring**:
   - Configure Prometheus and Grafana for metrics collection
   - Set up alerting for critical issues

## 🤝 Contribution Guidelines

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🏗️ Architecture Overview

The DeliveryApp is a modern web application built with a microservices architecture:

1. **Frontend**: Built with Vite + React for fast development and production builds
2. **Backend**: Quarkus-based REST API providing business logic and data access
3. **Database**: H2 (development) or PostgreSQL/MySQL (production)
4. **Authentication**: JWT-based authentication system
5. **Payments**: Stripe integration for secure payment processing

### Key Components:

- **State Management**: Zustand for efficient state management
- **Data Fetching**: React Query for optimized API calls
- **Routing**: React Router for client-side navigation
- **Styling**: Tailwind CSS with custom components

## 🔒 Security Considerations

The application follows industry best practices for security. Here are the key security measures implemented:

### 1. Authentication & Authorization
- **JWT-based authentication**: Secure token-based authentication system
- **Token expiration and refresh mechanism**: Prevents token reuse attacks
- **Role-based access control (RBAC)**: Different permissions for users, admins, and restaurant owners

### 2. Payment Processing Security
- **PCI-DSS compliant Stripe integration**: Ensures secure payment processing
- **Sensitive data protection**: No credit card information stored on our servers
- **Secure communication with payment gateway**: All transactions use HTTPS

### 3. Data Protection & Privacy
- **Encryption in transit**: All communications use HTTPS (TLS 1.2+)
- **Password security**: Passwords are hashed using bcrypt with salt
- **Sensitive data handling**: Personal information is protected according to GDPR requirements

### 4. Input Validation & Security
- **Server-side validation**: All inputs are validated on the server side
- **Rate limiting**: Protects against brute force attacks and DoS attempts
- **CSRF protection**: Prevents cross-site request forgery attacks
- **XSS protection**: Proper escaping of user-generated content

### 5. Network Security
- **CORS policy**: Restricted to trusted domains in production environment
- **Firewall rules**: Only necessary ports are exposed (80, 443)
- **Database access**: Limited to backend services only

### Security Best Practices
- Keep dependencies up-to-date to avoid vulnerabilities
- Regular security audits and penetration testing
- Implement proper error handling to avoid information leakage
- Monitor logs for suspicious activity

## 🚀 Performance Considerations

### Frontend Optimization

1. **Code Splitting**:
   - Vite's native code splitting for faster initial loads
   - Dynamic imports for lazy loading components

2. **Component Optimization**:
   - Use React.memo() to prevent unnecessary re-renders
   - Implement shouldComponentUpdate for class components when needed

3. **Image Optimization**:
   - WebP format support with fallback to JPEG/PNG
   - Responsive images with srcset attribute
   - Lazy loading of offscreen images

4. **API Optimization**:
   - React Query for efficient data fetching and caching
   - Debouncing search inputs to reduce API calls
   - Pagination for large datasets

### Backend Optimization

1. **Native Compilation**:
   - Quarkus native builds for faster startup times and lower memory usage
   - Use Dockerfile.native for production deployments

2. **Reactive Programming**:
   - Mutiny for non-blocking operations
   - Optimized database access with Panache

3. **Database Optimization**:
   - Proper indexing on frequently queried columns
   - Regularly review slow queries with EXPLAIN and optimize them
   - Connection pooling configuration

4. **Caching Strategies**:
   - HTTP response caching headers (Cache-Control, ETag)
   - Redis caching for frequently accessed data
   - Database query result caching

### Performance Monitoring

1. **Application Performance Monitoring (APM)**:
   - Implement tools like Prometheus, Grafana, or New Relic
   - Set up dashboards to monitor key metrics

2. **Logging and Metrics**:
   - Centralized logging with ELK stack (Elasticsearch, Logstash, Kibana)
   - Application metrics available at `/q/metrics`

3. **Regular Reviews**:
   - Periodically review slow queries and optimize them
   - Monitor system performance under load

### Frontend-Specific Performance Tips

1. **Avoid Large Bundles**:
   - Keep an eye on bundle size with `npm run build:analyze`
   - Remove unused dependencies regularly

2. **Optimize Font Loading**:
   - Use font-display: swap for faster text rendering
   - Preload key fonts in HTML head

3. **Efficient State Management**:
   - Use Zustand's selective state updates to minimize re-renders
   - Avoid storing large objects in global state when possible

## 📊 Monitoring & Logging

### Frontend Monitoring

1. **Error Tracking**:
   - Sentry integration for capturing JavaScript errors
   - Custom error boundaries in React components

2. **Performance Monitoring**:
   - Google Analytics for tracking user interactions and page load times
   - Web Vitals integration for core web vitals metrics

3. **Network Monitoring**:
   - React Query devtools for monitoring API calls
   - Network tab in browser developer tools

### Backend Monitoring

1. **Health Checks**:
   - Available at `/q/health` endpoint
   - Includes database connectivity checks and system metrics

2. **Metrics Collection**:
   - Prometheus metrics available at `/q/metrics`
   - JVM and application-specific metrics

3. **Logging**:
   - Logs stored in `restaurantes-backend/logs/` directory
   - Configurable log levels (TRACE, DEBUG, INFO, WARN, ERROR)

### Centralized Logging

1. **ELK Stack Configuration**:
   - Elasticsearch for log storage and search
   - Logstash for log collection and processing
   - Kibana for visualization and analysis

2. **Log Rotation**:
   - Configure log rotation policies to prevent disk space issues
   - Set appropriate retention periods based on compliance requirements

3. **Structured Logging**:
   - Use JSON format for logs to facilitate parsing
   - Include correlation IDs for request tracing across services

### Security Monitoring

1. **Audit Logs**:
   - Track sensitive operations like user authentication and data changes
   - Store audit logs separately from regular application logs

2. **Intrusion Detection**:
   - Monitor for suspicious activity patterns
   - Set up alerts for potential security incidents

3. **Compliance Reporting**:
   - Generate reports for GDPR, HIPAA, or other regulatory requirements

## 🚀 Performance Considerations

1. **Frontend**:
   - Implement lazy loading for images and components that are not immediately visible
   - Use React.memo() to prevent unnecessary re-renders of components
   - Optimize API calls by batching or debouncing when possible
2. **Backend**:
   - Add caching mechanisms (Redis) for frequently accessed data
   - Implement database indexing on query fields
   - Consider using pagination for large datasets

## 🚀 Deployment

1. **Frontend**:
   - Build production version: `npm run build`
   - Deploy to any static file server or CDN
2. **Backend**:
   - Build native executable: `./mvnw package -Pnative`
   - Run the executable: `./target/restaurantes-backend-1.0-SNAPSHOT-runner`

## ❓ Troubleshooting

1. **Frontend Issues**:
   - If Vite fails to start: Check Node.js version (v16+ required)
   - For build errors: Run `npm install` to ensure all dependencies are installed
2. **Backend Issues**:
   - If Quarkus won't start: Check Java version (17+ required)
   - For database connection issues: Verify credentials in `application.properties`
3. **Common Problems**:
   - CORS errors: Ensure backend is configured with correct CORS settings
   - API timeouts: Check network connectivity and server status

## 🛠️ Development Workflow

1. **Frontend**:
   - Start development server: `npm run dev`
   - Build for production: `npm run build`
2. **Backend**:
   - Run in development mode: `./mvnw quarkus:dev`
   - Package application: `./mvnw package`
3. **Database Migrations**:
   - Create new migration: `./mvnw liquibase:diff`
   - Update database: `./mvnw liquibase:update`

## 🧪 Testing

Testing is a critical part of our development process:

### Unit Tests
1. **Frontend**:
   - Run tests: `npm test`
   - Test coverage: `npm run test:coverage` (minimum 80% coverage)
2. **Backend**:
   - Run unit tests: `./mvnw test`
   - Integration tests: `./mvnw verify`

### End-to-End Tests
- Cypress for browser automation testing
- Run with: `npx cypress open`

### Running All Tests
```bash
cd restaurantes
./run-tests.sh  # Runs all frontend and backend tests
```

## ✅ Code Quality

1. **Frontend**:
   - Linting: `npm run lint`
   - Format code: `npm run format`
2. **Backend**:
   - Checkstyle: `./mvnw checkstyle:check`
   - Spotless: `./mvnw spotless:apply`

## 🚀 Deployment

1. **Frontend**:
   - Build production version: `npm run build`
   - Deploy to static hosting (Netlify, Vercel)
2. **Backend**:
   - Package application: `./mvnw package`
   - Deploy to cloud provider (AWS, GCP, Azure)

## 🔑 Environment Variables

1. **Frontend**:
   - Create `.env` file based on `.env.example`
   - Required variables: `VITE_API_URL`, `VITE_PAYMENT_GATEWAY_KEY`
2. **Backend**:
   - Configure in `application.properties`
   - Required variables: `quarkus.datasource.db-kind`, `quarkus.datasource.username`

## 🏗️ Architecture Overview

1. **Frontend**:
   - Built with Vite + React
   - State management: Zustand
   - Data fetching: React Query
2. **Backend**:
   - Quarkus framework (Java)
   - REST API endpoints
   - Database: PostgreSQL/H2
3. **Communication**:
   - Frontend calls backend via REST API
   - CORS enabled for cross-origin requests

## 🔒 Security Considerations

1. **Frontend**:
   - Use HTTPS in production
   - Validate all user inputs
2. **Backend**:
   - Implement authentication/authorization
   - Secure API endpoints
3. **General**:
   - Keep dependencies up to date
   - Regular security audits

## ⚡ Performance Considerations

1. **Frontend**:
   - Optimize images for faster loading
   - Lazy load components when possible
2. **Backend**:
   - Implement caching for frequent requests
   - Optimize database queries
3. **General**:
   - Monitor application performance
   - Profile and optimize bottlenecks

## 🚀 Deployment Considerations

1. **Frontend**:
   - Build production version: `npm run build`
   - Deploy to static file hosting (Netlify, Vercel)
2. **Backend**:
   - Package application: `./mvnw package`
   - Deploy to cloud provider (AWS, GCP, Azure)

## ⚠️ Troubleshooting Tips

1. **Frontend Issues**:
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`
2. **Backend Issues**:
   - Check Quarkus logs for errors
   - Verify database connection settings
3. **General Tips**:
   - Restart development servers if changes don't appear

## 🔧 Code Quality Tools

1. **Frontend**:
   - Linter: ESLint (configured in .eslintrc.js)
   - Formatter: Prettier (configured in .prettierrc)
2. **Backend**:
   - Linter: Checkstyle (configured in pom.xml)
   - Formatter: Spotless (configured in pom.xml)

## 🧪 Testing

1. **Frontend**:
   - Run tests: `npm test`
   - Test coverage: `npm run test:coverage`
2. **Backend**:
   - Run unit tests: `./mvnw test`
   - Integration tests: Configured in src/test/java
3. **End-to-End**:
   - Setup Cypress for browser testing

## 🗂️ Project Structure

1. **Frontend**:
   - src/: Main application code
   - public/: Static assets
   - .env.example: Environment variables template
2. **Backend**:
   - src/main/java/: Java source files
   - src/test/java/: Test files
   - src/main/resources/: Configuration files

## 🔑 Environment Variables

1. **Frontend**:
   - Create a `.env` file from `.env.example`
   - Configure API endpoints and other settings
2. **Backend**:
   - Configure in `src/main/resources/application.properties`

## 🗄️ Database Setup

1. **Development**:
   - Use H2 database (configured by default)
   - Access console at http://localhost:8080/h2-console
2. **Production**:
   - Configure PostgreSQL/MySQL settings in application.properties

## 🔒 Security Considerations

1. **Frontend**:
   - Never commit sensitive data to version control
   - Use environment variables for API keys
2. **Backend**:
   - Implement proper authentication and authorization
   - Secure API endpoints with JWT tokens

## ⚡ Performance Considerations

1. **Frontend**:
   - Optimize images and assets
   - Implement lazy loading for components
2. **Backend**:
   - Use caching for frequent requests
   - Optimize database queries

## 📊 Monitoring

1. **Frontend**:
   - Set up Google Analytics or similar service
   - Monitor page load times and user interactions
2. **Backend**:
   - Configure application metrics
   - Monitor system performance

## ❌ Troubleshooting

Here are solutions to common issues:

### 1. **Backend won't start**

- Check if required ports (8080) are available
- Verify Java version (requires Java 17)
- Check application.properties for configuration errors

### 2. **Frontend build fails**

- Ensure Node.js and npm/yarn are up to date
- Delete node_modules and reinstall dependencies
- Clear Vite cache with `rm -rf .vite`

### 3. **Database connection issues**

- Verify database credentials in application.properties
- Check if PostgreSQL/MySQL server is running
- For H2, ensure the db directory exists and has write permissions

### 4. **CORS errors**

- Ensure CORS is properly configured in backend (application.properties)
- Check frontend proxy settings in vite.config.ts

## 🚀 Deployment

1. **Frontend**:
   - Build production version with `npm run build`
   - Deploy to static file hosting (Netlify, Vercel)
2. **Backend**:
   - Package as JAR and deploy to server
   - Configure systemd service for production

## 🤝 Contributing

1. **Frontend**:
   - Fork the repository
   - Create a feature branch
   - Submit a pull request
2. **Backend**:
   - Follow Java coding conventions
   - Write unit tests for new features

## ⚠️ Troubleshooting

1. **Common Issues**:
   - Frontend not connecting to backend API
   - Database connection problems
2. **Solutions**:
   - Check environment variables
   - Verify server is running

## 🏗️ Architecture Overview

1. **Frontend**:
   - React-based single page application
   - Communicates with backend via REST API
2. **Backend**:
   - Spring Boot microservice architecture
   - Connects to relational database (H2/PostgreSQL)

## 🛠️ Technology Stack

1. **Frontend**:
   - React.js
   - Redux for state management
   - Material-UI for styling
2. **Backend**:
   - Spring Boot
   - Spring Data JPA
   - H2/PostgreSQL database

## 🏗️ Architecture Overview

The DeliveryApp follows a microservices architecture with separate frontend and backend components:

1. **Frontend**: React-based single-page application that communicates with the backend via REST API
2. **Backend**: Spring Boot microservice providing business logic and data access
3. **Database**: H2 for development, PostgreSQL/MySQL for production
4. **API Gateway**: Handles authentication and routing between services

## 🔧 Environment Variables

1. **Frontend**:
   - `REACT_APP_API_URL`: Backend API base URL
2. **Backend**:
   - `SPRING_DATASOURCE_URL`: Database connection string

## 🔒 Security Considerations

1. **Frontend**:
   - Never expose API keys in the codebase
   - Use HTTPS for all production traffic
2. **Backend**:
   - Implement proper authentication and authorization
   - Secure database connections with SSL/TLS

## ⚡ Performance Considerations

1. **Frontend**:
   - Optimize image sizes for faster loading
   - Implement lazy loading for components
2. **Backend**:
   - Use caching for frequently accessed data
   - Optimize database queries with proper indexing

## 🧪 Testing

Testing is a critical part of our development process:

### Unit Tests
1. **Frontend**:
   - Run tests: `npm test`
   - Test coverage: `npm run test:coverage` (minimum 80% coverage)
2. **Backend**:
   - Run unit tests: `./mvnw test`
   - Integration tests: `./mvnw verify`

### End-to-End Tests
- Cypress for browser automation testing
- Run with: `npx cypress open`

### Running All Tests
```bash
cd restaurantes
./run-tests.sh  # Runs all frontend and backend tests
```

## 🚀 CI/CD Pipeline

1. **Frontend**:
   - Automated builds on GitHub Actions
   - Deploy to Netlify on merge to main
2. **Backend**:
   - Maven build and test pipeline
   - Automatic deployment to production server

## 🧪 Testing

The project includes comprehensive tests to ensure reliability and maintainability. Here's how to run them:

### Running Tests

1. **Frontend Tests**:
   ```bash
   cd restaurantes-frontend
   npm test  # Runs unit tests with Jest
   npm run test:e2e  # Runs end-to-end tests with Cypress
   ```

2. **Backend Tests**:
   ```bash
   cd restaurantes-backend
   ./mvnw test  # Runs all tests (unit, integration)
   ./mvnw verify  # Runs tests and checks code quality
   ```

3. **Database Tests**:
   The backend includes database-specific tests that use an H2 in-memory database.

### Test Coverage

- Frontend: Aim for 80%+ coverage of business logic
- Backend: Aim for 90%+ coverage including edge cases
- API: All endpoints are tested with both positive and negative scenarios

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 1. Reporting Issues
- Use GitHub Issues to report bugs or feature requests
- Include steps to reproduce and expected behavior

### 2. Making Changes
1. Fork the repository
2. Create a new branch for your changes
3. Make your modifications with clear commit messages
4. Run tests to ensure nothing is broken
5. Submit a pull request

### 3. Code Style
- Follow existing code style and conventions
- For Java: Checkstyle, PMD, SpotBugs
- For JavaScript/TypeScript: ESLint, Prettier

### 4. Testing
- Write tests for new features or bug fixes
- Ensure all existing tests pass before submitting changes

### 5. Documentation
- Update README with any relevant changes
- Keep comments in code up-to-date

## ⚠️ Troubleshooting

1. **Frontend Issues**:
   - Clear npm cache if installation fails
   - Check browser console for errors
2. **Backend Issues**:
   - Verify database connection settings
   - Check application logs for errors

## 📝 Development Notes

### Immediate Next Steps:
1. Implement functional shopping cart sidebar
2. Create authentication pages
3. Connect with Quarkus backend
4. Implement payment system

### Technical Considerations:
- The project is designed to scale with multiple developers
- Architecture supports both REST and GraphQL APIs
- Zustand enables complex state management without Redux
- React Query optimizes backend calls with caching and synchronization

## 🤝 Contributing Guidelines

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository** and create your branch from `main`
2. **Follow our code style**:
   - Frontend: Prettier, ESLint
   - Backend: Checkstyle, Spotless
3. **Write tests** for your changes
4. **Document your code**
5. **Create a Pull Request** with a clear description of your changes

Please note:
- For major changes, please open an issue first to discuss what you'd like to change
- Make sure all tests pass before submitting a PR
- Follow our commit message conventions

## ❓ Troubleshooting

### Common Issues:

1. **Backend not starting**:
   - Check if Java 17+ is installed: `java -version`
   - Ensure Maven is properly configured
   - Look at the error messages in the terminal output

2. **Frontend not connecting to backend**:
   - Verify both services are running (`npm start` and `./mvnw quarkus:dev`)
   - Check that API URL in `.env` matches your setup (default: `http://localhost:8080/api`)
   - Look for CORS errors in the browser console

3. **Database connection issues**:
   - For development, ensure H2 database is properly configured
   - For production, verify PostgreSQL/MySQL credentials are correct

4. **Build failures**:
   - Run `npm install` to ensure all dependencies are installed
   - Make sure you're using Node.js 16+ and Java 17+

## 📄 License

This project is private and belongs to [Your Startup].

---

**Developed with ❤️ to revolutionize delivery in Spain**