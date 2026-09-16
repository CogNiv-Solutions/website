"use client";

import { useState } from "react";
import {
  MessageCircle,
  FileSpreadsheet,
  Table,
  Users,
  CreditCard,
  Mail,
  MessageSquare,
  Database,
  CheckCircle2,
  ArrowRight,
  Zap,
  Sparkles,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { cn, getWhatsAppUrl } from "@/lib/utils";

type ToolItem = {
  id: string;
  name: string;
  category: string;
  icon: typeof MessageCircle;
  color: string;
};

const AVAILABLE_TOOLS: ToolItem[] = [
  { id: "whatsapp", name: "WhatsApp Business", category: "Chat & Orders", icon: MessageCircle, color: "text-[#25D366]" },
  { id: "tally", name: "Tally Prime / ERP", category: "Accounting & Tax", icon: FileSpreadsheet, color: "text-blue-600" },
  { id: "excel", name: "Excel & Sheets", category: "Spreadsheets", icon: Table, color: "text-blue-600" },
  { id: "zoho", name: "Zoho CRM / Books", category: "Lead & CRM", icon: Users, color: "text-amber-600" },
  { id: "razorpay", name: "Razorpay / Gateway", category: "Payments", icon: CreditCard, color: "text-indigo-600" },
  { id: "email", name: "Gmail & Outlook", category: "Email Inboxes", icon: Mail, color: "text-red-500" },
  { id: "slack", name: "Slack & Teams", category: "Internal Comms", icon: MessageSquare, color: "text-purple-600" },
  { id: "api", name: "Custom DB / APIs", category: "Databases", icon: Database, color: "text-teal-600" },
];

type PipelineScenario = {
  requires: string[];
  title: string;
  description: string;
  tag: string;
};

const PIPELINE_RULES: PipelineScenario[] = [
  {
    requires: ["whatsapp", "tally"],
    title: "WhatsApp Order Intake to Draft Tally Invoices",
    description: "Incoming customer item lists, voice notes, and PO photos are extracted and converted into ready-to-approve Tally vouchers.",
    tag: "High ROI · Saves 15+ hrs/wk",
  },
  {
    requires: ["whatsapp", "excel"],
    title: "Zero-Typing Chat-to-Sheet Pipeline",
    description: "Every order, customer address, and inquiry arriving on WhatsApp is logged into structured Google Sheets or Excel tables automatically.",
    tag: "Data Accuracy · 0% Typos",
  },
  {
    requires: ["whatsapp", "zoho"],
    title: "Instant 2-Minute WhatsApp Lead Qualification",
    description: "New CRM leads instantly receive a personalized WhatsApp brochure and qualifying questionnaire with responses logged back to deals.",
    tag: "Lead Velocity · 3.8x Site Visits",
  },
  {
    requires: ["tally", "razorpay"],
    title: "Automated Payment Ledger Reconciliation",
    description: "Razorpay payout reports and customer transaction IDs automatically reconcile into matching client ledgers inside Tally.",
    tag: "Finance Ops · Zero Month-End Delays",
  },
  {
    requires: ["email", "excel"],
    title: "Inbound Quotation & PDF Invoice Extractor",
    description: "Vendor bills, invoices, and delivery notes received on Gmail/Outlook are extracted with OCR and synced to central sheets.",
    tag: "Document Automation",
  },
  {
    requires: ["slack", "api"],
    title: "Real-Time Operational Alerts & Exception Bots",
    description: "Trigger instant Slack or Teams alerts when warehouse stock runs low, dispatch milestones stall, or payment failures occur.",
    tag: "Team Transparency",
  },
  {
    requires: ["email", "whatsapp"],
    title: "Omni-Channel Customer Inquiry Router",
    description: "Unifies queries across email and WhatsApp into a single response dashboard so your team never misses an urgent customer ping.",
    tag: "Customer Support",
  },
];

export function StackChecker() {
  const [selectedTools, setSelectedTools] = useState<string[]>(["whatsapp", "tally", "excel"]);

  const toggleTool = (id: string) => {
    setSelectedTools((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  // Find matching pipelines based on selected tools
  const activePipelines = PIPELINE_RULES.filter((rule) =>
    rule.requires.every((r) => selectedTools.includes(r))
  );

  const selectedToolNames = AVAILABLE_TOOLS.filter((t) => selectedTools.includes(t.id))
    .map((t) => t.name)
    .join(", ");

  const handleScrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      const toolInput = document.getElementById("f-tools") as HTMLInputElement | null;
      if (toolInput) {
        toolInput.value = selectedToolNames;
        toolInput.dispatchEvent(new Event("input", { bubbles: true }));
        toolInput.focus();
      }
    }
  };

  return (
    <section
      id="stack-checker"
      aria-labelledby="stack-checker-h"
      className="scroll-mt-20 border-t border-[#0b0e0d]/8 bg-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow="Interactive Compatibility Engine"
          title={<span id="stack-checker-h">Can we automate your current software stack?</span>}
          copy="Select the tools your business uses every day. We’ll show you the exact automated pipelines we can build between them."
        />

        {/* Tool Selectors */}
        <Reveal delay={0.08} className="mt-10">
          <div className="rounded-[1.75rem] border border-[#0b0e0d]/10 bg-[#fafaf9] p-6 card-shadow md:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[14px] font-semibold text-[#0b0e0d]">
                  Select your daily tools ({selectedTools.length} selected):
                </p>
                <p className="text-[12.5px] text-[#0b0e0d]/60">
                  Tap to add or remove tools from your stack.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-[12px] font-semibold text-[#2563eb]">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                  {selectedTools.length >= 2 ? "100% Automatable" : "Select at least 2 tools"}
                </span>
              </div>
            </div>

            {/* Grid of Tools */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
              {AVAILABLE_TOOLS.map((tool) => {
                const Icon = tool.icon;
                const isSelected = selectedTools.includes(tool.id);
                return (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => toggleTool(tool.id)}
                    aria-pressed={isSelected}
                    className={cn(
                      "btn-press group relative flex flex-col items-start rounded-2xl border p-4 text-left transition-all duration-200",
                      isSelected
                        ? "border-[#0b0e0d] bg-white shadow-md ring-2 ring-[#0b0e0d]/10"
                        : "border-[#0b0e0d]/10 bg-white/70 hover:border-[#0b0e0d]/25 hover:bg-white"
                    )}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span
                        className={cn(
                          "grid h-10 w-10 place-items-center rounded-xl transition-colors",
                          isSelected ? "bg-[#0b0e0d] text-white" : "bg-[#fafaf9] text-[#0b0e0d]"
                        )}
                      >
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <span
                        className={cn(
                          "h-5 w-5 rounded-full border grid place-items-center text-[10px]",
                          isSelected
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-[#0b0e0d]/15 bg-transparent"
                        )}
                      >
                        {isSelected && "✓"}
                      </span>
                    </div>
                    <span className="mt-3 text-[14px] font-semibold text-[#0b0e0d]">
                      {tool.name}
                    </span>
                    <span className="text-[11.5px] text-[#0b0e0d]/55">
                      {tool.category}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Live Generated Pipelines Output */}
            <div className="mt-8 rounded-2xl border border-[#0b0e0d]/10 bg-white p-6">
              <div className="flex items-center gap-2 text-[14px] font-semibold text-[#0b0e0d]">
                <Zap className="h-4.5 w-4.5 text-[#2563eb]" aria-hidden />
                <span>
                  {activePipelines.length > 0
                    ? `${activePipelines.length} Available Automation Pipelines for Your Stack:`
                    : "Combine tools above to see ready-to-deploy pipelines:"}
                </span>
              </div>

              {activePipelines.length > 0 ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {activePipelines.map((pipe) => (
                    <div
                      key={pipe.title}
                      className="flex flex-col justify-between rounded-xl border border-blue-500/20 bg-blue-50/20 p-4 transition-all hover:border-blue-500/40 hover:bg-blue-50/40"
                    >
                      <div>
                        <span className="inline-block rounded-md bg-blue-100/80 px-2 py-0.5 font-mono text-[10.5px] font-semibold text-[#2563eb]">
                          {pipe.tag}
                        </span>
                        <h4 className="mt-2 text-[14.5px] font-semibold text-[#0b0e0d]">
                          {pipe.title}
                        </h4>
                        <p className="mt-1 text-[13px] leading-relaxed text-[#0b0e0d]/70">
                          {pipe.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 rounded-xl border border-dashed border-[#0b0e0d]/15 bg-[#fafaf9] p-6 text-center text-[13.5px] text-[#0b0e0d]/60">
                  Select at least 2 tools (e.g. WhatsApp + Tally, or Excel + Email) to preview custom automated workflows.
                </div>
              )}

              {/* Action Bar */}
              <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-[#0b0e0d]/8 pt-5 sm:flex-row">
                <p className="text-[13px] text-[#0b0e0d]/70">
                  Selected Stack: <strong className="text-[#0b0e0d]">{selectedToolNames || "None"}</strong>
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={getWhatsAppUrl(
                      `Hi Cogniv, I'm using ${selectedToolNames}. Can we discuss automating our workflow?`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press inline-flex items-center gap-2 rounded-full border border-blue-600/30 bg-blue-50 px-4 py-2 text-[13px] font-medium text-blue-950 hover:bg-blue-100"
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-blue-600" aria-hidden />
                    Chat on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={handleScrollToContact}
                    className="btn-press inline-flex items-center gap-2 rounded-full bg-[#0b0e0d] px-5 py-2.5 text-[13px] font-medium text-white hover:bg-[#1a201e]"
                  >
                    Build This in Free Audit <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </button>
                </div>
              </div>
            </div>

            {/* Protocol & Integration Marquee Badges */}
            <div className="mt-8 border-t border-[#0b0e0d]/8 pt-5">
              <p className="font-mono text-[11px] uppercase tracking-wider text-[#0b0e0d]/50">
                Enterprise Protocols & Connectors:
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {[
                  "WhatsApp Cloud API",
                  "Tally XML / ODBC",
                  "REST & Webhooks",
                  "OpenAI & Claude LLMs",
                  "Google Workspace API",
                  "Razorpay Webhooks",
                  "PostgreSQL / MySQL",
                  "Make & Zapier Nodes",
                ].map((proto) => (
                  <span
                    key={proto}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#0b0e0d]/10 bg-white px-2.5 py-1 text-[11.5px] font-medium text-[#0b0e0d]/70"
                  >
                    <Sparkles className="h-3 w-3 text-[#2563eb]" aria-hidden />
                    {proto}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
