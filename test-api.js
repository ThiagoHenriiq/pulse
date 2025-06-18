const fetch = require('node-fetch');

const BASE_URL = 'https://pulse-hgv2.vercel.app/api'; // URL do seu deploy Vercel

async function testEndpoint(endpoint, body = {}) {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  console.log(`POST /api/${endpoint}:`, data);
}

(async () => {
  await testEndpoint('copilot', { prompt: 'Olá Copilot' });
  await testEndpoint('schedule');
  await testEndpoint('finance');
  await testEndpoint('health');
})();
