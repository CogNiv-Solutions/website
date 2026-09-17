/**
 * Bot Protection & Anti-Abuse Layer for Cogniv Solutions
 * 
 * 1. Honeypot Validation (b_website & legacy _hp)
 * 2. Time-Analysis Submission Validation (rejects instant < 2s submissions)
 * 3. Cloudflare Turnstile & Google reCAPTCHA v3 Verification
 */

export type BotCheckResult = {
  isBot: boolean;
  reason?: string;
};

/**
 * Validates honeypot fields.
 * If a bot fills b_website (or legacy _hp), submission is flagged.
 */
export function checkHoneypot(data: { b_website?: string; _hp?: string }): BotCheckResult {
  if (data.b_website && data.b_website.trim().length > 0) {
    return { isBot: true, reason: "Honeypot field filled" };
  }
  if (data._hp && data._hp.trim().length > 0) {
    return { isBot: true, reason: "Honeypot field filled" };
  }
  return { isBot: false };
}

/**
 * Time-Analysis Validation:
 * Humans require at least 2-3 seconds to read and fill out a contact form.
 * Instant submissions (< 2000 ms) are almost universally automated bots.
 * Also checks for stale tokens (> 2 hours) or future timestamps (spoofing).
 *
 * @param formLoadedAt Timestamp in milliseconds when the form was presented to user
 * @param minDurationMs Minimum required time in ms (default: 2000 ms = 2 seconds)
 * @param maxAgeMs Maximum allowed form age in ms (default: 2 hours = 7,200,000 ms)
 */
export function checkSubmissionTime(
  formLoadedAt: number | undefined | null,
  minDurationMs = 2000,
  maxAgeMs = 2 * 60 * 60 * 1000
): BotCheckResult {
  // If timestamp is not provided, allow if not in strict mode, or flag
  if (!formLoadedAt || typeof formLoadedAt !== "number" || isNaN(formLoadedAt)) {
    return { isBot: true, reason: "Missing or invalid form timestamp" };
  }

  const now = Date.now();
  const elapsed = now - formLoadedAt;

  // 1. Instant submission check: Human cannot fill form in under 2 seconds
  if (elapsed < minDurationMs) {
    return {
      isBot: true,
      reason: `Form submitted in ${elapsed}ms (minimum required: ${minDurationMs}ms)`,
    };
  }

  // 2. Future timestamp check: Clock manipulation or bot spoofing
  if (formLoadedAt > now + 5000) {
    return { isBot: true, reason: "Form timestamp is in the future" };
  }

  // 3. Stale form session check: Expired after 2 hours
  if (elapsed > maxAgeMs) {
    return { isBot: true, reason: "Form session has expired. Please refresh the page." };
  }

  return { isBot: false };
}

/**
 * Verifies Cloudflare Turnstile token if TURNSTILE_SECRET_KEY is configured.
 */
export async function verifyTurnstileToken(
  token: string | undefined | null,
  remoteIp?: string
): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    // Turnstile not configured on server; skip check
    return { success: true };
  }

  if (!token || typeof token !== "string") {
    return { success: false, error: "Missing Turnstile verification token" };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const outcome = (await res.json()) as { success?: boolean; "error-codes"?: string[] };

    if (outcome.success) {
      return { success: true };
    }

    return {
      success: false,
      error: outcome["error-codes"]?.join(", ") || "Turnstile verification failed",
    };
  } catch (err) {
    console.error("[BotProtection] Turnstile verify network error:", err);
    // On unexpected network error, do not lock out user unless strict mode is set
    return { success: false, error: "Turnstile verification network error" };
  }
}

/**
 * Verifies Google reCAPTCHA v3 token if RECAPTCHA_SECRET_KEY is configured.
 */
export async function verifyRecaptchaToken(
  token: string | undefined | null,
  remoteIp?: string
): Promise<{ success: boolean; score?: number; error?: string }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    // reCAPTCHA not configured on server; skip check
    return { success: true };
  }

  if (!token || typeof token !== "string") {
    return { success: false, error: "Missing reCAPTCHA verification token" };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const outcome = (await res.json()) as {
      success?: boolean;
      score?: number;
      action?: string;
      "error-codes"?: string[];
    };

    if (outcome.success && typeof outcome.score === "number" && outcome.score >= 0.5) {
      return { success: true, score: outcome.score };
    }

    return {
      success: false,
      score: outcome.score,
      error: outcome["error-codes"]?.join(", ") || "reCAPTCHA score too low",
    };
  } catch (err) {
    console.error("[BotProtection] reCAPTCHA verify network error:", err);
    return { success: false, error: "reCAPTCHA verification network error" };
  }
}
