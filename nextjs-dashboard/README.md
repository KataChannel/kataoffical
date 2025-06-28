# Cấu trúc dự án Next.js 15 chuyên nghiệp chuẩn Enterprise

```
my-nextjs-15-app/
├── .env                          # Environment variables (local)
├── .env.example                  # Template cho env vars
├── .env.local                    # Local development env
├── .env.development             # Development environment
├── .env.staging                 # Staging environment  
├── .env.production              # Production environment
├── .gitignore
├── .eslintrc.json              # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── tailwind.config.ts          # Tailwind CSS config (TypeScript)
├── next.config.ts              # Next.js 15 config (TypeScript)
├── tsconfig.json               # TypeScript configuration
├── package.json
├── pnpm-lock.yaml              # PNPM preferred in Next.js 15
├── README.md
├── docker-compose.yml          # Docker setup
├── Dockerfile
├── turbo.json                  # Turborepo config (monorepo)
├── .github/                    # GitHub workflows
│   └── workflows/
│       ├── ci.yml
│       ├── deployment.yml
│       └── pr-checks.yml
│
├── docs/                       # Documentation
│   ├── api.md
│   ├── deployment.md
│   └── development.md
│
├── public/                     # Static assets
│   ├── icons/
│   ├── images/
│   ├── favicon.ico
│   ├── robots.txt
│   └── manifest.json
│
├── src/                        # Source code
│   ├── app/                    # App Router (Next.js 15 enhanced)
│   │   ├── (auth)/            # Route groups
│   │   │   ├── login/
│   │   │   │   ├── page.tsx
│   │   │   │   └── loading.tsx
│   │   │   └── register/
│   │   │       ├── page.tsx
│   │   │       └── error.tsx
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── loading.tsx
│   │   │   │   └── @modal/     # Parallel routes
│   │   │   │       └── default.tsx
│   │   │   └── analytics/
│   │   │       ├── page.tsx
│   │   │       └── template.tsx # Template for animations
│   │   ├── api/               # API routes với enhanced features
│   │   │   ├── auth/
│   │   │   │   └── route.ts
│   │   │   ├── users/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── webhooks/      # Webhook handlers
│   │   │   │   └── stripe/
│   │   │   │       └── route.ts
│   │   │   └── health/
│   │   │       └── route.ts
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout with enhanced features
│   │   ├── page.tsx           # Home page
│   │   ├── loading.tsx        # Global loading UI
│   │   ├── error.tsx          # Global error UI với Error Boundary
│   │   ├── not-found.tsx      # 404 page
│   │   ├── global-error.tsx   # Global error boundary (Next.js 15)
│   │   └── template.tsx       # Root template for page transitions
│   │
│   ├── components/             # Reusable components
│   │   ├── ui/                # Shadcn/ui components
│   │   │   ├── button.tsx     # Lowercase naming (shadcn convention)
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── card.tsx
│   │   │   └── index.ts       # Barrel exports
│   │   ├── forms/             # Form components với React Hook Form
│   │   │   ├── LoginForm/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── LoginForm.test.tsx
│   │   │   │   └── schema.ts  # Zod validation
│   │   │   ├── ContactForm/
│   │   │   └── index.ts
│   │   ├── layout/            # Layout components
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Sidebar/
│   │   │   └── Navigation/
│   │   ├── providers/         # Context providers
│   │   │   ├── ThemeProvider.tsx
│   │   │   ├── QueryProvider.tsx
│   │   │   └── AuthProvider.tsx
│   │   └── features/          # Feature-specific components
│   │       ├── auth/
│   │       ├── dashboard/
│   │       └── user-management/
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── use-auth.ts        # Kebab case for hooks
│   │   ├── use-local-storage.ts
│   │   ├── use-debounce.ts
│   │   ├── use-server-action.ts # Server Actions hook
│   │   └── index.ts
│   │
│   ├── lib/                   # Utility libraries
│   │   ├── auth.ts           # Authentication với NextAuth.js v5
│   │   ├── db.ts             # Database connection (Prisma/Drizzle)
│   │   ├── validations/      # Zod schemas
│   │   │   ├── auth.ts
│   │   │   ├── user.ts
│   │   │   └── index.ts
│   │   ├── constants.ts      # App constants
│   │   ├── utils.ts          # General utilities (cn function)
│   │   ├── email.ts          # Email service (Resend/NodeMailer)
│   │   ├── storage.ts        # File storage (S3/Cloudinary)
│   │   ├── cache.ts          # Redis/Memory cache
│   │   └── rate-limit.ts     # Rate limiting
│   │
│   ├── server/               # Server-side logic (Next.js 15)
│   │   ├── actions/          # Server Actions
│   │   │   ├── auth.ts
│   │   │   ├── user.ts
│   │   │   └── index.ts
│   │   ├── queries/          # Server queries
│   │   │   ├── user.ts
│   │   │   └── posts.ts
│   │   └── db/              # Database layer
│   │       ├── schema.ts
│   │       └── queries.ts
│   │
│   ├── stores/               # State management
│   │   ├── auth-store.ts     # Zustand stores
│   │   ├── user-store.ts
│   │   ├── cart-store.ts
│   │   └── index.ts
│   │
│   ├── types/                # TypeScript definitions
│   │   ├── auth.ts
│   │   ├── user.ts
│   │   ├── api.ts
│   │   ├── database.ts
│   │   └── global.ts
│   │
│   ├── styles/               # Styling files
│   │   ├── globals.css
│   │   ├── components.css
│   │   └── utilities.css
│   │
│   └── middleware.ts         # Enhanced middleware
│
├── tests/                    # Test files
│   ├── __mocks__/           # Test mocks
│   ├── setup.ts             # Test setup
│   ├── utils/               # Test utilities
│   ├── unit/                # Unit tests
│   ├── integration/         # Integration tests
│   └── e2e/                 # Playwright E2E tests
│       ├── auth.spec.ts
│       └── dashboard.spec.ts
│
├── prisma/                   # Database (Prisma ORM)
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── scripts/                  # Build và deployment scripts
│   ├── build.sh
│   ├── deploy.sh
│   ├── seed-data.ts
│   └── generate-types.ts
│
└── tools/                   # Development tools
    ├── generators/          # Code generators (Plop.js)
    └── scripts/            # Utility scripts
```

