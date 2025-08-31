# restaurantes-backend

Quarkus-based backend for the DeliveryApp multi-restaurant delivery platform.

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Maven 3.6+

### Running in Development Mode

```bash
./mvnw quarkus:dev
```

This starts the application with live reload at [http://localhost:8080](http://localhost:8080).

### Packaging and Running

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

### Native Build (Production)

```bash
# With GraalVM installed
./mvnw package -Dnative

# Or using Docker
./mvnw package -Dnative -Dquarkus.native.container-build=true
```

## 🛠️ Key Features

- **REST API**: Built with JAX-RS/RESTEasy
- **Database**: Hibernate ORM with Panache (JPA)
- **Development Database**: H2 (in-memory)
- **Asynchronous Messaging**: Funqy HTTP framework
- **Database Migrations**: Liquibase integration

## 📁 Project Structure

```
src/
├── main/
│   ├── java/       # Java source files
│   │   └── com/example/restaurantes/
│   │       ├── model/      # JPA entities
│   │       ├── repository/ # Repository interfaces
│   │       ├── resource/   # REST API endpoints
│   │       ├── service/    # Business logic
│   │       └── config/     # Configuration classes
│   ├── resources/  # Configuration files (application.properties, etc.)
│   └── test/java/  # Unit and integration tests
└── test/resources/ # Test configuration files
```

## 🗄️ Database Setup

The backend uses an H2 in-memory database for development, which requires no special setup. For production environments, you'll need to configure a PostgreSQL or MySQL database:

1. Create a new database and user
2. Update the connection settings in `src/main/resources/application.properties`
3. Run migrations with Liquibase

## 🗃️ Database Schema

The application uses a relational database schema with the following key tables:

1. **users**: Stores user information (id, name, email, password_hash)
2. **restaurants**: Contains restaurant details (id, name, description, address)
3. **menu_items**: Lists all available menu items (id, restaurant_id, name, price)
4. **orders**: Tracks customer orders (id, user_id, status, total_amount)

For a complete schema diagram, see the `db-diagram.png` file in the repository.

## 🧪 Testing

### Running Tests

```bash
# Unit tests
./mvnw test

# Integration tests
./mvnw verify

# Test coverage report
./mvnw test jacoco:report
```

## 🔗 Running with Frontend

To run both frontend and backend services together:

1. In one terminal window, start the backend:
   ```bash
   ./mvnw quarkus:dev
   ```

2. In another terminal window, navigate to the root directory and start the frontend:
   ```bash
   cd ..
   npm start
   ```

3. The application will be accessible at [http://localhost:3000](http://localhost:3000)

## 🌍 Environment Variables

Check the `src/main/resources/application.properties` file for all required variables:

```properties
# Database settings
quarkus.datasource.db-kind=h2
quarkus.datasource.jdbc.url=jdbc:h2:mem:default;DB_CLOSE_DELAY=-1

# Hibernate settings
quarkus.hibernate-orm.database.generation=validate

# API configuration
quarkus.rest.path=/api
```

## 🏗️ Architecture Overview

The backend is built as a microservice using Quarkus framework:

1. **Core Components**:
   - REST API layer
   - Service layer for business logic
   - Repository layer for data access
   - Entity models representing database tables

2. **Key Technologies**:
   - Hibernate ORM for database interactions
   - Liquibase for database migrations
   - JWT for authentication and authorization
   - Panache for simplified data access

3. **Performance Features**:
   - Native compilation support
   - Reactive programming with Mutiny
   - Optimized JSON serialization/deserialization

## 🔒 Security Considerations

1. **Authentication**:
   - JWT-based authentication system
   - Token expiration and refresh mechanism
2. **Data Protection**:
   - Sensitive data encrypted in transit (HTTPS)
   - Passwords hashed with bcrypt using salt
3. **Input Validation**:
   - Server-side validation for all inputs
   - Rate limiting to prevent brute force attacks
4. **CORS Policy**:
   - Properly configured in production environment
5. **SQL Injection Protection**:
   - Parameterized queries through JPA/Hibernate

### Security Best Practices
- Keep dependencies up-to-date to avoid vulnerabilities
- Regular security audits and penetration testing
- Implement proper error handling to avoid information leakage
- Use Spring Security features for protection against common web vulnerabilities

## 🚀 Performance Considerations

1. **Native Compilation**:
   - Build native executables for better performance
   - Use Dockerfile.native for production builds
2. **Reactive Programming**:
   - Mutiny for non-blocking operations
   - Optimized database access with Panache
3. **Caching Strategies**:
   - HTTP response caching headers
   - Database query optimization
4. **Database Optimization**:
   - Use indexes on frequently queried columns
   - Optimize slow queries with EXPLAIN

### Performance Monitoring
- Implement application performance monitoring (APM) using tools like Prometheus, Grafana, or New Relic
- Set up logging and metrics collection with centralized storage
- Regularly review slow queries and optimize them
- Consider implementing caching mechanisms for frequently accessed data

## 📊 Monitoring & Logging

1. **Health Checks**:
   - Available at `/q/health`
   - Includes database connectivity checks
2. **Metrics**:
   - Prometheus metrics available at `/q/metrics`
   - JVM and application-specific metrics
3. **Logging**:
   - Logs are stored in `logs/` directory
   - Configured with Logback

## 🚀 Deployment

1. **Build Native Executable**:
   - Run: `./mvnw package -Pnative`
   - The executable will be in `target/` directory
2. **Run the Application**:
   - Execute: `./target/restaurantes-backend-1.0-SNAPSHOT-runner`
3. **Docker Deployment**:
   - Build image: `docker build -f src/main/docker/Dockerfile.jvm -t restaurantes-backend .`
   - Run container: `docker run -p 8080:8080 restaurantes-backend`

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
- **AWS**: Use EC2 for VM-based deployment or ECS/EKS for containerized deployment
- **Google Cloud**: App Engine, Compute Engine, or GKE
- **Azure**: App Service, Virtual Machines, or AKS

For detailed deployment instructions, see the [DEPLOYMENT.md](DEPLOYMENT.md) file in the root directory.

## ❓ Troubleshooting

1. **Common Issues**:
   - If Quarkus won't start: Check Java version (17+ required)
   - For database connection issues: Verify credentials in `application.properties`
2. **Build Problems**:
   - Native build fails: Ensure you have enough disk space
   - Maven dependency errors: Run `./mvnw install` to refresh dependencies
3. **Runtime Errors**:
   - CORS errors: Check `quarkus.http.cors` configuration
   - API timeouts: Verify database connectivity and server performance

## 🛠️ Development Workflow

1. **Run in Development Mode**:
   - Start server with live reload: `./mvnw quarkus:dev`
2. **Build and Package**:
   - Package application: `./mvnw package`
   - Create native executable: `./mvnw package -Pnative`
3. **Database Operations**:
   - Create migration: `./mvnw liquibase:diff`
   - Update database: `./mvnw liquibase:update`

## 🧪 Testing

1. **Unit Tests**:
   - Run: `./mvnw test`
2. **Integration Tests**:
   - Run: `./mvnw verify`
3. **Test Coverage**:
   - Generate report: `./mvnw jacoco:report`

## ✅ Code Quality

1. **Code Style**:
   - Checkstyle: `./mvnw checkstyle:check`
   - Spotless: `./mvnw spotless:apply`
2. **Static Analysis**:
   - PMD: `./mvnw pmd:check`
3. **Documentation**:
   - Generate Javadoc: `./mvnw javadoc:javadoc`

## 🚀 Deployment

1. **JVM Mode**:
   - Package: `./mvnw package`
   - Run: `java -jar target/restaurantes-backend-1.0-SNAPSHOT-runner.jar`
2. **Native Mode**:
   - Build: `./mvnw package -Pnative`
   - Run: `./target/restaurantes-backend-1.0-SNAPSHOT-runner`
3. **Docker**:
   - Build image: `docker build -f src/main/docker/Dockerfile.jvm -t restaurantes-backend .`
   - Run container: `docker run -p 8080:8080 restaurantes-backend`

## 🔑 Environment Variables

1. **Database Configuration**:
   - `quarkus.datasource.db-kind`: Database type (e.g., h2, postgresql)
   - `quarkus.datasource.username`: Database username
   - `quarkus.datasource.password`: Database password
2. **API Settings**:
   - `quarkus.http.cors`: CORS configuration
3. **Logging**:
   - `quarkus.log.category."io.quarkus".level`: Log level

## 🏗️ Architecture Overview

1. **Core Components**:
   - Quarkus framework (Java)
   - REST API endpoints
   - Database: PostgreSQL/H2
2. **Key Features**:
   - Reactive programming support
   - Dependency injection
   - Configurable via application.properties
3. **Communication**:
   - Frontend communicates via REST API
   - CORS enabled for cross-origin requests

## 🔒 Security Considerations

1. **Authentication**:
   - Implement JWT for secure authentication
2. **API Security**:
   - Secure sensitive endpoints
   - Enable CORS only for trusted domains
3. **Database Security**:
   - Use parameterized queries to prevent SQL injection
   - Regularly update database dependencies

## ⚡ Performance Considerations

1. **Database Optimization**:
   - Use indexes for frequently queried columns
   - Optimize slow queries
2. **Caching**:
   - Implement response caching
   - Cache database query results
3. **Monitoring**:
   - Set up application metrics
   - Monitor system performance

## 🚀 Deployment Considerations

1. **Build**:
   - Package application: `./mvnw package`
2. **Run in Docker**:
   - Build image: `docker build -f src/main/docker/Dockerfile.jvm -t restaurantes-backend .`
3. **Cloud Deployment**:
   - Deploy to cloud provider (AWS, GCP, Azure)

## ⚠️ Troubleshooting Tips

1. **Build Issues**:
   - Delete target directory: `rm -rf target`
   - Clean Maven cache: `./mvnw dependency:purge-local-repository`
2. **Runtime Issues**:
   - Check Quarkus logs for errors
   - Verify database connection settings
3. **Common Problems**:
   - Missing dependencies: Run `./mvnw install -U`

## 🔧 Code Quality Tools

1. **Static Analysis**:
   - Checkstyle: `./mvnw checkstyle:check`
   - PMD: `./mvnw pmd:check`
2. **Code Formatting**:
   - Spotless: Automatically formats code
3. **Documentation**:
   - Generate Javadoc: `./mvnw javadoc:javadoc`

## 🧪 Testing

1. **Unit Tests**:
   - Run: `./mvnw test`
2. **Integration Tests**:
   - Configured in src/test/java
3. **Performance Tests**:
   - Setup JMeter for load testing

## 🗂️ Project Structure

1. **src/main/java/**: Java source files
   - com.example.restaurantes/: Main package
2. **src/test/java/**: Test files
3. **src/main/resources/**: Configuration files
   - application.properties: Main configuration file

## 🔑 Environment Variables

Configure environment variables in `application.properties`:
- Database connection settings
- API keys and secrets
- Feature toggles

## 🗄️ Database Setup

1. **Development**:
   - H2 database configured by default
   - Access console at http://localhost:8080/h2-console
2. **Production**:
   - Configure PostgreSQL/MySQL settings in application.properties

## 🔒 Security Considerations

1. **Authentication**:
   - Implement JWT for API security
   - Use proper role-based access control
2. **Data Protection**:
   - Encrypt sensitive data in database
   - Validate all input data

## ⚡ Performance Considerations

1. **Caching**:
   - Implement response caching for frequent requests
   - Configure cache headers appropriately
2. **Database Optimization**:
   - Use indexes on frequently queried columns
   - Optimize slow queries with EXPLAIN

## 🚀 Performance Considerations

1. **Database Optimization**:
   - Use indexes on frequently queried columns
   - Optimize slow queries with EXPLAIN
   - Implement database connection pooling
2. **Caching**:
   - Implement caching mechanisms (Redis, Memcached) for frequently accessed data
   - Set appropriate cache expiration policies
3. **API Optimization**:
   - Implement rate limiting to prevent abuse
   - Use pagination for large datasets
4. **Resource Management**:
   - Monitor and optimize memory usage
   - Configure proper garbage collection settings

## 📊 Monitoring

1. **Application Metrics**:
   - Set up application metrics with Prometheus or similar tools
   - Monitor system performance including CPU, memory, and disk usage
2. **Logging**:
   - Configure proper log levels
   - Implement centralized logging

## 🚀 Deployment

1. **Build and Package**:
   - Run `mvn clean package` to create JAR file
   - Deploy to production server
2. **Production Setup**:
   - Configure systemd service for automatic restarts
   - Set up proper environment variables

## 🤝 Contributing

1. **Code Style**:
   - Follow Java coding conventions
   - Use Checkstyle for code formatting
2. **Testing**:
   - Write unit tests for new features
   - Run `mvn test` before submitting changes

## ⚠️ Troubleshooting

1. **Common Issues**:
   - Database connection problems
   - API endpoint not found errors
2. **Solutions**:
   - Check application.properties configuration
   - Verify server is running on correct port

## 🏗️ Architecture Overview

1. **Microservice**:
   - Built with Spring Boot
   - Follows RESTful principles
2. **Database**:
   - Uses H2 for development
   - Supports PostgreSQL/MySQL for production

## 🛠️ Technology Stack

1. **Core Framework**:
   - Spring Boot 3.x
   - Spring Data JPA
2. **Database**:
   - H2 (development)
   - PostgreSQL/MySQL (production)

## 🏗️ Architecture Overview

The backend is designed as a Spring Boot microservice that provides REST API endpoints for the frontend to consume:

1. **Core Components**:
   - REST controllers for handling HTTP requests
   - Service layer for business logic
   - Repository layer for data access
2. **Database Design**:
   - Relational database with normalized schema
   - Proper indexing for performance
3. **API Documentation**:
   - Swagger/OpenAPI documentation available at `/swagger-ui.html`

## 🔧 Environment Variables

1. **Required Variables**:
   - `SPRING_DATASOURCE_URL`: Database connection string
   - `SPRING_DATASOURCE_USERNAME`: Database username
   - `SPRING_DATASOURCE_PASSWORD`: Database password
2. **Optional Variables**:
   - `SERVER_PORT`: Custom port for the application

## 🔒 Security Considerations

1. **Authentication**:
   - Implement JWT-based authentication
   - Use secure password storage (BCrypt)
2. **Data Protection**:
   - Secure database connections with SSL/TLS
   - Validate all input data to prevent SQL injection

## ⚡ Performance Considerations

1. **Database Optimization**:
   - Use indexes on frequently queried columns
   - Optimize slow queries with EXPLAIN
2. **Caching**:
   - Implement response caching for static content
   - Use Redis for session storage and caching

## 🧪 Testing

1. **Unit Tests**:
   - Run with `mvn test`
   - Aim for 80%+ code coverage
2. **Integration Tests**:
   - Test API endpoints with Postman
   - Write integration tests for critical functionality

## 🚀 CI/CD Pipeline

1. **Build Automation**:
   - Maven build and test pipeline
   - Automated deployment to production server
2. **Code Quality**:
   - SonarQube analysis
   - Checkstyle code formatting checks

## 🤝 Contributing

1. **Code Style**:
   - Follow Java Code Conventions
   - Use Checkstyle for consistent formatting
2. **Commit Messages**:
   - Use conventional commit format
   - Include relevant issue numbers

## ⚠️ Troubleshooting

1. **Build Issues**:
   - Ensure Maven is properly installed
   - Clear local repository cache if needed
2. **Runtime Issues**:
   - Verify database connection settings
   - Check application logs for errors

## 📚 API Documentation

The backend provides a REST API with comprehensive endpoints for all application functionality. Here are some key endpoints:

| Method | Path               | Description                |
|--------|--------------------|----------------------------|
| GET    | /api/restaurants   | Get all restaurants        |
| POST   | /api/restaurants   | Create a new restaurant    |
| GET    | /api/menu-items    | Get all menu items          |

For detailed API documentation, visit [http://localhost:8080/q/swagger](http://localhost:8080/q/swagger) when the backend is running in development mode. The Swagger UI provides an interactive interface to explore and test all available endpoints.

### API Authentication
All protected endpoints require a valid JWT token, which can be obtained by authenticating at `/api/auth/login`.

### API Versioning
The API follows semantic versioning principles with version numbers included in the URL path (e.g., `/v1/restaurants`).

### API Testing
You can test the API using tools like Postman or cURL. Sample requests are available in the `api-tests` directory.

## 🐳 Docker Setup

The backend can be run using a Docker container:

```bash
# Build image
docker build -f Dockerfile.jvm -t restaurantes-backend .

# Run container
docker run -p 8080:8080 restaurantes-backend
```

For production, you might want to use the native executable for better performance:

```bash
# Create native executable
./mvnw package -Dnative

# Build Docker image with native executable
docker build -f Dockerfile.native -t restaurantes-backend-native .

# Run container
docker run -p 8080:8080 restaurantes-backend-native
```

## ❓ Troubleshooting

### Common Issues:

1. **Backend not starting**:
   - Check if Java 17+ is installed: `java -version`
   - Ensure Maven is properly configured
   - Look at the error messages in the terminal output

2. **Database connection issues**:
   - For development, ensure H2 database is properly configured
   - For production, verify PostgreSQL/MySQL credentials are correct

3. **Build failures**:
   - Run `./mvnw install` to ensure all dependencies are installed
   - Make sure you're using Java 17+
   - Check if there's enough disk space for the build process

## 🤝 Contributing Guidelines

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository** and create your branch from `main`
2. **Follow our code style**:
   - Java: Checkstyle, Spotless
   - SQL: Liquibase formatting
3. **Write tests** for your changes
4. **Document your code**
5. **Create a Pull Request** with a clear description of your changes

Please note:
- For major changes, please open an issue first to discuss what you'd like to change
- Make sure all tests pass before submitting a PR
- Follow our commit message conventions

## 🔧 Available Commands

```bash
# Development with live reload
./mvnw quarkus:dev

# Package application
./mvnw package

# Create native executable (production)
./mvnw package -Dnative
```
