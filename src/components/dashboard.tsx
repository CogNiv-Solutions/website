"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Users, Zap, BellRing, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

const tabs = [
  { id: "leads", icon: Users, label: "Leads" },
  { id: "auto", icon: Zap, label: "Automations" },
  { id: "tasks", icon: CheckCircle2, label: "Tasks" },
  { id: "msgs", icon: BellRing, label: "Messages" },
] as const;

const data: Record<string, { title: string; rows: [string, string][]; note: string }> = {
  leads: {
    title: "Today's leads",
    rows: [
      ["New leads", "24"],
      ["Qualified", "17"],
      ["Follow-ups created", "18"],
      ["Avg. first response", "41 sec"],
    ],
    note: "Every lead has a source, owner and next step.",
  },
  auto: {
    title: "Automations running",
    rows: [
      ["Active workflows", "9"],
      ["Runs today", "132"],
      ["Needs review", "3"],
      ["Failed safely", "0"],
    ],
    note: "Failures pause with a reason — never silently.",
  },
  tasks: {
    title: "Tasks automated",
    rows: [
      ["Tasks automated", "43"],
      ["Manual approvals", "6"],
      ["Overdue", "1"],
      ["Completed on time", "96%"],
    ],
    note: "Humans approve; systems do the carrying.",
  },
  msgs: {
    title: "Messages handled",
    rows: [
      ["Auto responses", "71"],
      ["Handed to human", "12"],
      ["After-hours covered", "23"],
      ["Unanswered", "0"],
    ],
    note: "Common questions answered instantly, day or night.",
  },
};

export function Dashboard() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("leads");
  const current = data[tab];

  return (
    <section aria-labelledby="dash-h" className="border-t border-[#0b0e0d]/8 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="Sample dashboard"
          title={<span id="dash-h">One place to see the work getting done.</span>}
          copy="A realistic view of what a Cogniv operations dashboard tracks. All numbers below are clearly-marked demo data — your dashboard shows your live operation."
        />

        <Reveal delay={0.08}>
          <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-[#0b0e0d]/10 bg-[#0b0e0d] text-white card-shadow">
            <div className="flex flex-col gap-4 border-b border-white/10 p-4 md:flex-row md:items-center md:justify-between md:p-5">
              <div className="flex items-center gap-2.5">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                <p className="font-mono text-[12px] text-white/55">cogniv · operations · <span className="rounded bg-amber-400/15 px-1.5 py-0.5 text-amber-300">DEMO DATA</span></p>
              </div>
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar" role="tablist" aria-label="Dashboard views">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={tab === t.id}
                    onClick={() => setTab(t.id)}
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors",
                      tab === t.id ? "bg-white text-[#0b0e0d]" : "bg-white/8 text-white/65 hover:bg-white/15 hover:text-white"
                    )}
                  >
                    <t.icon className="h-3.5 w-3.5" aria-hidden /> {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6 p-5 md:p-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">{current.title}</p>
                <motion.dl
                  key={tab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="mt-4 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.04]"
                >
                  {current.rows.map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between px-5 py-3.5">
                      <dt className="text-[14px] text-white/65">{k}</dt>
                      <dd className="font-mono text-[15px] font-semibold text-white">{v}</dd>
                    </div>
                  ))}
                </motion.dl>
                <p className="mt-3 text-[13.5px] text-white/50">{current.note}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 text-[#0b0e0d]">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0b0e0d]/45">Today’s automation activity</p>
                <ul className="mt-4 space-y-3">
                  {[
                    ["New leads", "24", "w-[38%]"],
                    ["Automated responses", "71", "w-[82%]"],
                    ["Follow-ups created", "18", "w-[30%]"],
                    ["Tasks automated", "43", "w-[58%]"],
                  ].map(([k, v, w]) => (
                    <li key={k}>
                      <div className="flex items-baseline justify-between text-[13.5px]">
                        <span className="text-[#0b0e0d]/65">{k}</span>
                        <span className="font-mono font-semibold">{v}</span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#0b0e0d]/8">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
                          className={cn("h-full rounded-full bg-[#0e7c5b]", w)}
                          style={{ maxWidth: "100%" }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 rounded-xl bg-[#fff8ed] px-3.5 py-2.5 text-[12.5px] leading-relaxed text-[#7c3f0c]">
                  Sample figures for illustration. Your audit defines which metrics actually matter for your business.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
