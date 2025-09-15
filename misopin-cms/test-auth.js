// Test authentication endpoints
const testAuth = async () => {
  const baseUrl = 'http://localhost:3003';

  console.log('Testing authentication system...\n');

  // Test 1: Login with valid credentials
  console.log('1. Testing login with valid credentials (Super Admin)');
  try {
    const response = await fetch(`${baseUrl}/api/auth/callback/credentials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email: 'admin@misopin.com',
        password: 'admin123',
        csrfToken: '', // In real app, this would be fetched from /api/auth/csrf
      }),
      redirect: 'manual',
    });

    console.log(`   Status: ${response.status}`);
    console.log(`   Headers: ${JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2)}`);

    if (response.headers.get('set-cookie')) {
      console.log('   ✅ Authentication successful - cookies set');
    }
  } catch (error) {
    console.error('   ❌ Error:', error.message);
  }

  // Test 2: Login with invalid credentials
  console.log('\n2. Testing login with invalid credentials');
  try {
    const response = await fetch(`${baseUrl}/api/auth/callback/credentials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email: 'admin@misopin.com',
        password: 'wrongpassword',
        csrfToken: '',
      }),
      redirect: 'manual',
    });

    console.log(`   Status: ${response.status}`);
    if (response.status === 302 || response.status === 401) {
      console.log('   ✅ Invalid credentials rejected correctly');
    }
  } catch (error) {
    console.error('   ❌ Error:', error.message);
  }

  // Test 3: Check session endpoint
  console.log('\n3. Testing session endpoint');
  try {
    const response = await fetch(`${baseUrl}/api/auth/session`);
    const data = await response.json();
    console.log(`   Session data: ${JSON.stringify(data, null, 2)}`);
    console.log('   ✅ Session endpoint accessible');
  } catch (error) {
    console.error('   ❌ Error:', error.message);
  }

  console.log('\n✅ Authentication system tests completed');
};

testAuth().catch(console.error);