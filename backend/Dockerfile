# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm install --production

# Copy built files from build stage
COPY --from=build /app/dist ./dist

# Create a directory for environment variables
RUN mkdir -p /app/config

# Expose the port your backend runs on
EXPOSE 3001

# Start the server with environment variable check
CMD ["sh", "-c", "if [ -z \"$OPENAI_API_KEY\" ]; then echo \"Error: OPENAI_API_KEY environment variable is not set\"; exit 1; fi; node dist/server.js"] 