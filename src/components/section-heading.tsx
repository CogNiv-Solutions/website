import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/** Small editorial label — orange tick + uppercase tracking. */
export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]",
        dark ? "text-[#ff8a3d]" : "text-[#a84300]"
      )}
    >
      <span className="h-[2px] w-6 bg-[#ff6a00]" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  dark = false,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy?: string;
  dark?: boolean;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "section-tight mt-4 text-3xl font-semibold md:text-[2.9rem]",
          dark ? "text-white" : "text-[#0b0b0c]",
          align === "center" && "text-balance"
        )}
      >
        {title}
      </h2>
      {copy ? (
        <p
          className={cn(
            "mt-4 max-w-[60ch] text-[15.5px] leading-relaxed md:text-[17px]",
            dark ? "text-white/65" : "text-[#5f6368]",
            align === "center" && "mx-auto"
          )}
        >
          {copy}
        </p>
      ) : null}
    </Reveal>
  );
}

/** Thin editorial divider with a small orange bridge tick. */
export function BridgeRule({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)} aria-hidden>
      <span className={cn("h-px flex-1", dark ? "bg-white/12" : "bg-[#0b0b0c]/10")} />
      <svg width="34" height="12" viewBox="0 0 34 12" fill="none" className="shrink-0">
        <path d="M1 11C8 11 10 2 17 2C24 2 26 11 33 11" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" />
        <line x1="9" y1="7.5" x2="9" y2="11" stroke={dark ? "#fff" : "#0B0B0C"} strokeWidth="1.4" opacity="0.5" />
        <line x1="17" y1="5.5" x2="17" y2="11" stroke={dark ? "#fff" : "#0B0B0C"} strokeWidth="1.4" opacity="0.5" />
        <line x1="25" y1="7.5" x2="25" y2="11" stroke={dark ? "#fff" : "#0B0B0C"} strokeWidth="1.4" opacity="0.5" />
      </svg>
      <span className={cn("h-px flex-1", dark ? "bg-white/12" : "bg-[#0b0b0c]/10")} />
    </div>
  );
}
