# ─────────────────────────────────────────
# STAGE 1: BUILD
# ─────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# ─────────────────────────────────────────
# STAGE 2: RUNTIME
# ─────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./

COPY --from=builder /app/.next/static ./.next/static

RUN mkdir -p ./public

RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

CMD ["node", "server.js"]
