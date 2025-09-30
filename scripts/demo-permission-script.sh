#!/bin/bash

echo "🧪 Testing Permission Creation Script"
echo "===================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'  
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}📋 Script Overview:${NC}"
echo "✅ Creates new permission with user input"
echo "✅ Automatically adds to all existing roles"
echo "✅ Provides detailed verification and reporting"
echo "✅ Handles name conflicts and errors gracefully"

echo ""
echo -e "${BLUE}🔧 Features:${NC}"
echo "• Interactive permission creation"
echo "• Unique name generation if conflicts exist"
echo "• Batch assignment to all active roles"
echo "• Comprehensive error handling"
echo "• Detailed success/failure reporting"

echo ""
echo -e "${BLUE}📁 Files Created:${NC}"
echo "• test-permission-and-add-all-role.js - Main script"
echo "• docs/TEST_PERMISSION_SCRIPT_GUIDE.md - Usage guide"

echo ""
echo -e "${BLUE}💡 Usage Examples:${NC}"
echo ""
echo -e "${YELLOW}Example 1 - Basic Permission:${NC}"
echo "node test-permission-and-add-all-role.js"
echo "  📝 Enter permission name: manage_products"
echo "  📄 Enter description: Manage product inventory"
echo "  🏷️  Enter group: products"

echo ""
echo -e "${YELLOW}Example 2 - System Permission:${NC}"
echo "node test-permission-and-add-all-role.js"
echo "  📝 Enter permission name: system_backup"
echo "  📄 Enter description: Access system backup functions"
echo "  🏷️  Enter group: system"

echo ""
echo -e "${BLUE}🎯 Sample Output Flow:${NC}"
echo "1. 🔐 CREATE NEW PERMISSION"
echo "2. 🔨 Creating permission..."
echo "3. 🔍 Fetching all existing roles..."
echo "4. 🔗 Adding permission to all roles..."
echo "5. 🔍 Verifying permission assignments..."
echo "6. 📊 OPERATION SUMMARY"

echo ""
echo -e "${BLUE}⚠️  Important Notes:${NC}"
echo "• Ensure database is running before execution"
echo "• Script automatically handles duplicate names"
echo "• All active roles will receive the new permission"
echo "• Use Ctrl+C to interrupt if needed"

echo ""
echo -e "${BLUE}🚀 Ready to Run:${NC}"
echo "Execute: ${GREEN}node test-permission-and-add-all-role.js${NC}"
echo "Or:      ${GREEN}./test-permission-and-add-all-role.js${NC}"

echo ""
echo -e "${GREEN}🎉 Permission Testing Script Ready!${NC}"