## Next.js 15 Features chính được tích hợp:

### 1. **Enhanced App Router**
```typescript
// app/layout.tsx - Root layout với improvements
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | My App',
    default: 'My App'
  },
  description: 'Professional Next.js 15 application'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### 2. **Server Actions Integration**
```typescript
// server/actions/user.ts
'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const updateUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
})

export async function updateUser(formData: FormData) {
  const validatedFields = updateUserSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Database logic here
  
  revalidatePath('/profile')
  return { success: true }
}
```

### 3. **Enhanced Middleware**
```typescript
// middleware.ts - Next.js 15 enhanced
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Rate limiting
  const ip = request.ip ?? '127.0.0.1'
  
  // Authentication check
  const token = request.cookies.get('auth-token')
  
  // Geolocation-based logic
  const country = request.geo?.country
  
  // Enhanced security headers
  const response = NextResponse.next()
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

### 4. **TypeScript Configuration**
```typescript
// next.config.ts - Next.js 15 TypeScript config
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    // Next.js 15 experimental features
    typedRoutes: true,
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
  // Enhanced bundling
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  },
}

export default nextConfig
```

## Breaking Changes và Migration từ Next.js 14:

### 1. **TypeScript-first Configuration**
- `next.config.js` → `next.config.ts`
- `tailwind.config.js` → `tailwind.config.ts`

### 2. **Enhanced Server Components**
- Improved streaming
- Better error boundaries
- Optimized hydration

### 3. **New Caching Strategy**
```typescript
// Enhanced caching với Next.js 15
import { unstable_cache } from 'next/cache'

export const getUser = unstable_cache(
  async (id: string) => {
    return await db.user.findUnique({ where: { id } })
  },
  ['user'],
  {
    revalidate: 3600, // 1 hour
    tags: ['user']
  }
)
```

### 4. **Improved Parallel Routes**
```
app/
├── @modal/
│   ├── default.tsx
│   └── login/
│       └── page.tsx
└── layout.tsx
```

## Performance Optimizations Next.js 15:

### 1. **Bundle Optimization**
- Tree shaking improvements
- Better code splitting
- Reduced JavaScript bundle size

### 2. **Image Optimization**
- WebP/AVIF support enhanced
- Lazy loading improvements
- Better responsive images

### 3. **Server Components**
- Zero JavaScript sent to client
- Better SEO performance
- Improved Core Web Vitals

Cấu trúc này tận dụng tối đa các tính năng mới của Next.js 15 và đảm bảo ready cho production scale enterprise.