#!/bin/bash

# Universal GraphQL System Demo Script
echo "🚀 Starting Universal GraphQL System Demo"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}📋 System Overview:${NC}"
echo "✅ Backend: Dynamic resolver factory with universal resolver"
echo "✅ Frontend: Universal GraphQL service with model factory"
echo "✅ Supported operations: findAll, findOne, createOne, createBulk, updateOne, updateBulk, deleteOne, deleteBulk"
echo "✅ Models: User, Role, Permission, Menu, AffiliateLink, LandingPage, TrackingEvent, ChatAIMessage, AuditLog, Resource, FileManager, Doanhso, HoaHong"

echo -e "\n${YELLOW}🏗️  Backend Structure:${NC}"
echo "└── backend/affiliate/src/graphql/"
echo "    ├── dynamic/"
echo "    │   ├── dynamic-resolver.factory.ts (Core factory)"
echo "    │   └── model-configs.ts (Model configurations)"
echo "    └── resolvers/"
echo "        └── universal.resolver.ts (Single resolver for all models)"

echo -e "\n${YELLOW}🖥️  Frontend Structure:${NC}"
echo "└── frontend/academy/src/app/shared/"
echo "    ├── graphql/"
echo "    │   └── universal.operations.ts (GraphQL operations)"
echo "    └── services/graphql/"
echo "        ├── universal-graphql.service.ts (Main service)"
echo "        └── model-service.factory.ts (Typed model services)"

echo -e "\n${GREEN}🎯 Usage Examples:${NC}"
echo -e "${BLUE}1. Direct Universal Service:${NC}"
echo "   this.universalService.findAll('User', { take: 10 })"
echo "   this.universalService.createOne('Role', { name: 'Admin' })"

echo -e "\n${BLUE}2. Model Factory Service:${NC}"
echo "   this.modelFactory.userService.findAll({ take: 10 })"
echo "   this.modelFactory.roleService.createOne({ name: 'Admin' })"

echo -e "\n${BLUE}3. Dynamic Model Service:${NC}"
echo "   const customService = this.modelFactory.createService('CustomModel')"
echo "   customService.findAll()"

echo -e "\n${GREEN}✨ Key Benefits:${NC}"
echo "• DRY: Write once, use for all models"
echo "• Type Safety: TypeScript generics support"
echo "• Flexible: Complex queries and relations"
echo "• Scalable: Easy to add new models"
echo "• Maintainable: Single source of truth"

echo -e "\n${GREEN}📊 Test Component:${NC}"
echo "Location: frontend/academy/src/app/admin/components/graphql-test/"
echo "Features:"
echo "• Load and display Users"
echo "• Load and display Affiliate Links"
echo "• Dynamic model testing"
echo "• CRUD operation testing"
echo "• Bulk operations example"

echo -e "\n${YELLOW}🚀 To run the demo:${NC}"
echo "1. Backend: cd backend/affiliate && npm run dev"
echo "2. Frontend: cd frontend/academy && ng serve"
echo "3. Visit: http://localhost:4200/admin (navigate to GraphQL Test)"

echo -e "\n${GREEN}📚 Documentation: ${NC}UNIVERSAL_GRAPHQL_DOCUMENTATION.md"

echo -e "\n${GREEN}✅ Universal GraphQL System Setup Complete!${NC}"