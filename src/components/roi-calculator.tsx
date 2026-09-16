"use client";

import { useMemo, useState } from "react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

export function RoiCalculator() {
  const [hours, setHours] = useState(100);
  const [auto, setAuto] = useState(60);
  const [cost, setCost] = useState(350);

  const saved = useMemo(() => Math.round((hours * auto) / 100), [hours, auto]);
  const value = useMemo(() => saved * cost, [saved, cost]);

  return (
    <section aria-labelledby="roi-h" className="border-t border-[#0b0e0d]/8">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Business value"
              title={<span id="roi-h">Automation should pay for itself.</span>}
              copy="We focus on workflows where automation can reduce repetitive hours, response delays, manual entry, missed follow-ups and errors. Adjust the numbers to your team — these are directional estimates, not promises."
            />
            <ul className="mt-6 space-y-2.5 text-[14.5px] text-[#0b0e0d]/70">
              {["Repetitive employee hours", "Response delays", "Manual data entry", "Missed follow-ups", "Operational errors"].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" aria-hidden /> {t}
                </li>
              ))}
            </ul>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-[1.75rem] border border-[#0b0e0d]/10 bg-white p-6 card-shadow md:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0b0e0d]/45">Estimate — your inputs</p>

              <label className="mt-6 block">
                <span className="flex items-baseline justify-between text-[14px] font-medium">
                  Monthly repetitive hours <span className="font-mono text-[15px] font-semibold">{hours}h</span>
                </span>
                <input
                  type="range" min={10} max={600} step={10} value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="mt-2.5 w-full accent-[#2563eb]" aria-label="Monthly repetitive hours"
                />
              </label>

              <label className="mt-5 block">
                <span className="flex items-baseline justify-between text-[14px] font-medium">
                  Share that looks automatable <span className="font-mono text-[15px] font-semibold">{auto}%</span>
                </span>
                <input
                  type="range" min={10} max={90} step={5} value={auto}
                  onChange={(e) => setAuto(Number(e.target.value))}
                  className="mt-2.5 w-full accent-[#2563eb]" aria-label="Share automatable"
                />
              </label>

              <label className="mt-5 block">
                <span className="flex items-baseline justify-between text-[14px] font-medium">
                  Fully-loaded cost per hour <span className="font-mono text-[15px] font-semibold">₹{cost}</span>
                </span>
                <input
                  type="range" min={150} max={1500} step={50} value={cost}
                  onChange={(e) => setCost(Number(e.target.value))}
                  className="mt-2.5 w-full accent-[#2563eb]" aria-label="Cost per hour"
                />
              </label>

              <div className="mt-7 grid grid-cols-2 gap-3" role="status" aria-live="polite">
                <div className="rounded-2xl bg-[#0b0e0d] p-5 text-white">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">Hours freed</p>
                  <p className="mt-1 font-mono text-3xl font-bold">{saved}<span className="text-base font-medium text-white/60">/mo</span></p>
                </div>
                <div className="rounded-2xl bg-[#eff6ff] p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#1d4ed8]/60">Capacity value</p>
                  <p className="mt-1 font-mono text-2xl font-bold text-[#1d4ed8] md:text-3xl">₹{value.toLocaleString("en-IN")}</p>
                </div>
              </div>
              <p className="mt-4 text-[12.5px] leading-relaxed text-[#0b0e0d]/50">
                Rough estimate only. Real savings depend on process mix, volumes and how cleanly the workflow can be standardised — which is exactly what the audit determines.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
