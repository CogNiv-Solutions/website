"use client";

import { MessageSquareOff, FileSpreadsheet, ClockAlert, CopyX, BarChart3, AlertCircle } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Stagger, StaggerItem } from "./reveal";

const painPoints = [
  {
    icon: FileSpreadsheet,
    title: "Manual data entry",
    description: "Typing orders, bills, or customer lists by hand into spreadsheets and accounting systems.",
    tag: "High Error Risk",
  },
  {
    icon: ClockAlert,
    title: "Missed follow-ups",
    description: "Interested buyers go cold because reminders depend on personal memory rather than scheduled systems.",
    tag: "Lost Revenue",
  },
  {
    icon: MessageSquareOff,
    title: "Leads getting lost in WhatsApp",
    description: "Customer chats scatter across team phones with zero tracking, no qualification, and delayed responses.",
    tag: "Leakage",
  },
  {
    icon: BarChart3,
    title: "Repetitive reporting",
    description: "Hours spent every evening compiling updates across sheets instead of reviewing an instant summary.",
    tag: "Time Sink",
  },
  {
    icon: CopyX,
    title: "Data copied between multiple tools",
    description: "Re-entering the same customer details from WhatsApp into Excel, CRM, and invoicing software.",
    tag: "Friction",
  },
];

export function Problem() {
  return (
    <section id="problem" aria-labelledby="problem-h" className="scroll-mt-20 border-t border-[#0b0e0d]/8 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
        <SectionHeading
          eyebrow="The Reality"
          title={<span id="problem-h">Your team shouldn’t have to do this manually.</span>}
          copy="Leads get lost in chats. Data gets entered twice. Follow-ups depend on memory. It works — until your business grows."
        />

        <Stagger className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((p, i) => (
            <StaggerItem key={p.title} className={i === 4 ? "sm:col-span-2 lg:col-span-1" : undefined}>
              <div className="group flex h-full flex-col justify-between rounded-2xl border border-[#0b0e0d]/10 bg-[#fafaf9] p-5 transition-all duration-300 hover:border-[#0b0e0d]/25 hover:bg-white hover:card-shadow">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0b0e0d] text-white">
                      <p.icon className="h-4.5 w-4.5" strokeWidth={1.8} aria-hidden />
                    </span>
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#b45309]">
                      {p.tag}
                    </span>
                  </div>
                  <h3 className="mt-3 text-[16.5px] font-semibold text-[#0b0e0d]">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#0b0e0d]/65">
                    {p.description}
                  </p>
                </div>
                <div className="mt-4 border-t border-[#0b0e0d]/8 pt-2.5 text-[12px] font-medium text-[#0b0e0d]/50">
                  <span>Common bottleneck</span>
                </div>
              </div>
            </StaggerItem>
          ))}

          {/* Quick takeaway card */}
          <StaggerItem className="sm:col-span-2 lg:col-span-1">
            <div className="flex h-full flex-col justify-between rounded-2xl bg-[#0b0e0d] p-5 text-white card-shadow-dark">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] text-orange-300">
                  <AlertCircle className="h-3.5 w-3.5" /> Sound familiar?
                </span>
                <p className="mt-3.5 text-[16px] font-medium leading-snug">
                  “If this happens in your business every week, it’s not an employee issue — it’s a missing workflow.”
                </p>
              </div>
              <a
                href="#solutions"
                className="btn-press mt-5 inline-flex w-fit items-center gap-2 text-[13.5px] font-semibold text-orange-400 hover:text-orange-300"
              >
                See what Cogniv can automate →
              </a>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
