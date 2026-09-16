/**
 * Comprehensive Security Verification Suite for Cogniv Solutions Website
 * Tests all 17+ security scenarios against the active server.
 */

const BASE_URL = process.env.TEST_URL || "http://localhost:3002";

const validPayload = {
  name: "Aarav Sharma",
  businessName: "Sharma Logistics",
  email: "aarav@sharmalogistics.com",
  phone: "+91 9876543210",
  industry: "Logistics",
  companySize: "11–50",
  process: "We need automated dispatch notifications and invoice matching from WhatsApp to ERP.",
  tools: "WhatsApp, Excel",
  message: "Looking to deploy by next month.",
};

let passed = 0;
let failed = 0;

function assert(condition, testName, detail = "") {
  if (condition) {
    console.log(`\x1b[32m✔ PASS:\x1b[0m ${testName}`);
    passed++;
  } else {
    console.error(`\x1b[31m✘ FAIL:\x1b[0m ${testName} ${detail ? `- ${detail}` : ""}`);
    failed++;
  }
}

async function runTests() {
  console.log(`\nStarting Security Test Suite against ${BASE_URL}...\n`);

  let ipCounter = 1;
  const nextIp = () => `10.1.2.${ipCounter++}`;

  // Test 0: Security Headers on Home Page
  try {
    const res = await fetch(`${BASE_URL}/`);
    const headers = res.headers;

    assert(
      headers.get("x-content-type-options") === "nosniff",
      "Header: X-Content-Type-Options: nosniff",
      `Got: ${headers.get("x-content-type-options")}`
    );
    assert(
      headers.get("x-frame-options") === "DENY",
      "Header: X-Frame-Options: DENY",
      `Got: ${headers.get("x-frame-options")}`
    );
    assert(
      headers.get("referrer-policy") === "strict-origin-when-cross-origin",
      "Header: Referrer-Policy: strict-origin-when-cross-origin",
      `Got: ${headers.get("referrer-policy")}`
    );
    assert(
      Boolean(headers.get("permissions-policy")?.includes("camera=()")),
      "Header: Permissions-Policy restricts sensitive APIs",
      `Got: ${headers.get("permissions-policy")}`
    );
    assert(
      Boolean(headers.get("strict-transport-security")?.includes("max-age=31536000")),
      "Header: Strict-Transport-Security enabled",
      `Got: ${headers.get("strict-transport-security")}`
    );
    assert(
      Boolean(headers.get("content-security-policy")?.includes("default-src 'self'")),
      "Header: Content-Security-Policy enabled",
      `Got: ${headers.get("content-security-policy")}`
    );
    assert(
      headers.get("x-powered-by") === null,
      "Header: X-Powered-By is removed",
      `Got: ${headers.get("x-powered-by")}`
    );
  } catch (err) {
    assert(false, "Header verification", err.message);
  }

  // Test 1: GET /api/audit (Reject with 405)
  try {
    const res = await fetch(`${BASE_URL}/api/audit`);
    const json = await res.json().catch(() => null);
    assert(
      res.status === 405 && json?.ok === false && json?.error === "Method not allowed",
      "GET /api/audit returns 405 Method Not Allowed",
      `Status: ${res.status}`
    );
    assert(
      res.headers.get("allow") === "POST",
      "GET /api/audit includes Allow: POST header",
      `Got: ${res.headers.get("allow")}`
    );
  } catch (err) {
    assert(false, "GET /api/audit", err.message);
  }

  // Test 2: Other HTTP Methods (PUT, DELETE, PATCH, OPTIONS -> 405)
  for (const method of ["PUT", "DELETE", "PATCH"]) {
    try {
      const res = await fetch(`${BASE_URL}/api/audit`, { method });
      assert(
        res.status === 405,
        `${method} /api/audit returns 405`,
        `Got status: ${res.status}`
      );
    } catch (err) {
      assert(false, `${method} /api/audit`, err.message);
    }
  }

  // Test 3: Invalid Content-Type
  try {
    const res = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "text/plain", "x-forwarded-for": nextIp() },
      body: JSON.stringify(validPayload),
    });
    const json = await res.json().catch(() => null);
    assert(
      res.status === 400 && json?.ok === false,
      "POST with text/plain rejected with 400",
      `Status: ${res.status}`
    );
  } catch (err) {
    assert(false, "Invalid Content-Type", err.message);
  }

  // Test 4: Empty Body
  try {
    const res = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": nextIp() },
      body: "",
    });
    assert(
      res.status === 400,
      "Empty POST body returns 400",
      `Status: ${res.status}`
    );
  } catch (err) {
    assert(false, "Empty Body", err.message);
  }

  // Test 5: Malformed JSON
  try {
    const res = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": nextIp() },
      body: "{ not a json",
    });
    assert(
      res.status === 400,
      "Malformed JSON returns 400",
      `Status: ${res.status}`
    );
  } catch (err) {
    assert(false, "Malformed JSON", err.message);
  }

  // Test 6: Missing Required Fields
  try {
    const res = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": nextIp() },
      body: JSON.stringify({ name: "Aarav" }),
    });
    assert(
      res.status === 400,
      "Missing required fields returns 400",
      `Status: ${res.status}`
    );
  } catch (err) {
    assert(false, "Missing Required Fields", err.message);
  }

  // Test 7: Invalid Email
  try {
    const res = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": nextIp() },
      body: JSON.stringify({ ...validPayload, email: "invalid-email-address" }),
    });
    assert(
      res.status === 400,
      "Invalid email format rejected with 400",
      `Status: ${res.status}`
    );
  } catch (err) {
    assert(false, "Invalid Email", err.message);
  }

  // Test 8: Very Long Name (> 100 chars)
  try {
    const res = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": nextIp() },
      body: JSON.stringify({ ...validPayload, name: "A".repeat(101) }),
    });
    assert(
      res.status === 400,
      "Name > 100 chars rejected with 400",
      `Status: ${res.status}`
    );
  } catch (err) {
    assert(false, "Very Long Name", err.message);
  }

  // Test 9: Very Long Message (> 3000 chars)
  try {
    const res = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": nextIp() },
      body: JSON.stringify({ ...validPayload, message: "M".repeat(3001) }),
    });
    assert(
      res.status === 400,
      "Message > 3000 chars rejected with 400",
      `Status: ${res.status}`
    );
  } catch (err) {
    assert(false, "Very Long Message", err.message);
  }

  // Test 10: Unexpected Fields Injected (.strict() test)
  try {
    const res = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": nextIp() },
      body: JSON.stringify({ ...validPayload, isAdmin: true, role: "superuser" }),
    });
    assert(
      res.status === 400,
      "Unexpected fields rejected with 400 (strict schema)",
      `Status: ${res.status}`
    );
  } catch (err) {
    assert(false, "Unexpected Fields", err.message);
  }

  // Test 11: Honeypot Populated
  try {
    const res = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": nextIp() },
      body: JSON.stringify({ ...validPayload, _hp: "bot-filled-value" }),
    });
    assert(
      res.status === 400,
      "Populated honeypot rejected with 400",
      `Status: ${res.status}`
    );
  } catch (err) {
    assert(false, "Honeypot Populated", err.message);
  }

  // Test 12: Oversized Payload (> 16KB)
  try {
    const largeMessage = "X".repeat(20 * 1024);
    const res = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": nextIp() },
      body: JSON.stringify({ ...validPayload, message: largeMessage }),
    });
    assert(
      res.status === 413 || res.status === 400,
      "Oversized payload rejected (413 or 400)",
      `Status: ${res.status}`
    );
  } catch (err) {
    assert(false, "Oversized Payload", err.message);
  }

  // Test 13: XSS & HTML in Input Fields
  try {
    const res = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": nextIp() },
      body: JSON.stringify({
        ...validPayload,
        process: "<script>alert('XSS')</script> normal process explanation here",
      }),
    });
    assert(
      res.status === 500 || res.status === 200,
      "XSS payload handled safely without crashing (returns 500 unconfigured or 200 delivered)",
      `Status: ${res.status}`
    );
  } catch (err) {
    assert(false, "XSS Payload", err.message);
  }

  // Test 14: SQL-like Input
  try {
    const res = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": nextIp() },
      body: JSON.stringify({
        ...validPayload,
        businessName: "Sharma' OR '1'='1' --",
      }),
    });
    assert(
      res.status === 500 || res.status === 200,
      "SQL injection strings handled safely without crashing",
      `Status: ${res.status}`
    );
  } catch (err) {
    assert(false, "SQL Input", err.message);
  }

  // Test 15: Cross-Origin / Disallowed Origin Check
  try {
    const res = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": nextIp(),
        Origin: "https://malicious-phishing-site.com",
      },
      body: JSON.stringify(validPayload),
    });
    assert(
      res.status === 403,
      "Untrusted Origin header rejected with 403 Forbidden",
      `Status: ${res.status}`
    );
  } catch (err) {
    assert(false, "Disallowed Origin", err.message);
  }

  // Test 16: Safe Unconfigured Delivery (No Fake Backend Guarantee)
  try {
    const res = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": nextIp() },
      body: JSON.stringify(validPayload),
    });
    const json = await res.json().catch(() => null);
    assert(
      res.status === 500 && json?.ok === false && json?.error === "Unable to process request",
      "Unconfigured delivery does NOT fake success (returns 500 with generic error)",
      `Status: ${res.status}, response: ${JSON.stringify(json)}`
    );
  } catch (err) {
    assert(false, "Unconfigured Delivery", err.message);
  }

  // Test 17: Rate Limiting (5 allowed per window; 6th triggers 429)
  try {
    const testIp = "192.168.100.55";
    let reachedLimit = false;
    let gotRetryAfter = false;

    for (let i = 1; i <= 6; i++) {
      const res = await fetch(`${BASE_URL}/api/audit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": testIp,
        },
        body: JSON.stringify(validPayload),
      });

      if (res.status === 429) {
        reachedLimit = true;
        if (res.headers.get("retry-after")) {
          gotRetryAfter = true;
        }
        break;
      }
    }

    assert(
      reachedLimit && gotRetryAfter,
      "Rate limit triggers 429 with Retry-After header on 6th request",
      `Reached: ${reachedLimit}, Got Retry-After: ${gotRetryAfter}`
    );
  } catch (err) {
    assert(false, "Rate Limiting", err.message);
  }

  console.log(`\n-----------------------------------------`);
  console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
  console.log(`-----------------------------------------\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
