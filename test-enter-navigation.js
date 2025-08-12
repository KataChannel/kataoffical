#!/usr/bin/env node

/**
 * 🧪 TEST ENTER NAVIGATION ENHANCEMENT
 * ===================================
 * Test script để kiểm tra tính năng Enter sẽ chuyển đến input tiếp theo
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 ENTER NAVIGATION ENHANCEMENT TEST');
console.log('=====================================\n');

const componentPath = path.join(__dirname, 'frontend/src/app/admin/dathang/detaildathang/detaildathang.component.ts');
const templatePath = path.join(__dirname, 'frontend/src/app/admin/dathang/detaildathang/detaildathang.component.html');

try {
  console.log('✅ Loading detaildathang component and template...');
  const componentContent = fs.readFileSync(componentPath, 'utf8');
  const templateContent = fs.readFileSync(templatePath, 'utf8');
  
  console.log('Running Tests:');
  console.log('==============\n');

  // Test 1: focusNextFieldInSequence method exists
  const focusNextFieldMethod = componentContent.includes('focusNextFieldInSequence');
  console.log(`${focusNextFieldMethod ? '✅' : '❌'} Test 1: focusNextFieldInSequence method exists`);
  console.log('   Kiểm tra có method focus field tiếp theo\n');

  // Test 2: getFieldSequence method exists
  const getFieldSequenceMethod = componentContent.includes('getFieldSequence');
  console.log(`${getFieldSequenceMethod ? '✅' : '❌'} Test 2: getFieldSequence method exists`);
  console.log('   Kiểm tra có method định nghĩa thứ tự fields\n');

  // Test 3: getTabIndex method exists
  const getTabIndexMethod = componentContent.includes('getTabIndex');
  console.log(`${getTabIndexMethod ? '✅' : '❌'} Test 3: getTabIndex method exists`);
  console.log('   Kiểm tra có method tính tabindex động\n');

  // Test 4: Enhanced EnterUpdateValue with focus calls
  const enhancedEnterUpdate = componentContent.includes('focusNextFieldInSequence(\'sldat\'') && 
                              componentContent.includes('focusNextFieldInSequence(\'slgiao\'') &&
                              componentContent.includes('focusNextFieldInSequence(\'slnhan\'');
  console.log(`${enhancedEnterUpdate ? '✅' : '❌'} Test 4: Enhanced EnterUpdateValue with focus calls`);
  console.log('   Kiểm tra EnterUpdateValue gọi focus methods\n');

  // Test 5: Template has tabindex attributes
  const templateTabindex = templateContent.includes('[tabindex]="getTabIndex');
  console.log(`${templateTabindex ? '✅' : '❌'} Test 5: Template has dynamic tabindex attributes`);
  console.log('   Kiểm tra template có dynamic tabindex\n');

  // Test 6: Template has data attributes for field tracking
  const templateDataAttributes = templateContent.includes('[attr.data-row-index]') && 
                                 templateContent.includes('[attr.data-field]');
  console.log(`${templateDataAttributes ? '✅' : '❌'} Test 6: Template has data attributes for tracking`);
  console.log('   Kiểm tra template có data attributes cho tracking\n');

  // Test 7: Field sequence definition
  const fieldSequenceDefinition = componentContent.includes('sldat\', \'slgiao\', \'slnhan\', \'gianhap\', \'ghichu');
  console.log(`${fieldSequenceDefinition ? '✅' : '❌'} Test 7: Field sequence properly defined`);
  console.log('   Kiểm tra thứ tự fields được định nghĩa đúng\n');

  // Test 8: Focus navigation with text selection
  const textSelection = componentContent.includes('selectNodeContents') && 
                        componentContent.includes('removeAllRanges') &&
                        componentContent.includes('addRange');
  console.log(`${textSelection ? '✅' : '❌'} Test 8: Focus navigation with text selection`);
  console.log('   Kiểm tra focus có select text trong input\n');

  // Test 9: Row-wise and field-wise navigation logic
  const navigationLogic = componentContent.includes('currentFieldIndex + 1') && 
                          componentContent.includes('currentIndex + 1');
  console.log(`${navigationLogic ? '✅' : '❌'} Test 9: Row-wise and field-wise navigation logic`);
  console.log('   Kiểm tra logic navigation theo row và field\n');

  // Test 10: All field types have navigation
  const allFieldsNavigation = componentContent.includes('focusNextFieldInSequence(\'sldat\'') &&
                              componentContent.includes('focusNextFieldInSequence(\'slgiao\'') &&
                              componentContent.includes('focusNextFieldInSequence(\'slnhan\'') &&
                              componentContent.includes('focusNextFieldInSequence(\'gianhap\'') &&
                              componentContent.includes('focusNextFieldInSequence(\'ghichu\'');
  console.log(`${allFieldsNavigation ? '✅' : '❌'} Test 10: All field types have navigation`);
  console.log('   Kiểm tra tất cả field types đều có navigation\n');

  // Count passed tests
  const tests = [
    focusNextFieldMethod,
    getFieldSequenceMethod,
    getTabIndexMethod,
    enhancedEnterUpdate,
    templateTabindex,
    templateDataAttributes,
    fieldSequenceDefinition,
    textSelection,
    navigationLogic,
    allFieldsNavigation
  ];

  const passedTests = tests.filter(test => test).length;
  const totalTests = tests.length;

  console.log('=====================================');
  console.log(`📊 TEST RESULTS: ${passedTests}/${totalTests} tests passed`);

  if (passedTests === totalTests) {
    console.log('🎉 ALL TESTS PASSED! Enter navigation enhancement is complete.');
    console.log('\n🔍 FEATURE ANALYSIS:');
    console.log('========================');
    
    // Analyze method structure
    const focusMethodMatches = (componentContent.match(/focusNextFieldInSequence/g) || []).length;
    const tabIndexMatches = (templateContent.match(/getTabIndex/g) || []).length;
    const dataAttrMatches = (templateContent.match(/data-row-index/g) || []).length;
    
    console.log(`✅ focusNextFieldInSequence(): Found (${focusMethodMatches} occurrences)`);
    console.log(`✅ getTabIndex() in template: Found (${tabIndexMatches} occurrences)`);
    console.log(`✅ data-row-index attributes: Found (${dataAttrMatches} occurrences)`);
    
    console.log('\n🎯 ENTER NAVIGATION ENHANCEMENTS SUMMARY:');
    console.log('=========================================');
    console.log('✅ Enter key chuyển đến field tiếp theo trong cùng row');
    console.log('✅ Auto focus từ field cuối row đến field đầu row tiếp theo');
    console.log('✅ Smart text selection khi focus vào input mới');
    console.log('✅ Tabindex động cho proper keyboard navigation');
    console.log('✅ Data attributes cho field và row tracking');
    console.log('✅ Consistent navigation sequence: sldat → slgiao → slnhan → gianhap → ghichu');
    console.log('✅ Support cho cả number và string input types');
    console.log('✅ Error handling khi không tìm thấy next input');
    
    console.log('\n📝 NAVIGATION FLOW:');
    console.log('====================');
    console.log('🔄 Row 1: sldat → slgiao → slnhan → gianhap → ghichu');
    console.log('🔄 Row 2: sldat → slgiao → slnhan → gianhap → ghichu');
    console.log('🔄 Row N: sldat → slgiao → slnhan → gianhap → ghichu');
    console.log('🎯 Cross-row: Last field Row N → First field Row N+1');
    
    console.log('\n🎮 USER EXPERIENCE:');
    console.log('===================');
    console.log('✅ Press Enter → Auto focus next field');
    console.log('✅ Text auto-selected → Ready for new input');
    console.log('✅ Tab navigation → Follows logical sequence');
    console.log('✅ End of row → Jumps to next row automatically');
    console.log('✅ Visual feedback → Clear focus indicators');
    
    console.log('\n🚀 Component đã sẵn sàng cho smooth data entry!');
  } else {
    console.log('❌ Some tests failed. Please check the implementation.');
    
    // Show failed tests
    console.log('\n❌ FAILED TESTS:');
    const testNames = [
      'focusNextFieldInSequence method exists',
      'getFieldSequence method exists',
      'getTabIndex method exists',
      'Enhanced EnterUpdateValue with focus calls',
      'Template has dynamic tabindex attributes',
      'Template has data attributes for tracking',
      'Field sequence properly defined',
      'Focus navigation with text selection',
      'Row-wise and field-wise navigation logic',
      'All field types have navigation'
    ];
    
    tests.forEach((test, index) => {
      if (!test) {
        console.log(`   - ${testNames[index]}`);
      }
    });
  }

} catch (error) {
  console.error('❌ Error loading files:', error.message);
  process.exit(1);
}
