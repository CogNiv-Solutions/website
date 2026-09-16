import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]",
        dark ? "border-white/15 bg-white/5 text-blue-200" : "border-[#0b0e0d]/10 bg-white text-[#2563eb]"
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", dark ? "bg-blue-300 animate-pulse-dot" : "bg-[#2563eb] animate-pulse-dot")} aria-hidden />
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
          "mt-5 text-3xl font-semibold leading-[1.08] tracking-tight md:text-5xl",
          dark ? "text-white" : "text-[#0b0e0d]"
        )}
      >
        {title}
      </h2>
      {copy ? (
        <p className={cn("mt-4 max-w-[62ch] text-base leading-relaxed md:text-lg", dark ? "text-white/65" : "text-[#0b0e0d]/65")}>
          {copy}
        </p>
      ) : null}
    </Reveal>
  );
}
