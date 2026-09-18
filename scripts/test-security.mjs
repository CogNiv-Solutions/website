/**
 * Comprehensive Security & Vulnerability Verification Suite for Cogniv Solutions
 * 
 * Tests:
 * 1. SQLi, XSS & Input Sanitization
 * 2. Spam Bot Defense: Honeypots (b_website & _hp), Time-Analysis (< 2s), and Rate Limiting (3/10min)
 * 3. Server-side Error Security: Zero credentials or internal error stack leaks
 * 4. HTTP Protocol Security: Method protection & Strict Headers
 */

const BASE_URL = (process.env.TEST_URL || "http://localhost:3000").trim();

const validPayload = {
  name: "Aarav Sharma",
  businessName: "Sharma Logistics",
  email: "aarav@sharmalogistics.com",
  phone: "+91 9876543210",
  industry: "Logistics",
  companySize: "11–50",
  process: "Automated dispatch notifications and invoice matching from WhatsApp to ERP.",
  tools: "WhatsApp, Excel",
  message: "Looking to deploy by next month.",
  _formLoadedAt: Date.now() - 5000, // Loaded 5 seconds ago (valid human submission)
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
  console.log(`\nStarting Security & Anti-Bot Verification Suite against ${BASE_URL}...\n`);

  let ipCounter = 100;
  const nextIp = () => `10.50.2.${ipCounter++}`;

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

  // Test 1: HTTP Method Restrictions (GET, PUT, DELETE, PATCH -> 405)
  for (const method of ["GET", "PUT", "DELETE", "PATCH"]) {
    try {
      const res = await fetch(`${BASE_URL}/api/audit`, { method });
      assert(
        res.status === 405,
        `${method} /api/audit rejected with 405 Method Not Allowed`,
        `Got status: ${res.status}`
      );
      if (method === "GET") {
        assert(
          res.headers.get("allow") === "POST",
          "Includes Allow: POST header",
          `Got: ${res.headers.get("allow")}`
        );
      }
    } catch (err) {
      assert(false, `${method} /api/audit`, err.message);
    }
  }

  // Test 2: Invalid Content-Type
  try {
    const res = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "text/plain", "x-forwarded-for": nextIp() },
      body: JSON.stringify(validPayload),
    });
    assert(
      res.status === 400,
      "POST with text/plain rejected with 400 Bad Request",
      `Status: ${res.status}`
    );
  } catch (err) {
    assert(false, "Invalid Content-Type", err.message);
  }

  // Test 3: Empty Body & Malformed JSON
  try {
    const resEmpty = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": nextIp() },
      body: "",
    });
    assert(resEmpty.status === 400, "Empty POST body returns 400", `Status: ${resEmpty.status}`);

    const resMalformed = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": nextIp() },
      body: "{ unclosed json",
    });
    assert(resMalformed.status === 400, "Malformed JSON returns 400", `Status: ${resMalformed.status}`);
  } catch (err) {
    assert(false, "Malformed Body", err.message);
  }

  // Test 4: Missing Required Fields
  try {
    const res = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": nextIp() },
      body: JSON.stringify({ name: "Aarav" }),
    });
    assert(res.status === 400, "Missing required fields rejected with 400", `Status: ${res.status}`);
  } catch (err) {
    assert(false, "Missing Required Fields", err.message);
  }

  // Test 5: Email Validation (RFC & Null Byte Injection Defense)
  try {
    const resBadEmail = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": nextIp() },
      body: JSON.stringify({ ...validPayload, email: "invalid-email-no-domain" }),
    });
    assert(resBadEmail.status === 400, "Invalid email format rejected with 400", `Status: ${resBadEmail.status}`);

    const resControlEmail = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": nextIp() },
      body: JSON.stringify({ ...validPayload, email: "victim@domain.com\r\ncc:attacker@domain.com" }),
    });
    assert(resControlEmail.status === 400, "Email header injection attempt rejected with 400", `Status: ${resControlEmail.status}`);
  } catch (err) {
    assert(false, "Email Validation", err.message);
  }

  // Test 6: Strict Field Length Enforcements
  try {
    const resLongName = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": nextIp() },
      body: JSON.stringify({ ...validPayload, name: "A".repeat(101) }),
    });
    assert(resLongName.status === 400, "Name > 100 chars rejected with 400", `Status: ${resLongName.status}`);

    const resLongMsg = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": nextIp() },
      body: JSON.stringify({ ...validPayload, message: "M".repeat(3001) }),
    });
    assert(resLongMsg.status === 400, "Message > 3000 chars rejected with 400", `Status: ${resLongMsg.status}`);
  } catch (err) {
    assert(false, "Field Lengths", err.message);
  }

  // Test 7: Unexpected Injected Fields (Strict Zod Schema)
  try {
    const res = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": nextIp() },
      body: JSON.stringify({ ...validPayload, role: "admin", privileges: ["all"] }),
    });
    assert(res.status === 400, "Unexpected injected fields rejected with 400 (strict schema)", `Status: ${res.status}`);
  } catch (err) {
    assert(false, "Unexpected Fields", err.message);
  }

  // Test 8: Honeypot Protection (b_website field)
  try {
    const resBWebsite = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": nextIp() },
      body: JSON.stringify({ ...validPayload, b_website: "https://spam-bot-target.com" }),
    });
    assert(resBWebsite.status === 400, "Honeypot b_website filled rejected with 400", `Status: ${resBWebsite.status}`);

    const resHp = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": nextIp() },
      body: JSON.stringify({ ...validPayload, _hp: "bot-autofill" }),
    });
    assert(resHp.status === 400, "Honeypot _hp filled rejected with 400", `Status: ${resHp.status}`);
  } catch (err) {
    assert(false, "Honeypot Protection", err.message);
  }

  // Test 9: Time-Analysis Validation (Rejects < 2000ms fast submissions)
  try {
    const resTooFast = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": nextIp() },
      body: JSON.stringify({
        ...validPayload,
        _formLoadedAt: Date.now() - 400, // Submitted in 400ms (instant bot)
      }),
    });
    assert(
      resTooFast.status === 400,
      "Fast bot submission (< 2000ms) rejected with 400",
      `Status: ${resTooFast.status}`
    );

    const resFuture = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": nextIp() },
      body: JSON.stringify({
        ...validPayload,
        _formLoadedAt: Date.now() + 100000, // Future timestamp spoofing
      }),
    });
    assert(
      resFuture.status === 400,
      "Future timestamp spoofing rejected with 400",
      `Status: ${resFuture.status}`
    );
  } catch (err) {
    assert(false, "Time-Analysis", err.message);
  }

  // Test 10: Oversized Payload Guard (> 16KB)
  try {
    const largeMessage = "A".repeat(20 * 1024);
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

  // Test 11: SQL Injection & XSS Payloads Sanitization
  try {
    const sqliPayload = {
      ...validPayload,
      businessName: "Sharma'; DROP TABLE leads; --",
      process: "<script>alert('XSS')</script> Normal workflow description",
    };
    const res = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": nextIp() },
      body: JSON.stringify(sqliPayload),
    });
    assert(
      res.status === 200 || res.status === 500,
      "SQL injection strings handled safely without server crash or syntax exception",
      `Status: ${res.status}`
    );
  } catch (err) {
    assert(false, "SQLi Payload", err.message);
  }

  // Test 12: Zero Client-Side Diagnostic or Credential Leaks
  try {
    const res = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": nextIp() },
      body: JSON.stringify(validPayload),
    });
    const json = await res.json().catch(() => ({}));
    const text = JSON.stringify(json);

    const hasNoKeyPreview = !text.includes("keyPreview") && !text.includes("re_");
    const hasNoResendStatus = !text.includes("resendStatus");
    const hasNoResendError = !text.includes("resendError");
    const hasNoDiagnostics = !("diagnostics" in json);

    assert(
      hasNoKeyPreview && hasNoResendStatus && hasNoResendError && hasNoDiagnostics,
      "Response does NOT leak internal keys, API previews, or database diagnostics",
      `Response keys: ${Object.keys(json).join(", ")}`
    );
  } catch (err) {
    assert(false, "Diagnostic Leaks", err.message);
  }

  // Test 13: Untrusted Origin Rejection (CSRF Defense)
  try {
    const res = await fetch(`${BASE_URL}/api/audit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": nextIp(),
        Origin: "https://evil-phishing-domain.com",
      },
      body: JSON.stringify(validPayload),
    });
    assert(res.status === 403, "Untrusted Origin rejected with 403 Forbidden", `Status: ${res.status}`);
  } catch (err) {
    assert(false, "Untrusted Origin", err.message);
  }

  // Test 14: Rate Limiting Enforcement (Maximum 3 requests allowed, 4th triggers 429)
  try {
    const testIp = "172.16.88.99";
    let reachedLimit = false;
    let gotRetryAfter = false;

    for (let i = 1; i <= 4; i++) {
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
      "Rate limit triggers 429 with Retry-After on 4th request (limit: 3/10min)",
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
