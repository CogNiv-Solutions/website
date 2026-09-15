"use client";

import { Lottie } from "lottie-react";
import { useReducedMotion } from "motion/react";
import successData from "@/animations/success.json";
import pulseData from "@/animations/pulse.json";
import { cn } from "@/lib/utils";

const animations = { success: successData, pulse: pulseData } as const;

export type LottieName = keyof typeof animations;

/**
 * Template-grade motion, rendered locally.
 * Drop any Jitter-exported Lottie JSON into `src/animations/`,
 * add it to the map above, and use `<LottieAnimation name="..." />`.
 * Decorative only — content around it always carries the meaning,
 * and nothing renders under `prefers-reduced-motion`.
 */
export default function LottieAnimation({
  name,
  loop = false,
  className,
}: {
  name: LottieName;
  loop?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <Lottie
      src={animations[name]}
      loop={loop}
      autoplay
      aria-hidden
      className={cn("pointer-events-none", className)}
    />
  );
}
