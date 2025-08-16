#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const filePath = '/mnt/chikiet/kataoffical/rausachfullstack/api/src/donhang/donhang.service.ts';

console.log('🔄 Starting TonKho.update() fixes...');

try {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Pattern to match tonKho.update() calls
  const updatePattern = /await prisma\.tonKho\.update\(\s*\{[\s\S]*?\}\s*\)/g;
  
  // Find all matches
  const matches = content.match(updatePattern);
  
  if (matches) {
    console.log(`📊 Found ${matches.length} tonKho.update() calls to fix`);
    
    // Replace each match
    matches.forEach((match, index) => {
      console.log(`🔧 Fixing match ${index + 1}:`, match.substring(0, 50) + '...');
      
      // Extract where clause and data object
      const whereMatch = match.match(/where:\s*\{\s*sanphamId:\s*([^}]+)\s*\}/);
      const dataMatch = match.match(/data:\s*\{([\s\S]*)\}/);
      
      if (whereMatch && dataMatch) {
        const sanphamId = whereMatch[1].trim();
        const dataContent = dataMatch[1].trim();
        
        // Create replacement using updateTonKhoSafe
        const replacement = `await this.updateTonKhoSafe(prisma, ${sanphamId}, {\n        ${dataContent}\n      })`;
        
        content = content.replace(match, replacement);
      }
    });
    
    // Write back to file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ Successfully fixed all tonKho.update() calls');
    
  } else {
    console.log('✨ No tonKho.update() calls found to fix');
  }
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

console.log('🎯 Fix completed successfully!');
