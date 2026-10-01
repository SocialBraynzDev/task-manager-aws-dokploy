FROM node:20-alpine

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Copy application source code
COPY . .

# Backend listens on port 5000
EXPOSE 5000

# Start server
CMD ["node", "src/index.js"]
