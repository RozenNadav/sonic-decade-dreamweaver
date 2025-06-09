// Test script for backend endpoints
const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));

const API_URL = 'http://localhost:3001';

async function testBackend() {
  try {
    // Test health endpoint
    console.log('Testing health endpoint...');
    const response = await fetch('http://localhost:3001/health');
    const data = await response.json();
    console.log('Health check response:', data);

    // Test song generation endpoint
    console.log('\nTesting song generation endpoint...');
    const songResponse = await fetch(`${API_URL}/api/generate-song`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keywords: 'summer, love, beach',
        genre: 'Pop',
        decade: '1980s'
      })
    });

    const songData = await songResponse.json();
    console.log('Song generation response:', songData);

  } catch (error) {
    console.error('Error testing backend:', error);
  }
}

async function testGenerateSong() {
    try {
        console.log('Sending request to generate song...');
        
        const response = await fetch('http://localhost:3001/api/generate-song', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                keywords: "summer, love, beach",
                genre: "Pop",
                decade: "1980s"
            })
        });

        const data = await response.json();
        console.log('Response received:');
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Run the test
testBackend();
testGenerateSong(); 