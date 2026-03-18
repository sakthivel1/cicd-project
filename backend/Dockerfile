# ─────────────────────────────────────────
# STAGE 1: BUILD
# ─────────────────────────────────────────
FROM maven:3.9-eclipse-temurin-17 AS builder

# Set working directory inside container
WORKDIR /app

# Copy pom.xml FIRST (dependency caching trick)
COPY pom.xml .

# Download all dependencies (cached if pom.xml unchanged)
RUN mvn dependency:go-offline -B

# Now copy source code
COPY src ./src

# Build the jar, skip tests (tests run in CI pipeline separately)
RUN mvn clean package -DskipTests

# ─────────────────────────────────────────
# STAGE 2: RUNTIME
# ─────────────────────────────────────────
FROM eclipse-temurin:17-jre-alpine

# Security: create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set working directory
WORKDIR /app

# Copy ONLY the jar from build stage
COPY --from=builder /app/target/*.jar app.jar

# Change ownership to non-root user
RUN chown appuser:appgroup app.jar

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 8080

# Health check — Docker monitors this
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# Start the app
ENTRYPOINT ["java", "-jar", "app.jar"]