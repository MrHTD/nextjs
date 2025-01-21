FROM node:20 AS build
WORKDIR /app
COPY ./package*.json ./
RUN npm install -g typescript && npm install
COPY . .
RUN npm run build

FROM node:20.18.1-alpine
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next /app/.next  # Use .next for Next.js builds
COPY --from=build /app/public /app/public
COPY --from=build /app/next.config.js /app/next.config.js  # If you have a Next.js config

EXPOSE 3000
CMD ["npm", "start"]
