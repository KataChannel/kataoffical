/**
 * Test script to verify date synchronization fix
 * Testing the specific issue: 17/08/2025 -> 16/08/2025 shift
 */
console.log('🔍 Testing Date Synchronization Fix...\n');

// Simulate frontend timezone service
class MockTimezoneService {
  toUTC(value) {
    if (!value) return null;
    
    console.log(`🔄 Frontend toUTC processing: ${value} (type: ${typeof value})`);
    
    try {
      let momentDate;
      
      if (typeof value === 'string') {
        // Handle DD/MM/YYYY format (Vietnamese format)
        if (value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
          const [day, month, year] = value.split('/');
          momentDate = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00.000Z`);
          console.log(`🔧 Frontend DD/MM/YYYY: ${value} -> ${momentDate.toISOString()}`);
        }
        // Handle YYYY-MM-DD format
        else if (value.match(/^\d{4}-\d{2}-\d{2}$/)) {
          momentDate = new Date(`${value}T00:00:00.000Z`);
          console.log(`🔧 Frontend YYYY-MM-DD: ${value} -> ${momentDate.toISOString()}`);
        }
        // Handle other formats
        else {
          momentDate = new Date(value);
        }
      } else if (value instanceof Date) {
        // FIXED: Set to start of day to prevent timezone shifts
        const year = value.getFullYear();
        const month = value.getMonth();
        const day = value.getDate();
        momentDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
        console.log(`🔧 Frontend Date object: ${value} -> ${momentDate.toISOString()}`);
      } else {
        momentDate = new Date(value);
      }
      
      return momentDate.toISOString();
    } catch (error) {
      console.error(`❌ Frontend toUTC error:`, error);
      return null;
    }
  }
}

// Simulate backend timezone service
class MockBackendTimezoneService {
  toUTC(value) {
    if (!value) return null;
    
    try {
      if (typeof value === 'string') {
        // Handle YYYY-MM-DD format properly to avoid timezone shifts
        if (value.match(/^\d{4}-\d{2}-\d{2}$/)) {
          return `${value}T00:00:00.000Z`;
        }
        // Handle DD/MM/YYYY format
        if (value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
          const [day, month, year] = value.split('/');
          return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00.000Z`;
        }
        // Handle other string formats
        return new Date(value).toISOString();
      } else if (value instanceof Date) {
        return value.toISOString();
      }
      
      return new Date(value).toISOString();
    } catch (error) {
      console.error('Backend toUTC error:', error);
      return null;
    }
  }

  synchronizeDateField(fieldName, value) {
    if (!value) return null;
    
    console.log(`🔄 Backend synchronizing ${fieldName}: ${value} (type: ${typeof value})`);
    
    try {
      // For critical date fields, ensure proper UTC conversion without shifting
      if (['ngaygiao', 'ngaynhan'].includes(fieldName)) {
        let result;
        
        // Handle different input formats from frontend
        if (typeof value === 'string') {
          // FIXED: Handle YYYY-MM-DD format properly
          if (value.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const [year, month, day] = value.split('-').map(Number);
            result = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
            console.log(`🔧 Backend YYYY-MM-DD: ${value} -> UTC Date: ${result.toISOString()}`);
          } 
          // FIXED: Handle DD/MM/YYYY format
          else if (value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
            const [day, month, year] = value.split('/').map(Number);
            result = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
            console.log(`🔧 Backend DD/MM/YYYY: ${value} -> UTC Date: ${result.toISOString()}`);
          }
          // Handle ISO strings
          else if (value.includes('T') || value.includes('Z')) {
            result = new Date(value);
            console.log(`🔧 Backend ISO string: ${value} -> UTC Date: ${result.toISOString()}`);
          } 
          // Other string formats
          else {
            result = new Date(this.toUTC(value));
          }
        } else if (value instanceof Date) {
          // FIXED: Handle Date objects properly
          result = new Date(Date.UTC(
            value.getFullYear(), 
            value.getMonth(), 
            value.getDate(), 
            0, 0, 0, 0
          ));
          console.log(`🔧 Backend Date object: ${value} -> UTC Date: ${result.toISOString()}`);
        } else {
          // Fallback
          result = new Date(this.toUTC(value));
        }
        
        console.log(`✅ Backend synchronized ${fieldName}: ${result.toISOString()}`);
        return result;
      }
      
      // For other date fields, use standard conversion
      return new Date(this.toUTC(value));
    } catch (error) {
      console.error(`❌ Backend error synchronizing ${fieldName}:`, error);
      throw new Error(`Failed to synchronize date field ${fieldName}: ${error.message}`);
    }
  }
}

