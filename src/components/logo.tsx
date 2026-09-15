import { cn } from "@/lib/utils";

export function Logo({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5" aria-label="Cogniv Solutions home">
      <span
        aria-hidden
        className={cn(
          "grid shrink-0 place-items-center rounded-[10px] font-mono text-[13px] font-bold",
          compact ? "h-8 w-8" : "h-9 w-9",
          dark ? "bg-white text-[#0b0e0d]" : "bg-[#0b0e0d] text-white"
        )}
      >
        C
        <span className="sr-only">.</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("text-[17px] font-semibold tracking-tight", dark ? "text-white" : "text-[#0b0e0d]")}>
          Cogniv
        </span>
        {!compact && (
          <span className={cn("text-[10px] font-medium uppercase tracking-[0.28em]", dark ? "text-white/55" : "text-[#0b0e0d]/55")}>
            Solutions
          </span>
        )}
      </span>
    </span>
  );
}
