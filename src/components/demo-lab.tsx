"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CheckCheck, Loader2, Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { demos } from "@/lib/data";
import { Reveal } from "./reveal";

/** Client-side interactive runner — progressive enhancement over static content. */
export function DemoLab() {
  const reduce = useReducedMotion();
  const [demoId, setDemoId] = useState(demos[0].id);
  const demo = demos.find((d) => d.id === demoId)!;
  const [visible, setVisible] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => clear, []);

  const selectDemo = (id: string) => {
    if (id === demoId) return;
    clear();
    setDemoId(id);
    setVisible(0);
    setRunning(false);
    setDone(false);
  };

  const run = () => {
    clear();
    setRunning(true);
    setDone(false);
    setVisible(0);
    if (reduce) {
      setVisible(demo.steps.length);
      setRunning(false);
      setDone(true);
      return;
    }
    demo.steps.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setVisible(i + 1);
          if (i === demo.steps.length - 1) {
            setRunning(false);
            setDone(true);
          }
        }, 850 * (i + 1))
      );
    });
  };

  return (
    <div>
      <Reveal>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar" role="tablist" aria-label="Demo scenarios">
          {demos.map((d) => (
            <button
              key={d.id}
              role="tab"
              aria-selected={demoId === d.id}
              onClick={() => selectDemo(d.id)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2.5 text-[13.5px] font-medium transition-all",
                demoId === d.id
                  ? "border-[#0b0b0c] bg-[#0b0b0c] text-white"
                  : "border-[#0b0b0c]/15 bg-white text-[#5f6368] hover:border-[#0b0b0c]/35 hover:text-[#0b0b0c]"
              )}
            >
              {d.title}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-4 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.25rem] border border-[#0b0b0c]/10 bg-white p-6 md:p-7">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-[#ff6a00]/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#a84300]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff6a00]" aria-hidden />
            Interactive simulation
          </p>
          <h2 className="mt-4 text-[22px] font-semibold tracking-tight">{demo.title}</h2>
          <p className="mt-1 font-mono text-[12px] text-[#5f6368]">{demo.context}</p>
          <ol className="mt-6 space-y-1" aria-live="polite">
            {demo.steps.map((s, i) => {
              const state = i < visible ? "done" : running && i === visible ? "active" : "idle";
              return (
                <li key={s.label} className="flex items-start gap-3 rounded-xl px-2 py-1.5">
                  <span
                    className={cn(
                      "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full font-mono text-[11px]",
                      state === "done" && "bg-[#ff6a00] text-white",
                      state === "active" && "bg-[#0b0b0c]/10 text-[#0b0b0c]",
                      state === "idle" && "bg-[#0b0b0c]/[0.06] text-[#0b0b0c]/40"
                    )}
                    aria-hidden
                  >
                    {state === "done" ? <CheckCheck className="h-3.5 w-3.5" /> : state === "active" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : i + 1}
                  </span>
                  <span>
                    <span className={cn("block font-mono text-[10.5px] uppercase tracking-[0.16em]", state === "idle" ? "text-[#0b0b0c]/40" : "text-[#a84300]")}>{s.label}</span>
                    <span className={cn("block text-[14px] font-medium", state === "idle" ? "text-[#0b0b0c]/45" : "text-[#0b0b0c]")}>{s.title}</span>
                  </span>
                </li>
              );
            })}
          </ol>
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            {!done ? (
              <button
                onClick={run}
                disabled={running}
                className="btn-press inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0b0b0c] px-6 py-3.5 text-[15px] font-semibold text-white hover:bg-[#1c1c1e] disabled:opacity-70"
              >
                {running ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
                {running ? "Running…" : visible > 0 ? "Continue" : "Run simulation"}
              </button>
            ) : (
              <p className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0b0b0c] px-6 py-3.5 text-[15px] font-semibold text-white" role="status">
                <CheckCheck className="h-4 w-4 text-[#ff8a3d]" aria-hidden /> Simulation complete
              </p>
            )}
            <button
              onClick={() => { clear(); setRunning(false); setDone(false); setVisible(0); }}
              className="btn-press inline-flex items-center justify-center gap-2 rounded-full border border-[#0b0b0c]/15 px-6 py-3.5 text-[14px] font-medium hover:border-[#0b0b0c]/35"
            >
              <RotateCcw className="h-4 w-4" aria-hidden /> Reset
            </button>
          </div>
        </div>

        <div className="min-h-[380px] rounded-[1.25rem] bg-[#0b0b0c] p-5 text-white md:p-7" aria-live="polite">
          {visible === 0 && !running && (
            <div className="grid h-full min-h-[340px] place-items-center text-center">
              <div>
                <p className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                  <Play className="h-5 w-5 text-[#ff8a3d]" aria-hidden />
                </p>
                <p className="mt-4 text-[16px] font-semibold">Press “Run simulation”</p>
                <p className="mx-auto mt-1.5 max-w-[36ch] text-[14px] text-white/55">
                  {demo.trigger} {demo.automation}
                </p>
              </div>
            </div>
          )}
          <AnimatePresence mode="popLayout">
            {demo.steps.slice(0, visible).map((s) => (
              <motion.div
                key={s.label}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                className="mb-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4 last:mb-0 md:p-5"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#ff8a3d]">{s.label}</p>
                <p className="mt-1 text-[15px] font-semibold">{s.title}</p>
                <p className="mt-1 text-[14px] leading-relaxed text-white/65">{s.detail}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
