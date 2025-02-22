npx bun add @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt bcryptjs

npx bun add @prisma/client
npx bun add -d prisma
npx bun prisma migrate dev --name init
npx bun prisma generate
npx bun install -g prisma
npx bun prisma studio