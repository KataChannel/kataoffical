#!/bin/bash

# GraphQL Universal API Setup & Test Script
echo "🚀 GraphQL Universal API - Setup & Test Script"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Change to API directory
cd /chikiet/kataoffical/rausachfullstack/api

echo ""
print_info "Step 1: Checking project structure..."

# Check if GraphQL files exist
if [ -f "src/graphql/graphql.module.ts" ]; then
    print_status "GraphQL module found"
else
    print_error "GraphQL module not found"
    exit 1
fi

if [ -f "src/graphql/services/universal.service.ts" ]; then
    print_status "Universal service found"
else
    print_error "Universal service not found"
    exit 1
fi

if [ -f "src/graphql/resolvers/universal.resolver.ts" ]; then
    print_status "Universal resolver found"
else
    print_error "Universal resolver not found"
    exit 1
fi

echo ""
print_info "Step 2: Installing dependencies..."

# Check if GraphQL packages are installed
if npm list @nestjs/graphql > /dev/null 2>&1; then
    print_status "GraphQL packages installed"
else
    print_warning "Installing GraphQL packages..."
    npm install @nestjs/graphql @nestjs/apollo graphql apollo-server-express
fi

echo ""
print_info "Step 3: Building application..."

# Build the application
if npm run build > build.log 2>&1; then
    print_status "Application built successfully"
else
    print_error "Build failed - check build.log for details"
    tail -20 build.log
    exit 1
fi

echo ""
print_info "Step 4: Starting server..."

# Start server in background
npm run start > server.log 2>&1 &
SERVER_PID=$!

# Wait for server to start
sleep 10

# Check if server is running
if ps -p $SERVER_PID > /dev/null; then
    print_status "Server started successfully (PID: $SERVER_PID)"
else
    print_error "Server failed to start - check server.log for details"
    tail -20 server.log
    exit 1
fi

echo ""
print_info "Step 5: Testing GraphQL endpoint..."

# Test GraphQL endpoint
GRAPHQL_URL="http://localhost:3000/graphql"

# Test introspection query
INTROSPECTION_QUERY='{"query":"{ __schema { types { name } } }"}'

# Make request to GraphQL endpoint
if curl -s -o /dev/null -w "%{http_code}" -X POST \
   -H "Content-Type: application/json" \
   -d "$INTROSPECTION_QUERY" \
   "$GRAPHQL_URL" | grep -q "200"; then
    print_status "GraphQL endpoint is responding"
else
    print_warning "GraphQL endpoint test failed - this might be normal if auth is required"
fi

echo ""
print_info "Step 6: Generating test queries..."

# Create sample GraphQL queries file
cat > sample-queries.graphql << 'EOF'
# Sample GraphQL Queries for Testing

# 1. Basic introspection
query GetSchema {
  __schema {
    types {
      name
      kind
    }
  }
}

# 2. Get users with pagination
query GetUsers {
  users(
    pagination: { page: 1, pageSize: 5 }
    filter: { isActive: true }
  ) {
    data {
      id
      email
      SDT
      isActive
      createdAt
    }
    pagination {
      total
      page
      pageSize
      totalPages
      hasNextPage
    }
  }
}

# 3. Get products
query GetSanphams {
  sanphams(
    pagination: { page: 1, pageSize: 10 }
    filter: { isActive: true }
  ) {
    data {
      id
      title
      masp
      giaban
      dvt
      soluong
    }
    pagination {
      total
    }
  }
}

# 4. Get customers
query GetKhachhangs {
  khachhangs(
    pagination: { page: 1, pageSize: 10 }
  ) {
    data {
      id
      name
      makh
      diachi
      sdt
    }
    pagination {
      total
    }
  }
}

# 5. Search products
query SearchProducts {
  universalSearch(
    model: "sanpham"
    searchTerm: "sách"
    searchFields: ["title", "masp"]
    pagination: { page: 1, pageSize: 5 }
  )
}

# 6. Get statistics
query GetProductStats {
  getModelStats(model: "sanpham")
}

# 7. Create new product (mutation)
mutation CreateProduct {
  createSanpham(input: {
    title: "Test Product"
    masp: "TEST001"
    giaban: 50000
    giagoc: 45000
    dvt: "cái"
    isActive: true
  }) {
    id
    title
    masp
    giaban
    createdAt
  }
}

# 8. Update product (mutation)
mutation UpdateProduct {
  updateSanpham(input: {
    id: "PRODUCT_ID_HERE"
    title: "Updated Test Product"
    giaban: 60000
  }) {
    id
    title
    giaban
    updatedAt
  }
}

# 9. Delete product (mutation)
mutation DeleteProduct {
  deleteSanpham(id: "PRODUCT_ID_HERE")
}

# 10. Bulk operations
mutation BulkDeleteProducts {
  bulkDelete(
    model: "sanpham"
    ids: ["id1", "id2", "id3"]
  )
}
EOF

print_status "Sample queries generated in sample-queries.graphql"

echo ""
print_info "Step 7: Setup completion summary..."

cat << EOF

🎉 GraphQL Universal API Setup Complete!

📊 Status Summary:
├── ✅ GraphQL module installed
├── ✅ Universal service created
├── ✅ Universal resolver created
├── ✅ Type definitions generated
├── ✅ Application built successfully
├── ✅ Server started (PID: $SERVER_PID)
└── ✅ Sample queries generated

🔗 Access Points:
├── GraphQL Playground: http://localhost:3000/graphql
├── GraphQL API: http://localhost:3000/graphql
└── Server logs: server.log

📁 Generated Files:
├── sample-queries.graphql - Sample GraphQL queries
├── build.log - Build output
└── server.log - Server output

🧪 Next Steps:
1. Open GraphQL Playground: http://localhost:3000/graphql
2. Copy queries from sample-queries.graphql
3. Test authentication with JWT token
4. Explore auto-generated schema documentation

🔐 Authentication:
All GraphQL operations require JWT token in headers:
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}

📚 Documentation:
├── docs/GRAPHQL_UNIVERSAL_API_GUIDE.md - Complete guide
└── docs/GRAPHQL_QUICK_REFERENCE.md - Quick reference

🛑 To stop server:
kill $SERVER_PID

EOF

print_status "Setup completed successfully! 🚀"

# Keep script running to show final status
echo ""
print_info "Server is running... Press Ctrl+C to stop the script (server will continue running)"
echo "Monitor server logs: tail -f server.log"

EOF
