# 1. Install dependencies (with dev for build)
FROM node:23-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 2. Build the Next.js app
FROM node:23-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# 3. Final production image
FROM node:23-alpine AS runner
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