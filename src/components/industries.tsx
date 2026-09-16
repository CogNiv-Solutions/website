"use client";

import { useState } from "react";
import { ArrowRight, Building2, GraduationCap, Factory, Truck, Briefcase, Boxes, MessageSquare } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Stagger, StaggerItem } from "./reveal";
import { WorkflowAuditModal, type IndustryWorkflow } from "./workflow-audit-modal";
import { getWhatsAppUrl } from "@/lib/utils";

const industryList: (IndustryWorkflow & { icon: typeof Boxes })[] = [
  {
    id: "distributors",
    icon: Boxes,
    name: "Distributors & Wholesalers",
    example: "Order intake → stock check → invoice draft → dispatch alert",
    desc: "Eliminate order errors and speed up dispatch without adding manual data entry staff.",
    types: ["Data Entry", "Documents", "Internal Operations"],
  },
  {
    id: "real-estate",
    icon: Building2,
    name: "Real Estate",
    example: "WhatsApp enquiry → lead qualification → property match → site-visit follow-up",
    desc: "Automate enquiry qualification, property matching, and scheduled follow-ups so zero leads go cold.",
    types: ["Lead Management", "WhatsApp", "Follow-ups"],
  },
  {
    id: "education",
    icon: GraduationCap,
    name: "Coaching & Education",
    example: "Admission enquiry → counsellor triage → batch alerts → fee reminders",
    desc: "Free counsellors to close admissions rather than copying responses across WhatsApp and registers.",
    types: ["Lead Management", "WhatsApp", "Follow-ups"],
  },
  {
    id: "manufacturing",
    icon: Factory,
    name: "Manufacturing",
    example: "Job card intake → material QC checklist → supervisor tracking → daily report",
    desc: "Keep shop-floor and inventory status transparent without constantly calling plant managers.",
    types: ["Data Entry", "Internal Operations", "Documents"],
  },
  {
    id: "logistics",
    icon: Truck,
    name: "Logistics",
    example: "Booking request → driver dispatch → WhatsApp POD upload → billing sync",
    desc: "Cut 'where-is-my-truck' status queries and reconcile vendor billing without delays.",
    types: ["WhatsApp", "Documents", "Internal Operations"],
  },
  {
    id: "services",
    icon: Briefcase,
    name: "Professional Services",
    example: "Client intake → task creation → milestone reminder → invoice trigger",
    desc: "Keep project deliverables, team timesheets, and milestone billing synchronized from day one.",
    types: ["Documents", "Internal Operations", "Follow-ups"],
  },
];

export function Industries() {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryWorkflow | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAuditClick = (ind: IndustryWorkflow) => {
    setSelectedIndustry(ind);
    setModalOpen(true);
    // Also dispatch event so contact form on page is prefilled if navigated
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cogniv:audit-workflow", { detail: ind }));
    }
  };

  const handleJumpToFullForm = (ind: IndustryWorkflow) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cogniv:audit-workflow", { detail: ind }));
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => {
          const nameInput = document.getElementById("f-name");
          nameInput?.focus();
        }, 450);
      }
    }
  };

  return (
    <section id="industries" aria-labelledby="ind-h" className="scroll-mt-20 border-t border-[#0b0e0d]/8">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
        <SectionHeading
          eyebrow="Industries"
          title={<span id="ind-h">Built for businesses with repetitive work.</span>}
          copy="Every industry has specific manual bottlenecks. Cogniv implements battle-tested workflow automations tailored to your operational rhythm."
        />

        <Stagger className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industryList.map((ind) => (
            <StaggerItem key={ind.id} className="h-full">
              <article className="flex h-full flex-col justify-between rounded-[1.3rem] border border-[#0b0e0d]/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#2563eb]/40 hover:card-shadow">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#eff6ff] text-[#2563eb]">
                      <ind.icon className="h-4.5 w-4.5" aria-hidden />
                    </span>
                    <h3 className="text-[16.5px] font-semibold tracking-tight text-[#0b0e0d]">
                      {ind.name}
                    </h3>
                  </div>

                  <div className="mt-3 rounded-xl bg-[#fafaf9] border border-[#0b0e0d]/6 p-2.5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0b0e0d]/45">
                      Example Workflow
                    </p>
                    <p className="mt-1 font-mono text-[11.5px] font-medium text-[#2563eb] leading-relaxed">
                      {ind.example}
                    </p>
                  </div>

                  <p className="mt-2 text-[13px] leading-relaxed text-[#0b0e0d]/65">
                    {ind.desc}
                  </p>
                </div>

                <div className="mt-4 border-t border-[#0b0e0d]/6 pt-3 space-y-2">
                  <button
                    type="button"
                    onClick={() => handleAuditClick(ind)}
                    className="btn-press group inline-flex w-full items-center justify-between rounded-xl border border-[#2563eb]/20 bg-[#eff6ff] px-3.5 py-2 text-[12.5px] font-semibold text-[#1d4ed8] transition-all hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white"
                  >
                    <span>Audit this workflow</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-[#0b0e0d]/50 px-0.5">
                    <span>⚡ 30-min live review</span>
                    <a
                      href={getWhatsAppUrl(`Hi Cogniv, I want to audit our ${ind.name} workflow: "${ind.example}".`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-[#2563eb] hover:underline"
                    >
                      <MessageSquare className="h-3 w-3" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Interactive Workflow Audit Dialog */}
      <WorkflowAuditModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        industry={selectedIndustry}
        onJumpToFullForm={handleJumpToFullForm}
      />
    </section>
  );
}

