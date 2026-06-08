FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose application port
EXPOSE 5000

# Start application
CMD ["node", "src/server.js"]