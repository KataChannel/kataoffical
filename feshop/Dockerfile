# Stage 1: Run SSR with Node.js
FROM node:20-alpine AS runtime

WORKDIR /app

# Copy build from local into Docker image
COPY ./dist/sandboxrau /app/dist/sandboxrau
# COPY ./node_modules /app/node_modules
# COPY ./package.json /app/package.json

# Run SSR application with Node.js
EXPOSE 4500
CMD ["node", "dist/sandboxrau/server/server.mjs"]
