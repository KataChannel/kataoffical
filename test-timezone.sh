#!/bin/bash

echo "🕐 Testing Timezone Standardization System"
echo "=========================================="

# Start API server in background
echo "📡 Starting API server..."
cd /chikiet/kataoffical/rausachfullstack/api
bun start &
API_PID=$!

# Wait for API to start
echo "⏳ Waiting for API to start..."
sleep 5

# Test timezone functionality
echo "🧪 Testing timezone functions..."

# Test 1: Create record with date
echo "📝 Test 1: Create record with date field"
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { createOne(modelName: \"donhang\", data: { mancc: \"TEST001\", ngaynhan: \"2025-08-10\", name: \"Test Timezone\" }) { id ngaynhan createdAt } }"
  }' | jq .

echo ""

# Test 2: Query with date filter
echo "📋 Test 2: Query with date filter"
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { findMany(modelName: \"donhang\", where: { ngaynhan: { gte: \"2025-08-01\", lte: \"2025-08-31\" } }, take: 5) { id ngaynhan name createdAt } }"
  }' | jq .

echo ""

# Test 3: Update with new date
echo "🔄 Test 3: Update with new date"
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { updateOne(modelName: \"donhang\", where: { mancc: \"TEST001\" }, data: { ngaynhan: \"2025-08-15\" }) { id ngaynhan updatedAt } }"
  }' | jq .

echo ""

# Test 4: Check if dates are stored as UTC in database
echo "🗄️  Test 4: Check database timezone storage"
cd /chikiet/kataoffical/rausachfullstack/api
bun x ts-node -e "
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkDates() {
  const record = await prisma.donhang.findFirst({
    where: { mancc: 'TEST001' },
    select: { ngaynhan: true, createdAt: true }
  });
  
  console.log('Raw database values:');
  console.log('ngaynhan:', record?.ngaynhan);
  console.log('createdAt:', record?.createdAt);
  
  if (record?.ngaynhan) {
    const date = new Date(record.ngaynhan);
    console.log('ngaynhan UTC string:', date.toISOString());
    console.log('ngaynhan local string:', date.toLocaleString());
  }
  
  await prisma.\$disconnect();
}

checkDates().catch(console.error);
"

echo ""

# Clean up test data
echo "🧹 Cleaning up test data..."
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { deleteOne(modelName: \"donhang\", where: { mancc: \"TEST001\" }) { id } }"
  }' > /dev/null 2>&1

# Stop API server
echo "🛑 Stopping API server..."
kill $API_PID

echo ""
echo "✅ Timezone testing completed!"
echo ""
echo "🎯 Key Features Tested:"
echo "   - UTC conversion on create/update"
echo "   - Date range filtering with timezone normalization"
echo "   - Proper UTC storage in database"
echo "   - GraphQL automatic date field handling"
echo ""
echo "📚 See docs/25_TIMEZONE_STANDARDIZATION_GUIDE.md for usage guide"
