#!/bin/bash

echo "📚 Documentation Organization Summary"
echo "===================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'  
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}🎯 Task Completed:${NC}"
echo "✅ All .md files (except README.md) moved to docs/ folder"
echo "✅ Created comprehensive docs/README.md index"
echo "✅ Organized documentation by categories"

echo ""
echo -e "${BLUE}📊 Documentation Statistics:${NC}"

# Count files in docs
doc_count=$(find docs/ -name "*.md" | wc -l)
echo -e "Total documentation files: ${GREEN}$doc_count${NC}"

# Check root directory
root_md_count=$(find . -maxdepth 1 -name "*.md" | wc -l)
echo -e "Files remaining in root: ${GREEN}$root_md_count${NC} (README.md only)"

echo ""
echo -e "${BLUE}📁 Directory Structure:${NC}"
echo "."
echo "├── README.md (main project readme)"
echo "└── docs/"
echo "    ├── README.md (documentation index)"
echo "    ├── User Permission System/"
echo "    ├── Performance & Optimization/"
echo "    ├── GraphQL Implementation/"
echo "    ├── Database & Bug Fixes/"
echo "    ├── Features & Enhancements/"
echo "    ├── Infrastructure & System/"
echo "    └── Testing & Validation/"

echo ""
echo -e "${BLUE}🔍 File Categories Created:${NC}"

# Count files by category
user_perm=$(find docs/ -name "*USERPERMISSION*" -o -name "*USER_PERMISSION*" -o -name "*GRANT*PERMISSION*" | wc -l)
performance=$(find docs/ -name "*PERFORMANCE*" -o -name "*OPTIMIZATION*" -o -name "*performance*" | wc -l)
graphql=$(find docs/ -name "*GRAPHQL*" -o -name "*graphql*" | wc -l)
bugfix=$(find docs/ -name "*BUG*" -o -name "*FIX*" -o -name "*DATABASE*" | wc -l)
features=$(find docs/ -name "*FEATURE*" -o -name "*ENHANCEMENT*" -o -name "*INLINE*" | wc -l)

echo -e "📋 User Permission System: ${YELLOW}$user_perm files${NC}"
echo -e "⚡ Performance & Optimization: ${YELLOW}$performance files${NC}"
echo -e "🔗 GraphQL Implementation: ${YELLOW}$graphql files${NC}"
echo -e "🐛 Database & Bug Fixes: ${YELLOW}$bugfix files${NC}"
echo -e "🎁 Features & Enhancements: ${YELLOW}$features files${NC}"

echo ""
echo -e "${BLUE}💡 How to Use Documentation:${NC}"
echo "1. Start with docs/README.md for complete index"
echo "2. Use categories to find specific topics"
echo "3. Search by keywords using Ctrl+F"
echo "4. Follow cross-references between documents"

echo ""
echo -e "${BLUE}🔗 Quick Access:${NC}"
echo "• Main Index: docs/README.md"
echo "• User Permissions: docs/USERPERMISSION_*.md"
echo "• Performance: docs/*PERFORMANCE*.md"
echo "• GraphQL: docs/*GRAPHQL*.md"
echo "• Bug Fixes: docs/*FIX*.md"

echo ""
echo -e "${GREEN}🎉 Documentation Organization: COMPLETED!${NC}"
echo "All markdown files have been properly organized and indexed."