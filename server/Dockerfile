FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (not just production)
RUN npm ci

# Copy source code
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]