# Use official Node.js image as the base
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Set environment to production for best performance
ENV NODE_ENV=production

# Install dependencies
RUN npm ci --only=production

# Copy rest of the app
COPY . .

# Build Next.js app
RUN npm run build

# Use non-root user for security
USER node

# Expose port from environment variable, default to 3000
ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT

# Start Next.js app
CMD ["npm", "start"]