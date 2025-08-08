#!/bin/bash

echo "🔧 FIXING GRAPHQL SELECT PARAMETER ISSUE"
echo "========================================="

cd /chikiet/kataoffical/rausachfullstack/api

echo "1. Killing existing processes..."
pkill -f "npm run start:dev" || true
pkill -f "nest start" || true
sleep 2

echo "2. Installing dependencies..."
npm install graphql-type-json

echo "3. Building project..."
npm run build

echo "4. Starting server..."
npm run start:dev &
SERVER_PID=$!

echo "5. Waiting for server to start..."
sleep 10

echo "6. Testing GraphQL schema..."
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "{ __schema { queryType { fields { name args { name type { name } } } } } }"
  }' | jq '.data.queryType.fields[] | select(.name == "findMany") | .args'

echo "7. Testing select parameter..."
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query TestSelect { findMany(modelName: \"dathang\", select: { title: true, id: true }, take: 2) }"
  }'

echo "8. Server PID: $SERVER_PID"
echo "✅ Fix completed! Check the output above."
