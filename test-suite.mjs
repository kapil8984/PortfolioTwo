import http from 'http';

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(body); } catch {}
        resolve({ statusCode: res.statusCode, headers: res.headers, raw: body, json });
      });
    });
    req.on('error', reject);
    if (data) {
      req.write(typeof data === 'string' ? data : JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log('=== RUNNING AUTOMATED API TEST SUITE ===\n');
  let passed = 0;
  let total = 0;

  async function test(name, fn) {
    total++;
    try {
      await fn();
      console.log(`[PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`[FAIL] ${name}:`, err.message);
    }
  }

  // 1. Contact: Method Not Allowed
  await test('Contact API rejects GET with 405', async () => {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/contact',
      method: 'GET',
    });
    if (res.statusCode !== 405) throw new Error(`Expected 405, got ${res.statusCode}`);
    if (!res.headers.allow) throw new Error('Missing Allow header');
  });

  // 2. Contact: Empty payload
  await test('Contact API rejects empty payload with 400', async () => {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/contact',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, {});
    if (res.statusCode !== 400) throw new Error(`Expected 400, got ${res.statusCode}`);
    if (res.json?.message !== 'Please provide your name.') throw new Error(`Unexpected message: ${res.json?.message}`);
  });

  // 3. Contact: Invalid email format
  await test('Contact API rejects malformed email with 400', async () => {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/contact',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, {
      name: 'John Doe',
      email: 'not-an-email',
      subject: 'Interview',
      message: 'This is a test message of valid length.',
    });
    if (res.statusCode !== 400) throw new Error(`Expected 400, got ${res.statusCode}`);
    if (!res.json?.message?.includes('valid email address')) throw new Error(`Unexpected message: ${res.json?.message}`);
  });

  // 4. Contact: Message too short (< 10 chars)
  await test('Contact API rejects message under 10 chars with 400', async () => {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/contact',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Interview',
      message: 'Hi',
    });
    if (res.statusCode !== 400) throw new Error(`Expected 400, got ${res.statusCode}`);
    if (!res.json?.message?.includes('at least 10 characters')) throw new Error(`Unexpected message: ${res.json?.message}`);
  });

  // 5. Contact: Valid request when API key unconfigured -> 503 with helpful message
  await test('Contact API returns 503 when EMAIL_PROVIDER_API_KEY unconfigured', async () => {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/contact',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, {
      name: 'John Recruiter',
      email: 'john@company.com',
      subject: 'Senior .NET Developer Opportunity',
      message: 'Hello Swati, we reviewed your portfolio and would love to schedule a technical discussion.',
    });
    if (res.statusCode !== 503) throw new Error(`Expected 503, got ${res.statusCode}`);
    if (res.json?.code !== 'CONFIGURATION_MISSING') throw new Error(`Expected CONFIGURATION_MISSING, got ${res.json?.code}`);
    if (!res.json?.message?.includes('EMAIL_PROVIDER_API_KEY')) throw new Error(`Unexpected message: ${res.json?.message}`);
  });

  // 6. AI: Method Not Allowed
  await test('AI Chat API rejects GET with 405', async () => {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/ai/chat',
      method: 'GET',
    });
    if (res.statusCode !== 405) throw new Error(`Expected 405, got ${res.statusCode}`);
  });

  // 7. AI: Missing messages array
  await test('AI Chat API rejects empty messages array with 400', async () => {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/ai/chat',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, { messages: [] });
    if (res.statusCode !== 400) throw new Error(`Expected 400, got ${res.statusCode}`);
  });

  // 8. AI: Valid query when GROQ_API_KEY unconfigured -> 503
  await test('AI Chat API returns 503 when GROQ_API_KEY unconfigured', async () => {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/ai/chat',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, {
      messages: [{ role: 'user', content: "Tell me about Swati's .NET experience." }],
    });
    if (res.statusCode !== 503) throw new Error(`Expected 503, got ${res.statusCode}`);
    if (!res.json?.error?.includes('GROQ_API_KEY')) throw new Error(`Unexpected error message: ${res.json?.error}`);
  });

  console.log(`\n=== RESULTS: ${passed}/${total} TESTS PASSED ===\n`);
}

runTests().catch(console.error);
