# AI Usage Documentation

## AI Tools Used
- **Claude (Anthropic)** — Primary AI assistant used throughout development

## What AI Was Used For

### 1. Project Structure
- Generating the initial folder structure for monorepo layout
- Creating Maven `pom.xml` with correct Spring Boot 3.x dependencies

### 2. Backend Code
- Scaffolding Spring Boot REST controllers (`/health`, `/api/items`)
- JPA Entity and Repository pattern setup
- Unit test structure using Mockito and JUnit 5

### 3. Frontend Code
- Next.js 14 app router page structure
- React hooks usage (`useState`, `useEffect`)
- Jest + React Testing Library test setup

### 4. Docker Configuration
- Multi-stage Dockerfile for backend (Maven build + JRE runtime)
- Multi-stage Dockerfile for frontend (Node build + standalone)
- docker-compose.yml service wiring

### 5. CI/CD Pipeline
- GitHub Actions pipeline structure (Dev → QA → Stage)
- Integration test scripts using curl
- Artifact upload configuration

## What I Changed Manually
- Fixed BOM encoding issues in Java test files
- Debugged Docker network connectivity between containers
- Fixed Next.js build-time API call issues with `mounted` state
- Resolved port binding issues with `network_mode: host` in CI
- Fixed YAML formatting issues in docker-compose.yml
- Tuned health check timing and retry logic

## Prompts Used (High Level)
- "Create a Spring Boot REST API with /health, GET /api/items, POST /api/items"
- "Write JUnit 5 unit tests using Mockito for ItemService"
- "Create a multi-stage Dockerfile for Spring Boot with non-root user"
- "Create GitHub Actions pipeline with Dev, QA, Stage jobs"
- "Fix: Next.js build fails because page tries to call API at build time"

## Lessons Learned
AI accelerated scaffolding significantly but required manual debugging for:
- Environment-specific issues (Windows BOM encoding)
- Docker networking in CI environments
- Timing issues with service health checks
