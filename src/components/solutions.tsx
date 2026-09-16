"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { solutions } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import { Stagger, StaggerItem } from "./reveal";

export function Solutions() {
  return (
    <section id="solutions" aria-labelledby="solutions-h" className="scroll-mt-20 border-t border-[#0b0e0d]/8 bg-[#fafaf9]">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Solutions"
            title={<span id="solutions-h">What could your business stop doing manually?</span>}
            copy="Practical, real-world workflows built around the tools you already use — removing repetitive friction so your team can focus on growth."
          />
          <a
            href="#contact"
            className="btn-press inline-flex shrink-0 items-center gap-2 rounded-xl border border-[#0b0e0d]/15 bg-white px-4.5 py-2.5 text-[13.5px] font-medium text-[#0b0e0d] hover:border-[#0b0e0d]/35"
          >
            Discuss your workflow <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <Stagger className="mt-7 grid gap-4 md:grid-cols-2">
          {solutions.map((s) => (
            <StaggerItem key={s.id}>
              <article className="group flex h-full flex-col justify-between rounded-2xl border border-[#0b0e0d]/10 bg-white p-5 transition-all duration-300 hover:border-[#0b0e0d]/25 hover:card-shadow md:p-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0b0e0d] text-white transition-colors duration-300 group-hover:bg-[#2563eb]">
                      <s.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="font-mono text-[12px] font-semibold text-[#2563eb]">
                      {s.number}
                    </span>
                  </div>

                  <h3 className="mt-3.5 text-[18px] font-semibold tracking-tight text-[#0b0e0d]">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[#0b0e0d]/70">
                    {s.short}
                  </p>

                  {/* Visual Workflow Pipeline */}
                  <div className="mt-4 rounded-xl border border-[#0b0e0d]/8 bg-[#fafaf9] p-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0b0e0d]/50">
                      Workflow Pipeline
                    </p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[11.5px]">
                      {s.flow.map((step, idx) => (
                        <div key={step} className="flex items-center gap-1.5">
                          <span className="rounded-md bg-white px-2 py-0.5 font-mono text-[11px] font-medium text-[#0b0e0d] shadow-2xs border border-[#0b0e0d]/6">
                            {step}
                          </span>
                          {idx < s.flow.length - 1 && (
                            <span className="text-[#2563eb] font-bold" aria-hidden>→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={`${s.title} capabilities`}>
                    {s.points.map((p) => (
                      <li key={p} className="rounded-md bg-[#0b0e0d]/[0.04] px-2.5 py-0.5 text-[11.5px] font-medium text-[#0b0e0d]/65">
                        ✓ {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 border-t border-[#0b0e0d]/8 pt-3">
                  <a href={`/demo?workflow=${s.id}`} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2563eb] hover:text-[#1d4ed8]">
                    <span>Run interactive demo</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
                  </a>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-7 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#0b0e0d]/8 bg-white p-4.5 card-shadow sm:flex-row sm:items-center sm:px-6">
          <div>
            <p className="text-[14.5px] font-semibold text-[#0b0e0d]">Want to test these workflows yourself?</p>
            <p className="text-[12.5px] text-[#0b0e0d]/60">Explore realistic step-by-step simulations across WhatsApp, CRM, Documents, and Tasks.</p>
          </div>
          <a
            href="/demo"
            className="btn-press inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#0b0e0d] px-5 py-2.5 text-[13px] font-medium text-white hover:bg-[#1a201e] sm:w-auto"
          >
            Launch Demo Lab <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
