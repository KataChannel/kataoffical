#!/bin/bash

# Quick Start & Verification Script for Support Ticket System
# Chạy script này để kiểm tra hệ thống đang chạy đúng chưa

echo "🚀 Support Ticket System - Quick Verification"
echo "=============================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check Backend
echo "${BLUE}📡 Checking Backend API...${NC}"
BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3331/graphql)

if [ "$BACKEND_STATUS" == "400" ] || [ "$BACKEND_STATUS" == "200" ]; then
  echo "${GREEN}✅ Backend API is running on http://localhost:3331${NC}"
  echo "   GraphQL Playground: http://localhost:3331/graphql"
else
  echo "${RED}❌ Backend API is NOT running${NC}"
  echo "   Start with: cd api && npm start"
fi

echo ""

# Check Frontend
echo "${BLUE}🎨 Checking Frontend UI...${NC}"
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:4301)

if [ "$FRONTEND_STATUS" == "200" ]; then
  echo "${GREEN}✅ Frontend UI is running on http://localhost:4301${NC}"
  echo "   Support System: http://localhost:4301/admin/support"
else
  echo "${RED}❌ Frontend UI is NOT running${NC}"
  echo "   Start with: cd frontend && npm run dev"
fi

echo ""

# Check Upload Directory
echo "${BLUE}📁 Checking Upload Directory...${NC}"
if [ -d "./api/uploads" ]; then
  echo "${GREEN}✅ Upload directory exists: ./api/uploads${NC}"
else
  echo "${YELLOW}⚠️  Creating upload directory...${NC}"
  mkdir -p ./api/uploads
  echo "${GREEN}✅ Upload directory created${NC}"
fi

echo ""

# Check Prisma Client
echo "${BLUE}💾 Checking Prisma Client...${NC}"
if [ -d "./api/node_modules/@prisma/client" ]; then
  echo "${GREEN}✅ Prisma Client is generated${NC}"
else
  echo "${RED}❌ Prisma Client not found${NC}"
  echo "   Generate with: cd api && npx prisma generate"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "${GREEN}🎯 Next Steps:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. ${BLUE}Open Frontend:${NC}"
echo "   http://localhost:4301/admin/support"
echo ""
echo "2. ${BLUE}Test GraphQL API:${NC}"
echo "   http://localhost:3331/graphql"
echo ""
echo "3. ${BLUE}Run automated tests:${NC}"
echo "   ./test-support-system.sh"
echo ""
echo "4. ${BLUE}Read documentation:${NC}"
echo "   cat SUPPORT_TICKET_IMPLEMENTATION.md"
echo "   cat SUPPORT_COMPLETE_SUMMARY.md"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "${GREEN}✅ Support Ticket System is ready!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
