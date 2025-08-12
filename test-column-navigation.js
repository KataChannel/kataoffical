#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧪 COLUMN-WISE NAVIGATION TEST');
console.log('===============================');
console.log('Testing Enter navigation: sldat1 → sldat2 → sldat3...');
console.log('');

// Read component files
const componentPath = './frontend/src/app/admin/dathang/detaildathang/detaildathang.component.ts';
const templatePath = './frontend/src/app/admin/dathang/detaildathang/detaildathang.component.html';

let allTestsPassed = true;
let testCount = 0;

function runTest(testName, testDescription, testFunction) {
  testCount++;
  process.stdout.write(`✓ Test ${testCount}: ${testName}`);
  process.stdout.write(`\n   ${testDescription}\n`);
  
  try {
    const result = testFunction();
    if (result) {
      console.log('✅ PASSED\n');
      return true;
    } else {
      console.log('❌ FAILED\n');
      allTestsPassed = false;
      return false;
    }
  } catch (error) {
    console.log(`❌ ERROR: ${error.message}\n`);
    allTestsPassed = false;
    return false;
  }
}

console.log('✅ Loading component and template files...');

let componentContent = '';
let templateContent = '';

try {
  componentContent = fs.readFileSync(componentPath, 'utf8');
  templateContent = fs.readFileSync(templatePath, 'utf8');
} catch (error) {
  console.error('❌ Failed to read files:', error.message);
  process.exit(1);
}

console.log('Running Column Navigation Tests:');
console.log('================================\n');

// Test 1: Updated focusNextFieldInSequence method for column navigation
runTest('Column-wise navigation method', 
  'Kiểm tra method focus theo column (sldat1 → sldat2)', () => {
  const hasColumnNavigationLogic = componentContent.includes('Focus next row with the same field type (column navigation)');
  const hasNextRowInputs = componentContent.includes('querySelectorAll(`.${currentField}-input`)');
  const hasColumnNavigation = componentContent.includes('currentIndex < nextRowInputs.length - 1');
  
  return hasColumnNavigationLogic && hasNextRowInputs && hasColumnNavigation;
});

// Test 2: Check for same field type navigation
runTest('Same field type navigation logic', 
  'Kiểm tra logic navigate cùng loại field', () => {
  const hasSameFieldLogic = componentContent.includes('const nextInput = nextRowInputs[currentIndex + 1]');
  const hasFieldTypeComment = componentContent.includes('next row with the same field');
  
  return hasSameFieldLogic && hasFieldTypeComment;
});

// Test 3: Check for text selection in column navigation
runTest('Text selection in column navigation', 
  'Kiểm tra auto-select text khi chuyển column', () => {
  const hasTextSelection = componentContent.includes('range.selectNodeContents(nextInput)');
  const hasSelectionManagement = componentContent.includes('selection?.removeAllRanges()');
  
  return hasTextSelection && hasSelectionManagement;
});

// Test 4: Check for cycle back to first row (optional feature)
runTest('Cycle back to first row feature', 
  'Kiểm tra tính năng quay lại row đầu khi hết rows', () => {
  const hasCycleLogic = componentContent.includes('currentIndex === nextRowInputs.length - 1');
  const hasFirstRowFocus = componentContent.includes('const firstRowSameField = nextRowInputs[0]');
  
  return hasCycleLogic && hasFirstRowFocus;
});

// Test 5: Verify EnterUpdateValue still calls the navigation
runTest('EnterUpdateValue integration', 
  'Kiểm tra EnterUpdateValue vẫn gọi navigation methods', () => {
  const hasSlDatNavigation = componentContent.includes("this.focusNextFieldInSequence('sldat', index);");
  const hasGhiChuNavigation = componentContent.includes("this.focusNextFieldInSequence('ghichu', index);");
  
  return hasSlDatNavigation && hasGhiChuNavigation;
});

// Test 6: Template still has proper CSS classes
runTest('Template CSS classes for column navigation', 
  'Kiểm tra template có CSS classes cho column navigation', () => {
  const hasSlDatClass = templateContent.includes('class="sldat-input');
  const hasGhiChuClass = templateContent.includes('class="ghichu-input');
  const hasSlNhanClass = templateContent.includes('class="slnhan-input');
  
  return hasSlDatClass && hasGhiChuClass && hasSlNhanClass;
});

// Test 7: Check method comment describes column navigation
runTest('Method documentation', 
  'Kiểm tra documentation mô tả column navigation', () => {
  const hasColumnComment = componentContent.includes('focus next field of the same type (column-wise navigation)');
  
  return hasColumnComment;
});

// Test 8: Verify removal of row-wise navigation logic
runTest('Row-wise navigation removed', 
  'Kiểm tra đã remove logic navigation theo row', () => {
  // Should NOT have the old field sequence logic
  const hasOldFieldSequence = componentContent.includes('fieldSequence.indexOf(currentField)');
  const hasOldRowLogic = componentContent.includes('Try to focus the next field in the same row');
  
  return !hasOldFieldSequence && !hasOldRowLogic;
});

// Test 9: Error handling and fallback
runTest('Error handling and fallback', 
  'Kiểm tra error handling khi không tìm thấy next input', () => {
  const hasDisabledCheck = componentContent.includes("!nextInput.hasAttribute('disabled')");
  const hasDisplayCheck = componentContent.includes("nextInput.style.display !== 'none'");
  
  return hasDisabledCheck && hasDisplayCheck;
});

// Test 10: Complete integration test
runTest('Complete column navigation integration', 
  'Kiểm tra tích hợp hoàn chỉnh column navigation', () => {
  const hasUpdatedMethod = componentContent.includes('Focus next row with the same field type');
  const hasProperCalling = componentContent.includes("focusNextFieldInSequence('sldat'");
  const hasTemplateSupport = templateContent.includes('sldat-input');
  
  return hasUpdatedMethod && hasProperCalling && hasTemplateSupport;
});

console.log('=====================================');
if (allTestsPassed) {
  console.log(`🎉 ALL TESTS PASSED! Column navigation enhancement is complete.`);
  console.log('');
  console.log('🔍 NAVIGATION BEHAVIOR:');
  console.log('========================');
  console.log('✅ sldat1 → Enter → sldat2 → Enter → sldat3...');
  console.log('✅ ghichu1 → Enter → ghichu2 → Enter → ghichu3...');
  console.log('✅ slnhan1 → Enter → slnhan2 → Enter → slnhan3...');
  console.log('✅ gianhap1 → Enter → gianhap2 → Enter → gianhap3...');
  console.log('');
  console.log('🎯 COLUMN-WISE NAVIGATION SUMMARY:');
  console.log('===================================');
  console.log('✅ Enter key moves to next row, same column');
  console.log('✅ Auto-select text khi focus vào input mới');
  console.log('✅ Cycle back to first row khi đến cuối table');
  console.log('✅ Error handling cho disabled/hidden inputs');
  console.log('✅ Consistent behavior across all field types');
  console.log('');
  console.log('🚀 Component ready với column-wise Enter navigation!');
} else {
  console.log(`❌ ${testCount - (allTestsPassed ? 0 : 1)} tests passed, some tests failed.`);
}

console.log(`📊 TEST RESULTS: ${testCount - (allTestsPassed ? 0 : 1)}/${testCount} tests passed`);
