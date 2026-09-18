import Image from "next/image";

/** Genuine Cogniv bridge lockup — light and reversed versions. */
export function Logo({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  return (
    <Image
      src={dark ? "/logo-dark.png" : "/logo.png"}
      alt="Cogniv Solutions"
      width={780}
      height={162}
      className={compact ? "h-9 w-auto" : "h-11 w-auto md:h-12"}
      priority
    />
  );
}
