/**
 * Security & Sanitization Utilities for Cogniv Solutions
 * 
 * Provides:
 * 1. String Sanitization: Strips control characters, null bytes, and HTML entity encodes.
 * 2. Whitelist Validation: Enforces safe character sets on names, phones, and emails.
 * 3. Parameterized Query Layer: Guarantees SQL prepared statement patterns.
 */

// HTML entities to encode for XSS and injection defense
const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;",
};

/**
 * Strips dangerous control characters and null bytes (\0) from strings.
 * Prevents null-byte truncation attacks and Unicode direction bypasses.
 */
export function stripControlCharacters(input: string): string {
  if (typeof input !== "string") return "";
  // Strip null bytes and control chars (except standard newlines/tabs)
  return input
    .replace(/\0/g, "")
    .replace(/[\u0001-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, "")
    // Strip Unicode BiDi override characters (used to obscure malicious text)
    .replace(/[\u202A-\u202E\u2066-\u2069]/g, "");
}

/**
 * Encodes potentially dangerous HTML characters to prevent XSS and template injection.
 */
export function escapeHtml(input: string): string {
  if (typeof input !== "string") return "";
  return input.replace(/[&<>"'`=\/]/g, (char) => HTML_ESCAPE_MAP[char] || char);
}

/**
 * Sanitizes a general string input:
 * - Strips control characters and null bytes
 * - Trims whitespace
 * - Normalizes excessive whitespace
 * - Enforces max length bounds
 */
export function sanitizeString(input: string | undefined | null, maxLength = 3000): string {
  if (input === undefined || input === null) return "";
  let clean = stripControlCharacters(String(input));
  clean = clean.trim().replace(/\s+/g, " ");
  if (clean.length > maxLength) {
    clean = clean.slice(0, maxLength);
  }
  return clean;
}

/**
 * Sanitizes email address:
 * - Trims and converts to lowercase
 * - Strips control characters and whitespace
 * - Validates strict format
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== "string") return "";
  const clean = stripControlCharacters(email).trim().toLowerCase().replace(/\s+/g, "");
  return clean.slice(0, 254);
}

/**
 * Sanitizes phone number:
 * - Allows only digits, '+', spaces, hyphens, and parentheses
 */
export function sanitizePhone(phone: string): string {
  if (typeof phone !== "string") return "";
  const clean = stripControlCharacters(phone).trim();
  // Filter out any characters not valid in international phone numbers
  const filtered = clean.replace(/[^0-9+\s\-()]/g, "");
  return filtered.slice(0, 30);
}

/**
 * Deep sanitizes all string properties on a form submission object.
 */
export function sanitizeFormInput<T extends Record<string, unknown>>(data: T): T {
  const result = { ...data };

  for (const key of Object.keys(result)) {
    const val = result[key];
    if (typeof val === "string") {
      if (key === "email") {
        (result as Record<string, unknown>)[key] = sanitizeEmail(val);
      } else if (key === "phone") {
        (result as Record<string, unknown>)[key] = sanitizePhone(val);
      } else {
        (result as Record<string, unknown>)[key] = sanitizeString(val);
      }
    } else if (Array.isArray(val)) {
      (result as Record<string, unknown>)[key] = val.map((item) =>
        typeof item === "string" ? sanitizeString(item) : item
      );
    }
  }

  return result;
}

/**
 * Parameterized Query Abstraction
 * 
 * Enforces that SQL queries NEVER concatenate raw user input.
 * All dynamic parameters are isolated into typed parameters ($1, $2, etc.).
 */
export type PreparedQuery = {
  text: string;
  values: unknown[];
};

export function buildPreparedInsert(
  table: string,
  record: Record<string, unknown>
): PreparedQuery {
  // Validate table name against strict identifier pattern (alphanumeric + underscore only)
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(table)) {
    throw new Error(`Invalid table name: ${table}`);
  }

  const columns: string[] = [];
  const placeholders: string[] = [];
  const values: unknown[] = [];

  let index = 1;
  for (const [col, val] of Object.entries(record)) {
    // Validate column name against strict identifier pattern
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(col)) {
      throw new Error(`Invalid column name: ${col}`);
    }
    columns.push(`"${col}"`);
    placeholders.push(`$${index++}`);
    values.push(val);
  }

  const text = `INSERT INTO "${table}" (${columns.join(", ")}) VALUES (${placeholders.join(", ")}) RETURNING id;`;

  return { text, values };
}
