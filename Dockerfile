FROM node:20 AS build
WORKDIR /app
COPY ./package*.json ./
RUN npm install -g typescript
RUN npm install
COPY . .
RUN npm run build

FROM node:20.18.1-alpine
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json to the container
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY --from=build /app/dist /app/dist
# Build the Next.js app
RUN npm run build
# Expose the port that the app will run on
EXPOSE 3000
# Start the Next.js app
CMD ["npm", "start"]

