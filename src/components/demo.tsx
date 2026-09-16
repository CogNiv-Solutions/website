"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { Loader2, Play, RotateCcw, CheckCheck, MessageSquareText } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

const LottieAnimation = dynamic(() => import("./lottie-animation"), { ssr: false });

type Stage = {
  id: string;
  label: string;
  title: string;
  body: React.ReactNode;
};

const stages: Stage[] = [
  {
    id: "incoming",
    label: "Incoming message",
    title: "WhatsApp enquiry arrives",
    body: (
      <div className="rounded-2xl bg-[#0b0e0d]/[0.04] p-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0b0e0d]/45">Customer · 10:42 AM</p>
        <p className="mt-2 rounded-2xl rounded-tl-md bg-white px-4 py-3 text-[15px] leading-relaxed text-[#0b0e0d] card-shadow">
          “2 BHK chahiye, budget 60 lakh ke around, Baner ya Wakad.”
        </p>
      </div>
    ),
  },
  {
    id: "understanding",
    label: "AI understanding",
    title: "Intent + language understood",
    body: (
      <dl className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {[
          ["Property type", "2 BHK"],
          ["Budget", "₹60 L"],
          ["Areas", "Baner, Wakad"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-[#2563eb]/20 bg-[#f0f7ff] px-4 py-3">
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#1d4ed8]/60">{k}</dt>
            <dd className="mt-1 text-[15px] font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
    ),
  },
  {
    id: "lead",
    label: "Lead created",
    title: "Structured record, no typing",
    body: (
      <div className="flex flex-wrap items-center gap-2">
        {[
          ["Status", "Qualified"],
          ["Priority", "High"],
          ["Source", "WhatsApp"],
          ["Language", "Hinglish"],
        ].map(([k, v]) => (
          <span key={k} className="inline-flex items-center gap-2 rounded-full border border-[#0b0e0d]/10 bg-white px-3.5 py-2 text-[13.5px]">
            <span className="text-[#0b0e0d]/50">{k}:</span> <strong className="font-semibold">{v}</strong>
          </span>
        ))}
      </div>
    ),
  },
  {
    id: "match",
    label: "Matching",
    title: "3 relevant options shortlisted",
    body: (
      <ul className="space-y-2">
        {[
          ["Sunrise Heights · Baner", "2 BHK · ₹58 L · Ready to move"],
          ["Green Acres · Wakad", "2 BHK · ₹61 L · Site visit slots open"],
          ["Lakeview Residency · Baner", "2 BHK · ₹63 L · Negotiable"],
        ].map(([t, s]) => (
          <li key={t} className="flex items-center justify-between gap-3 rounded-2xl border border-[#0b0e0d]/10 bg-white px-4 py-3">
            <span>
              <span className="block text-[14px] font-semibold">{t}</span>
              <span className="block text-[12.5px] text-[#0b0e0d]/55">{s}</span>
            </span>
            <span className="shrink-0 rounded-full bg-[#eff6ff] px-2.5 py-1 font-mono text-[11px] font-medium text-[#1d4ed8]">match</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "action",
    label: "Action taken",
    title: "Follow-up scheduled + owner notified",
    body: (
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl bg-[#0b0e0d] p-4 text-white">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">Auto follow-up</p>
          <p className="mt-1.5 text-[14.5px] font-medium">Options sent on WhatsApp · reminder in 24 hrs if no reply</p>
        </div>
        <div className="rounded-2xl border border-[#0b0e0d]/10 bg-white p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0b0e0d]/45">Dashboard updated</p>
          <p className="mt-1.5 text-[14.5px] text-[#0b0e0d]/75">Lead #1042 · assigned · response time <strong>38 seconds</strong></p>
        </div>
      </div>
    ),
  },
];

export function Demo() {
  const reduce = useReducedMotion();
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(0);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => clear, []);

  const run = () => {
    clear();
    setRunning(true);
    setDone(false);
    setVisible(0);
    if (reduce) {
      setVisible(stages.length);
      setRunning(false);
      setDone(true);
      return;
    }
    stages.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setVisible(i + 1);
          if (i === stages.length - 1) {
            setRunning(false);
            setDone(true);
          }
        }, 900 * (i + 1))
      );
    });
  };

  const reset = () => {
    clear();
    setRunning(false);
    setDone(false);
    setVisible(0);
  };

  return (
    <section id="demo" aria-labelledby="demo-h" className="scroll-mt-20 border-t border-[#0b0e0d]/8 bg-[#0b0e0d] text-white">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionHeading
          dark
          eyebrow="Proof & Demonstration"
          title={<span id="demo-h">See the work getting done.</span>}
          copy="Watch a live simulation of real workflow automation: from an incoming WhatsApp customer enquiry to structured lead creation, CRM update, and scheduled follow-up."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 card-shadow-dark md:p-7">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-400/15">
                  <MessageSquareText className="h-5 w-5 text-blue-300" aria-hidden />
                </span>
                <div>
                  <p className="text-[15px] font-semibold">AI Lead Automation</p>
                  <p className="font-mono text-[12px] text-white/50">sample scenario · real estate enquiry</p>
                </div>
              </div>

              <ol className="mt-6 space-y-1" aria-live="polite">
                {stages.map((s, i) => {
                  const state = i < visible ? "done" : running && i === visible ? "active" : "idle";
                  return (
                    <li key={s.id} className="flex items-start gap-3 rounded-2xl px-2 py-2">
                      <span
                        className={cn(
                          "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full font-mono text-[11px]",
                          state === "done" && "bg-blue-400 text-[#0b0e0d]",
                          state === "active" && "bg-white/15 text-white",
                          state === "idle" && "bg-white/8 text-white/40"
                        )}
                        aria-hidden
                      >
                        {state === "done" ? <CheckCheck className="h-3.5 w-3.5" /> : state === "active" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : i + 1}
                      </span>
                      <span>
                        <span className={cn("block font-mono text-[11px] uppercase tracking-[0.18em]", state === "idle" ? "text-white/35" : "text-blue-300")}>{s.label}</span>
                        <span className={cn("block text-[14.5px] font-medium", state === "idle" ? "text-white/45" : "text-white")}>{s.title}</span>
                      </span>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                {!done ? (
                  <button
                    onClick={run}
                    disabled={running}
                    className="btn-press inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0b0e0d] hover:bg-blue-100 disabled:opacity-70"
                  >
                    {running ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
                    {running ? "Running…" : visible > 0 ? "Continue demo" : "Run Demo"}
                  </button>
                ) : (
                  <div className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-400/15 px-6 py-3.5 text-[15px] font-semibold text-blue-200" role="status">
                    <LottieAnimation name="pulse" loop className="h-7 w-7" /> Demo complete
                  </div>
                )}
                <button
                  onClick={reset}
                  className="btn-press inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-[14.5px] font-medium text-white/80 hover:border-white/35 hover:text-white"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden /> Reset
                </button>
              </div>
              <p className="mt-3 font-mono text-[11.5px] leading-relaxed text-white/40">
                Demo only — sample messages and matches. Your workflows use your data and rules.
              </p>
            </div>
          </Reveal>

          <div className="min-h-[420px] rounded-[1.75rem] border border-white/10 bg-white p-5 text-[#0b0e0d] md:p-7" aria-live="polite">
            {visible === 0 && !running && (
              <div className="grid h-full min-h-[380px] place-items-center text-center">
                <div>
                  <p className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#0b0e0d]/5">
                    <Play className="h-5 w-5" aria-hidden />
                  </p>
                  <p className="mt-4 text-[16px] font-semibold">Press “Run Demo” to start</p>
                  <p className="mx-auto mt-1.5 max-w-[38ch] text-[14px] text-[#0b0e0d]/60">
                    You’ll see the message, the extraction, the lead record, the matches and the follow-up — in order.
                  </p>
                </div>
              </div>
            )}
            <AnimatePresence mode="popLayout">
              {stages.slice(0, visible).map((s) => (
                <motion.div
                  key={s.id}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  className="mb-4 last:mb-0"
                >
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#2563eb]">{s.label}</p>
                  {s.body}
                </motion.div>
              ))}
            </AnimatePresence>
            {running && (
              <div className="relative mt-2 h-1 overflow-hidden rounded-full bg-[#0b0e0d]/8" aria-hidden>
                <div className="absolute inset-y-0 w-1/2 bg-[#2563eb] animate-shimmer" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
