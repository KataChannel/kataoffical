# Stage 1: Build Angular SSR
FROM node:18 AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --force
COPY . .
RUN npm run build --prod  # Build Angular với Universal (SSR)

# Stage 2: Chạy SSR trên Node.js
FROM node:18-alpine

WORKDIR /app
COPY --from=build /app /app
RUN npm install --force --omit=dev

EXPOSE 4301
CMD ["node", "dist/frontend/server/main.server.mjs"]
