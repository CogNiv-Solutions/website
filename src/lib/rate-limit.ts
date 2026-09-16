/**
 * Rate Limiter for Next.js API routes.
 *
 * Architecture:
 * 1. Distributed Upstash Redis store if UPSTASH_REDIS_REST_URL & UPSTASH_REDIS_REST_TOKEN are set.
 * 2. In-memory sliding window fallback with active TTL cleanup and max-entry LRU bounds.
 *
 * Serverless note:
 * In-memory state is local to an isolated serverless function instance. On serverless platforms
 * (like Vercel), instances can spin up or down. For globally synchronized multi-instance rate limiting,
 * configure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in environment variables.
 */

type RateLimitRecord = {
  timestamps: number[];
  lastSeen: number;
};

// Maximum number of distinct IPs tracked in memory to prevent memory exhaustion.
const MAX_TRACKED_IPS = 5000;
const memoryStore = new Map<string, RateLimitRecord>();

/**
 * Periodically purge stale IPs older than the window.
 */
function cleanupMemoryStore(now: number, windowMs: number) {
  if (memoryStore.size > MAX_TRACKED_IPS) {
    memoryStore.clear();
    return;
  }

  for (const [ip, record] of memoryStore.entries()) {
    if (now - record.lastSeen > windowMs) {
      memoryStore.delete(ip);
    }
  }
}

export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
};

/**
 * Check if a request from the given identifier exceeds the rate limit.
 *
 * @param identifier Client IP address or key
 * @param limit Maximum allowed requests within the window (default: 5)
 * @param windowMs Time window in milliseconds (default: 10 minutes = 600,000 ms)
 */
export async function checkRateLimit(
  identifier: string,
  limit = 5,
  windowMs = 10 * 60 * 1000
): Promise<RateLimitResult> {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  // Optional: External distributed Redis (Upstash)
  if (upstashUrl && upstashToken) {
    try {
      const key = `rate_limit:audit:${identifier}`;
      const res = await fetch(`${upstashUrl}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", key],
          ["PTTL", key],
        ]),
        cache: "no-store",
      });

      if (res.ok) {
        const data = (await res.json()) as [
          { result: number },
          { result: number }
        ];
        const count = data[0]?.result ?? 1;
        let ttlMs = data[1]?.result ?? -1;

        if (ttlMs < 0) {
          // Set expiry on first request
          await fetch(`${upstashUrl}/pexpire/${key}/${windowMs}`, {
            headers: { Authorization: `Bearer ${upstashToken}` },
            cache: "no-store",
          });
          ttlMs = windowMs;
        }

        const resetSeconds = Math.max(1, Math.ceil(ttlMs / 1000));
        return {
          success: count <= limit,
          limit,
          remaining: Math.max(0, limit - count),
          resetSeconds,
        };
      }
    } catch {
      // Fallback to memory store if external provider is unreachable
    }
  }

  // In-Memory Sliding Window Fallback
  const now = Date.now();
  cleanupMemoryStore(now, windowMs);

  const record = memoryStore.get(identifier) ?? { timestamps: [], lastSeen: now };
  record.lastSeen = now;

  // Filter timestamps within current window
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= limit) {
    const oldest = record.timestamps[0];
    const resetMs = windowMs - (now - oldest);
    const resetSeconds = Math.max(1, Math.ceil(resetMs / 1000));

    return {
      success: false,
      limit,
      remaining: 0,
      resetSeconds,
    };
  }

  record.timestamps.push(now);
  memoryStore.set(identifier, record);

  const resetSeconds = Math.ceil(windowMs / 1000);
  return {
    success: true,
    limit,
    remaining: limit - record.timestamps.length,
    resetSeconds,
  };
}

/**
 * Extract client IP securely from incoming request headers.
 */
export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const ips = forwardedFor.split(",").map((ip) => ip.trim());
    if (ips[0]) return ips[0];
  }

  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const cfConnectingIp = headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();

  return "127.0.0.1";
}
