# Backend NestJS — Pre-built locally, chỉ cài deps và chạy
FROM oven/bun:latest

RUN apt-get update -y && apt-get install -y openssl libssl-dev && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 1. Copy package files và tsconfig (cho Bun resolve baseUrl)
COPY package.json bun.lockb tsconfig.json ./
RUN bun install --production --no-cache

# 2. Copy Prisma schema và generate client cho platform Docker
COPY prisma/schema.prisma ./prisma/schema.prisma
RUN bunx prisma generate

# 3. Copy pre-built dist từ local trực tiếp ra root của /app
#    Như vậy /app/src và /app/prisma sẽ chứa file .js, giúp require() absolute paths chạy chuẩn xác!
COPY dist/ ./

# 4. Copy scripts folder for developer tooling (MCP)
COPY scripts/ ./scripts/

# Verify
RUN test -f src/main.js \
    && test -f prisma/prisma.service.js \
    && echo "✅ API build verified" \
    || (echo "❌ Missing critical files! Run 'bun run build' first." && exit 1)

EXPOSE 3331
CMD ["bun", "run", "src/main.js"]


