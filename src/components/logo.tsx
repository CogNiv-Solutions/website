import Image from "next/image";

/**
 * Genuine Cogniv bridge lockup (public/brand/cogniv-logo.png).
 * Dark surfaces use a text wordmark until the reversed lockup file is supplied.
 */
export function Logo({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  if (dark) {
    return (
      <span className="inline-flex flex-col leading-none" aria-label="Cogniv Solutions home">
        <span className="text-[19px] font-semibold tracking-tight text-white">Cogniv</span>
        <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.3em] text-white/60">
          Solutions
        </span>
      </span>
    );
  }
  return (
    <Image
      src="/brand/cogniv-logo.png"
      alt="Cogniv Solutions"
      width={2081}
      height={755}
      className={compact ? "h-9 w-auto" : "h-11 w-auto md:h-12"}
      priority
    />
  );
}
