# ─────────────────────────────────────────
# STAGE 1: BUILD
# ─────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files FIRST (dependency caching)
COPY package*.json ./

# Install ALL dependencies including devDependencies (needed for build)
RUN npm ci

# Copy source code
COPY . .

# Build Next.js production bundle
RUN npm run build

# ─────────────────────────────────────────
# STAGE 2: RUNTIME
# ─────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Security: non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set production environment
ENV NODE_ENV=production

# Copy built app from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Change ownership
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

CMD ["node", "server.js"]