import * as fs from 'fs';

const banggiaData = JSON.parse(
  fs.readFileSync('/chikiet/kataoffical/rausachfinal/api/rausach_json/20251016_165325/Banggia.json', 'utf-8')
);

console.log('\n🔍 CHECKING FOR DUPLICATES IN BANGGIA BACKUP\n');

// Check duplicate IDs
const idMap = new Map();
banggiaData.forEach((b: any) => {
  if (idMap.has(b.id)) {
    console.log(`❌ Duplicate ID found: ${b.id}`);
    console.log('  Record 1:', idMap.get(b.id));
    console.log('  Record 2:', b);
  } else {
    idMap.set(b.id, b);
  }
});

if (idMap.size === banggiaData.length) {
  console.log(`✅ No duplicate IDs (${banggiaData.length} unique)`);
}

// Check duplicate mabanggia (might be unique constraint)
const mabanggiaMap = new Map();
banggiaData.forEach((b: any) => {
  if (mabanggiaMap.has(b.mabanggia)) {
    console.log(`\n⚠️  Duplicate mabanggia found: ${b.mabanggia}`);
    console.log('  Record 1:', JSON.stringify(mabanggiaMap.get(b.mabanggia), null, 2));
    console.log('  Record 2:', JSON.stringify(b, null, 2));
  } else {
    mabanggiaMap.set(b.mabanggia, b);
  }
});

if (mabanggiaMap.size === banggiaData.length) {
  console.log(`✅ No duplicate mabanggia (${banggiaData.length} unique)`);
} else {
  console.log(`\n❌ Found ${banggiaData.length - mabanggiaMap.size} duplicate mabanggia!`);
}

// Check which one is BG24
const bg24 = banggiaData.find((b: any) => b.id === 'cc845265-66d1-4363-a1f9-5e7c9ad591aa');
console.log(`\n🎯 BG24 in backup:`);
console.log(`  ID: ${bg24.id}`);
console.log(`  mabanggia: ${bg24.mabanggia}`);
console.log(`  title: ${bg24.title}`);
console.log(`  isActive: ${bg24.isActive}`);
console.log(`  status: ${bg24.status}`);
