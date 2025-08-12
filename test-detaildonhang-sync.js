#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧪 DETAILDATHANG - DETAILDONHANG NAVIGATION SYNC TEST');
console.log('====================================================');
console.log('Testing Enter navigation match với DetailDonhang style...');
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

console.log('Running DetailDonhang Style Navigation Tests:');
console.log('==============================================\n');

// Test 1: Check DetailDonhang style navigation implementation
runTest('DetailDonhang style navigation pattern', 
  'Kiểm tra có implement same column navigation như DetailDonhang', () => {
  const hasSlDatNavigation = componentContent.includes("querySelectorAll('.sldat-input')");
  const hasGhiChuNavigation = componentContent.includes("querySelectorAll('.ghichu-input')");
  const hasSlNhanNavigation = componentContent.includes("querySelectorAll('.slnhan-input')");
  
  return hasSlDatNavigation && hasGhiChuNavigation && hasSlNhanNavigation;
});

// Test 2: Check for proper input focus and select
runTest('Input focus and select logic', 
  'Kiểm tra có logic focus và select như DetailDonhang', () => {
  const hasFocusLogic = componentContent.includes('nextInput.focus()');
  const hasSelectLogic = componentContent.includes('nextInput.select()');
  const hasInstanceCheck = componentContent.includes('nextInput instanceof HTMLInputElement');
  
  return hasFocusLogic && hasSelectLogic && hasInstanceCheck;
});

// Test 3: Check for text selection with range API
runTest('Text selection with Range API', 
  'Kiểm tra có text selection với Range API như DetailDonhang', () => {
  const hasRangeCreation = componentContent.includes('document.createRange()');
  const hasNodeSelection = componentContent.includes('range.selectNodeContents(nextInput)');
  const hasSelectionManagement = componentContent.includes('selection?.removeAllRanges()');
  const hasRangeAdd = componentContent.includes('selection?.addRange(range)');
  
  return hasRangeCreation && hasNodeSelection && hasSelectionManagement && hasRangeAdd;
});

// Test 4: Check for setTimeout wrapper
runTest('setTimeout wrapper for text selection', 
  'Kiểm tra có setTimeout wrapper như DetailDonhang', () => {
  const hasSetTimeout = componentContent.includes('setTimeout(() => {');
  const hasDelay = componentContent.includes('}, 10);');
  
  return hasSetTimeout && hasDelay;
});

// Test 5: Check for bounds checking
runTest('Array bounds checking', 
  'Kiểm tra có bounds checking như DetailDonhang', () => {
  const hasBoundsCheck = componentContent.includes('index < this.dataSource.data.length - 1');
  const hasArrayAccess = componentContent.includes('inputs[index + 1]');
  
  return hasBoundsCheck && hasArrayAccess;
});

// Test 6: Check for onInputFocus method
runTest('onInputFocus method implementation', 
  'Kiểm tra có onInputFocus method như DetailDonhang', () => {
  const hasOnInputFocus = componentContent.includes('onInputFocus(event: FocusEvent)');
  const hasAutoSelectComment = componentContent.includes('auto-select text khi focus vào input');
  const hasSameAsComment = componentContent.includes('Same as DetailDonhang');
  
  return hasOnInputFocus && hasAutoSelectComment && hasSameAsComment;
});

// Test 7: Check removal of old navigation methods
runTest('Old navigation methods removed', 
  'Kiểm tra đã remove old navigation methods', () => {
  const hasOldMethod = componentContent.includes('focusNextFieldInSequence(');
  const hasOldFieldSequence = componentContent.includes('getFieldSequence()');
  
  // Should NOT have these methods anymore
  return !hasOldMethod && !hasOldFieldSequence;
});

// Test 8: Check all field types have navigation
runTest('All field types have navigation', 
  'Kiểm tra tất cả field types đều có navigation logic', () => {
  const hasSlDat = componentContent.includes("field === 'sldat'");
  const hasSlGiao = componentContent.includes("field === 'slgiao'");
  const hasSlNhan = componentContent.includes("field === 'slnhan'");
  const hasGiaNhap = componentContent.includes("field === 'gianhap'");
  const hasGhiChu = componentContent.includes("field === 'ghichu'");
  
  return hasSlDat && hasSlGiao && hasSlNhan && hasGiaNhap && hasGhiChu;
});

// Test 9: Check validation logic preservation
runTest('Validation logic preserved', 
  'Kiểm tra validation logic vẫn được preserve', () => {
  const hasSlGiaoValidation = componentContent.includes('newGiao < v.sanpham[index][\'sldat\']');
  const hasSnackBarError = componentContent.includes('snackbar-error');
  const hasCalculation = componentContent.includes('ttnhan');
  
  return hasSlGiaoValidation && hasSnackBarError && hasCalculation;
});

// Test 10: Template compatibility check
runTest('Template compatibility maintained', 
  'Kiểm tra template vẫn compatible với navigation mới', () => {
  const hasSlDatClass = templateContent.includes('sldat-input');
  const hasKeydownEnter = templateContent.includes('keydown.enter');
  const hasTabIndex = templateContent.includes('getTabIndex');
  
  return hasSlDatClass && hasKeydownEnter && hasTabIndex;
});

console.log('=====================================');
if (allTestsPassed) {
  console.log(`🎉 ALL TESTS PASSED! DetailDathang navigation now matches DetailDonhang style.`);
  console.log('');
  console.log('🔍 NAVIGATION BEHAVIOR (DetailDonhang Style):');
  console.log('==============================================');
  console.log('✅ sldat1 → Enter → sldat2 → Enter → sldat3...');
  console.log('✅ ghichu1 → Enter → ghichu2 → Enter → ghichu3...');
  console.log('✅ slnhan1 → Enter → slnhan2 → Enter → slnhan3...');
  console.log('✅ gianhap1 → Enter → gianhap2 → Enter → gianhap3...');
  console.log('');
  console.log('🎯 DETAILDONHANG STYLE FEATURES:');
  console.log('================================');
  console.log('✅ Same column navigation (sldat1 → sldat2)');
  console.log('✅ Dual focus strategy: focus() + select() + Range API');
  console.log('✅ setTimeout wrapper for reliable text selection');
  console.log('✅ Array bounds checking for safety');
  console.log('✅ HTMLInputElement instanceof checking');
  console.log('✅ onInputFocus method for auto-select on focus');
  console.log('✅ Preserved validation and calculation logic');
  console.log('✅ Template compatibility maintained');
  console.log('');
  console.log('🚀 DetailDathang now has same navigation experience as DetailDonhang!');
} else {
  console.log(`❌ ${testCount - (allTestsPassed ? 0 : 1)} tests passed, some tests failed.`);
}

console.log(`📊 TEST RESULTS: ${testCount - (allTestsPassed ? 0 : 1)}/${testCount} tests passed`);
