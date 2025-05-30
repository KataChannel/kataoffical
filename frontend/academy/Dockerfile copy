# Stage 1: Run SSR with Bun.js
FROM oven/bun:1 AS runtime

WORKDIR /app

# Copy build from local into Docker image
COPY ./dist/frontend /app/dist/frontend
# COPY ./node_modules /app/node_modules
# COPY ./package.json /app/package.json

# Run SSR application with Bun
EXPOSE 4400
CMD ["bun", "dist/frontend/server/server.mjs"]
