FROM node:lts-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* ./
RUN yarn install --frozen-lockfile

# 2. Build the Next.js app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN \
    if [ -f yarn.lock ]; then yarn run build; \
    elif [ -f package-lock.json ]; then yarn run build; \
    else echo "No lock file found, skipping build" && exit 1; \
    fi

# 3. Final production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only necessary files for standalone
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

RUN mkdir -p /app/.next/cache && chown -R node:node /app

USER node
EXPOSE 3000
CMD ["node", "server.js"]
