import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5" aria-label="Cogniv Solutions home">
      <span
        aria-hidden
        className={cn(
          "relative grid shrink-0 place-items-center transition-transform duration-300 group-hover:scale-105",
          compact ? "h-8 w-8" : "h-9 w-9"
        )}
      >
        <Image
          src={dark ? "/logo-dark.png" : "/logo.png"}
          alt="Cogniv Solutions"
          width={compact ? 32 : 36}
          height={compact ? 32 : 36}
          className="h-full w-full object-contain"
          style={{ width: "auto", height: "auto" }}
          priority
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("text-[17.5px] font-semibold tracking-tight", dark ? "text-white" : "text-[#0b0e0d]")}>
          Cogniv
        </span>
        {!compact && (
          <span className={cn("text-[10px] font-medium uppercase tracking-[0.28em]", dark ? "text-white/60" : "text-[#0b0e0d]/60")}>
            Solutions
          </span>
        )}
      </span>
    </span>
  );
}

