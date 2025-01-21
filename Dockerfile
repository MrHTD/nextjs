# Build stage
FROM node:20 AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install -g typescript && npm install

# Copy and build the project
COPY . .
RUN npm run build

# Production stage
FROM node:20.18.1-alpine
WORKDIR /app

# Copy necessary files from build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=build /app/next.config.js /app/next.config.js

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
