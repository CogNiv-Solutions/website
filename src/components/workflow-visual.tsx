"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MessageCircle, Table2, BellRing, Keyboard, TriangleAlert, Sparkles, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Node = { icon?: LucideIcon; label: string; sub: string };

const manual: Node[] = [
  { icon: MessageCircle, label: "WhatsApp messages", sub: "answered one-by-one" },
  { icon: Table2, label: "Excel sheets", sub: "copied between files" },
  { icon: BellRing, label: "Follow-ups", sub: "depend on memory" },
  { icon: Keyboard, label: "Data entry", sub: "typed twice" },
  { icon: TriangleAlert, label: "Missed leads", sub: "no trail" },
];

const automated: Node[] = [
  { label: "AI triage", sub: "understands intent" },
  { label: "Workflow", sub: "routes work" },
  { label: "CRM", sub: "single record" },
  { label: "Notify", sub: "right person, on time" },
  { label: "Report", sub: "live numbers" },
];

export function WorkflowVisual() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setStep((s) => (s + 1) % (manual.length + 2)), 1600);
    return () => clearInterval(t);
  }, [reduce]);

  const transformed = step >= manual.length;

  return (
    <div
      className="relative overflow-hidden rounded-[1.75rem] border border-[#0b0e0d]/10 bg-white p-5 card-shadow md:p-6"
      role="img"
      aria-label="Diagram showing manual business work transforming into an automated system"
    >
      <div className="texture-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0b0e0d]/50">
            {transformed ? "Automated system" : "Manual work today"}
          </p>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px]",
              transformed ? "bg-[#eff6ff] text-[#1d4ed8]" : "bg-[#0b0e0d]/5 text-[#0b0e0d]/60"
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", transformed ? "bg-[#2563eb] animate-pulse-dot" : "bg-[#b45309] animate-pulse-dot")} />
            {transformed ? "live" : "fragile"}
          </span>
        </div>

        <div className="mt-4 space-y-2">
          {(transformed ? automated : manual).map((n, i) => {
            const Icon = n.icon ?? Sparkles;
            const isActive = !reduce && i === step % manual.length;
            return (
              <motion.div
                key={n.label}
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border px-3.5 py-3 transition-colors duration-500",
                  transformed
                    ? "border-[#2563eb]/20 bg-[#f0f7ff]"
                    : isActive
                      ? "border-[#b45309]/30 bg-[#fff8ed]"
                      : "border-[#0b0e0d]/8 bg-[#fafaf9]"
                )}
              >
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-xl",
                    transformed ? "bg-[#2563eb] text-white" : "bg-[#0b0e0d] text-white"
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-semibold text-[#0b0e0d]">{n.label}</span>
                  <span className="block truncate text-[12.5px] text-[#0b0e0d]/55">{n.sub}</span>
                </span>
                {isActive && !transformed && (
                  <motion.span
                    layoutId="worry"
                    className="ml-auto shrink-0 rounded-full bg-[#b45309]/10 px-2 py-0.5 font-mono text-[10.5px] text-[#b45309]"
                  >
                    manual
                  </motion.span>
                )}
                {transformed && (
                  <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563eb] animate-pulse-dot" aria-hidden />
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#0b0e0d] px-4 py-3.5 text-white">
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">Cogniv transform</p>
            <p className="truncate text-[14px] font-medium">
              {transformed ? "Same work. No manual chasing." : "Every step needs a person."}
            </p>
          </div>
          <div className="flex gap-1" aria-hidden>
            {Array.from({ length: manual.length + 2 }).map((_, i) => (
              <span key={i} className={cn("h-1.5 rounded-full transition-all duration-500", i <= step ? "w-5 bg-blue-400" : "w-1.5 bg-white/20")} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
