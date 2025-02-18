# Use the official BunJS image
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy package.json and bun.lock to cache dependencies
COPY package.json bun.lock ./

# Install dependencies using Bun
RUN bun install

# Copy the entire source code into the container
COPY . .

# Copy the environment file
COPY .env .env

# (Optional) If you need to run Prisma migrations:
# RUN bunx prisma migrate deploy
# RUN bun prisma migrate dev --name init
# Install Prisma globally
RUN bun install -g prisma

# Generate Prisma client
RUN bun prisma generate

# Expose the ports used by the NestJS application (e.g., 3000) and Prisma Studio (5555)
EXPOSE 3000
# Run the application
CMD ["bun", "run", "dist/main.js"]
