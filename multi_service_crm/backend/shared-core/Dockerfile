# Dockerfile (NestJS Backend - Development)
FROM node:18-alpine As development

WORKDIR /usr/src/app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining code
COPY . .

# Generate Prisma Client
# IMPORTANT: Adjust the schema path based on where this Dockerfile is relative to the schema
RUN npx prisma generate --schema=./prisma/schema.prisma # Hoặc shared.prisma, academy.prisma etc.

# Optional: Run build to catch errors early
# RUN npm run build

EXPOSE 3000

# Default command for development with hot-reload
CMD [ "npm", "run", "start:dev" ]