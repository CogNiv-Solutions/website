import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn, SITE, getWhatsAppUrl } from "@/lib/utils";

type CtaVariant = "primary" | "secondary" | "on-dark" | "ghost-dark";

const styles: Record<CtaVariant, string> = {
  primary:
    "bg-[#0b0b0c] text-white hover:bg-[#1c1c1e]",
  secondary:
    "border border-[#0b0b0c]/20 bg-white text-[#0b0b0c] hover:border-[#0b0b0c]/45",
  "on-dark":
    "bg-white text-[#0b0b0c] hover:bg-[#fff1e6]",
  "ghost-dark":
    "border border-white/20 text-white hover:border-white/50",
};

export function CtaButton({
  href,
  children,
  variant = "primary",
  external = false,
  className,
  label,
}: {
  href: string;
  children: React.ReactNode;
  variant?: CtaVariant;
  external?: boolean;
  className?: string;
  label?: string;
}) {
  const cls = cn(
    "btn-press group inline-flex items-center justify-center gap-2 rounded-full py-2.5 pl-6 pr-2.5 text-[15px] font-medium",
    styles[variant],
    className
  );
  const arrow = (
    <span
      className={cn(
        "grid h-9 w-9 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-1",
        variant === "primary" && "bg-[#ff6a00] text-white",
        variant === "secondary" && "bg-[#0b0b0c]/[0.06] text-[#0b0b0c]",
        variant === "on-dark" && "bg-[#0b0b0c] text-white",
        variant === "ghost-dark" && "bg-white/10 text-white"
      )}
      aria-hidden
    >
      <ArrowRight className="h-4 w-4" />
    </span>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} aria-label={label}>
        {children}
        {arrow}
      </a>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a href={href} className={cls} aria-label={label}>
        {children}
        {arrow}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={label}>
      {children}
      {arrow}
    </Link>
  );
}

export function AuditCta({ variant = "primary", className }: { variant?: CtaVariant; className?: string }) {
  return (
    <CtaButton href="#contact" variant={variant} className={className}>
      Book a Free Workflow Audit
    </CtaButton>
  );
}

export function DemosCta({ variant = "secondary", className }: { variant?: CtaVariant; className?: string }) {
  return (
    <CtaButton href="/demos" variant={variant} className={className}>
      See Live Demos
    </CtaButton>
  );
}

export function WhatsAppCta({ variant = "ghost-dark", className }: { variant?: CtaVariant; className?: string }) {
  return (
    <CtaButton href={getWhatsAppUrl("Hi Cogniv, I'd like to talk about automating work in my business.")} variant={variant} external className={className}>
      Chat on WhatsApp
    </CtaButton>
  );
}
export { SITE };
