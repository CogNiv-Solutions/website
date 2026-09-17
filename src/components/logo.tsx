import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  dark = false,
  compact = false,
  className,
}: {
  dark?: boolean;
  compact?: boolean;
  className?: string;
}) {
  if (compact) {
    return (
      <span className={cn("inline-flex items-center", className)} aria-label="Cogniv Solutions home">
        <Image
          src={dark ? "/logo-mark-dark.png" : "/logo-mark.png"}
          alt="Cogniv Solutions"
          width={64}
          height={24}
          style={{ width: "auto" }}
          className="h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          priority
        />
        <span className="sr-only">Cogniv Solutions</span>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center", className)} aria-label="Cogniv Solutions home">
      <Image
        src={dark ? "/logo-dark.png" : "/logo.png"}
        alt="Cogniv Solutions"
        width={160}
        height={34}
        style={{ width: "auto" }}
        className="h-8 md:h-[34px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
        priority
      />
      <span className="sr-only">Cogniv Solutions</span>
    </span>
  );
}

