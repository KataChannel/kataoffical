// Test script for forgot password functionality
async function testForgotPassword() {
  const testData = {
    email: 'test@example.com',
    phone: '0123456789'
  };

  try {
    console.log('Testing forgot password API...');
    
    const response = await fetch('http://localhost:3105/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: testData.email }),
    });

    const result = await response.json();
    console.log('Forgot password result:', result);

    if (result.statusCode === 200) {
      console.log('✅ Forgot password API is working!');
      console.log('Reset token:', result.result?.resetToken);
      
      // Test reset password
      if (result.result?.resetToken) {
        console.log('\nTesting reset password API...');
        
        const resetResponse = await fetch('http://localhost:3105/auth/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: result.result.resetToken,
            newPassword: 'newpassword123'
          }),
        });

        const resetResult = await resetResponse.json();
        console.log('Reset password result:', resetResult);
        
        if (resetResult.statusCode === 200) {
          console.log('✅ Reset password API is working!');
        } else {
          console.log('❌ Reset password API failed:', resetResult.message);
        }
      }
    } else {
      console.log('❌ Forgot password API failed:', result.message);
    }
  } catch (error) {
    console.error('❌ Error testing APIs:', error);
  }
}

// Run the test
testForgotPassword();