// Test cases
function runTests() {
  const frontendService = new MockTimezoneService();
  const backendService = new MockBackendTimezoneService();
  
  console.log('='.repeat(60));
  console.log('📋 TEST CASE 1: DD/MM/YYYY format (User reported issue)');
  console.log('='.repeat(60));
  
  const userInput = '17/08/2025';
  console.log(`👤 User selects: ${userInput}`);
  
  // Step 1: Frontend processes date
  const frontendResult = frontendService.toUTC(userInput);
  console.log(`🌐 Frontend converts to: ${frontendResult}`);
  
  // Step 2: Send to backend
  console.log(`📡 Sending to backend: ${frontendResult}`);
  
  // Step 3: Backend processes date
  const backendResult = backendService.synchronizeDateField('ngaynhan', frontendResult);
  console.log(`🗄️ Backend stores as: ${backendResult.toISOString()}`);
  
  // Step 4: Backend sends back to frontend
  const responseDate = backendResult.toISOString();
  console.log(`📨 Backend responds with: ${responseDate}`);
  
  // Step 5: Frontend displays date
  const displayDate = new Date(responseDate);
  const vietnameseFormat = `${displayDate.getUTCDate().toString().padStart(2, '0')}/${(displayDate.getUTCMonth() + 1).toString().padStart(2, '0')}/${displayDate.getUTCFullYear()}`;
  console.log(`🖥️ Frontend displays: ${vietnameseFormat}`);
  
  // Verification
  console.log('\n🔍 VERIFICATION:');
  console.log(`Input:  ${userInput}`);
  console.log(`Output: ${vietnameseFormat}`);
  
  if (userInput === vietnameseFormat) {
    console.log('✅ SUCCESS: No date shift detected!');
  } else {
    console.log('❌ FAILED: Date shift still occurs!');
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📋 TEST CASE 2: YYYY-MM-DD format');
  console.log('='.repeat(60));
  
  const isoInput = '2025-08-17';
  console.log(`👤 Input: ${isoInput}`);
  
  const frontendISO = frontendService.toUTC(isoInput);
  console.log(`🌐 Frontend: ${frontendISO}`);
  
  const backendISO = backendService.synchronizeDateField('ngaygiao', frontendISO);
  console.log(`🗄️ Backend: ${backendISO.toISOString()}`);
  
  const displayISO = new Date(backendISO.toISOString());
  const isoCheck = `${displayISO.getUTCFullYear()}-${(displayISO.getUTCMonth() + 1).toString().padStart(2, '0')}-${displayISO.getUTCDate().toString().padStart(2, '0')}`;
  console.log(`🖥️ Display: ${isoCheck}`);
  
  console.log('\n🔍 VERIFICATION:');
  console.log(`Input:  ${isoInput}`);
  console.log(`Output: ${isoCheck}`);
  
  if (isoInput === isoCheck) {
    console.log('✅ SUCCESS: No date shift detected!');
  } else {
    console.log('❌ FAILED: Date shift still occurs!');
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📋 TEST CASE 3: Date Object');
  console.log('='.repeat(60));
  
  const dateObj = new Date(2025, 7, 17); // August 17, 2025 (month is 0-indexed)
  console.log(`👤 Date object: ${dateObj}`);
  
  const frontendDate = frontendService.toUTC(dateObj);
  console.log(`🌐 Frontend: ${frontendDate}`);
  
  const backendDate = backendService.synchronizeDateField('ngaynhan', frontendDate);
  console.log(`🗄️ Backend: ${backendDate.toISOString()}`);
  
  const displayDateObj = new Date(backendDate.toISOString());
  const dateCheck = `${displayDateObj.getUTCDate().toString().padStart(2, '0')}/${(displayDateObj.getUTCMonth() + 1).toString().padStart(2, '0')}/${displayDateObj.getUTCFullYear()}`;
  console.log(`🖥️ Display: ${dateCheck}`);
  
  console.log('\n🔍 VERIFICATION:');
  console.log(`Expected: 17/08/2025`);
  console.log(`Output:   ${dateCheck}`);
  
  if (dateCheck === '17/08/2025') {
    console.log('✅ SUCCESS: No date shift detected!');
  } else {
    console.log('❌ FAILED: Date shift still occurs!');
  }
}

// Run the tests
runTests();

console.log('\n' + '='.repeat(60));
console.log('🎯 SUMMARY: Date Synchronization Test Complete');
console.log('='.repeat(60));
console.log('The enhanced timezone services should now prevent the 1-day shift bug.');
console.log('Key improvements:');
console.log('• Frontend: startOf(day) prevents timezone shifts');
console.log('• Backend: Direct UTC construction at midnight');
console.log('• Enhanced: DD/MM/YYYY format support');
console.log('• Critical: ngaygiao/ngaynhan field priority handling');
