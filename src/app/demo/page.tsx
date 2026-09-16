"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Users,
  MessageCircle,
  FileText,
  Boxes,
  Play,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  ShieldCheck,
  Building2,
  Database,
  Send,
  Calendar,
  Check,
  Zap,
} from "lucide-react";
import { cn, getWhatsAppUrl } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

type WorkflowTask = {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  metric: string;
  tools: string[];
  steps: {
    title: string;
    description: string;
    badge: string;
  }[];
  renderOutput: (step: number) => React.ReactNode;
};

const tasks: Record<string, WorkflowTask> = {
  "lead-crm": {
    id: "lead-crm",
    name: "Lead & CRM Automation",
    badge: "01 — Growth & Sales",
    tagline: "From raw WhatsApp / web enquiry to qualified CRM deal with zero manual typing.",
    metric: "38 seconds average qualification speed",
    tools: ["WhatsApp", "HubSpot / Zoho", "Google Sheets", "Email Alerts"],
    steps: [
      {
        title: "Inbound Enquiry Arrives",
        description: "Customer sends an unstructured message on WhatsApp or website form.",
        badge: "Trigger",
      },
      {
        title: "AI Intent & Budget Extraction",
        description: "Cogniv parses property size, budget range, preferred area, and timeframe.",
        badge: "AI Processing",
      },
      {
        title: "CRM Contact & Deal Created",
        description: "Structured contact record created in CRM with auto-calculated qualification score.",
        badge: "CRM Sync",
      },
      {
        title: "Sales Rep Auto-Assignment",
        description: "Assigned sales executive gets an instant WhatsApp alert with lead summary.",
        badge: "Routing",
      },
      {
        title: "Scheduled Follow-Up Sequence",
        description: "Automated WhatsApp check-in scheduled if no booking occurs within 24 hours.",
        badge: "Follow-up",
      },
    ],
    renderOutput: (step) => (
      <div className="space-y-4">
        {step >= 0 && (
          <div className="rounded-2xl border border-[#0b0e0d]/10 bg-[#fafaf9] p-4 transition-all">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#0b0e0d]/45">
              <span>CUSTOMER INQUIRY · 10:42 AM</span>
              <span className="rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5">Live Input</span>
            </div>
            <p className="mt-2 rounded-xl bg-white p-3 text-[14px] text-[#0b0e0d] card-shadow font-medium">
              “Hi, looking for 2 BHK in Baner or Wakad, budget around 60-65 Lakhs, urgent possession needed.”
            </p>
          </div>
        )}

        {step >= 1 && (
          <div className="rounded-2xl border border-[#2563eb]/20 bg-[#eff6ff] p-4 transition-all animate-fadeIn">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#1d4ed8]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> COGNIV AI EXTRACTOR
              </span>
              <span className="font-semibold text-emerald-600">Qualified (Score: 92/100)</span>
            </div>
            <div className="mt-2.5 grid grid-cols-2 gap-2 text-[13px] sm:grid-cols-3">
              <div className="rounded-lg bg-white p-2 border border-[#2563eb]/10">
                <span className="block text-[11px] text-[#0b0e0d]/50">Requirement</span>
                <span className="font-semibold text-[#0b0e0d]">2 BHK Apartment</span>
              </div>
              <div className="rounded-lg bg-white p-2 border border-[#2563eb]/10">
                <span className="block text-[11px] text-[#0b0e0d]/50">Budget</span>
                <span className="font-semibold text-[#0b0e0d]">₹60 L – ₹65 L</span>
              </div>
              <div className="rounded-lg bg-white p-2 border border-[#2563eb]/10">
                <span className="block text-[11px] text-[#0b0e0d]/50">Locations</span>
                <span className="font-semibold text-[#0b0e0d]">Baner, Wakad</span>
              </div>
            </div>
          </div>
        )}

        {step >= 2 && (
          <div className="rounded-2xl border border-[#0b0e0d]/10 bg-white p-4 card-shadow transition-all animate-fadeIn">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#0b0e0d]/45">
              <span>CRM RECORD · DEAL #1042</span>
              <span className="text-blue-600 font-semibold">Synced to HubSpot</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <p className="text-[15px] font-semibold text-[#0b0e0d]">Rajesh Malhotra</p>
                <p className="text-[12.5px] text-[#0b0e0d]/60">+91 98230 •••• · Stage: Qualified Buyer</p>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-[12px] font-semibold text-[#2563eb] border border-[#2563eb]/20">
                Deal Size: ₹62.5 L
              </span>
            </div>
          </div>
        )}

        {step >= 3 && (
          <div className="rounded-2xl bg-[#0b0e0d] p-4 text-white transition-all animate-fadeIn">
            <div className="flex items-center justify-between text-[11px] font-mono text-white/50">
              <span>INTERNAL DISPATCH ALERT</span>
              <span className="text-emerald-400 font-semibold">Delivered in 2.1s</span>
            </div>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white/85">
              📲 <strong>WhatsApp dispatched to Sales Rep (Amit S.):</strong>
              <br />
              “New qualified lead: Rajesh Malhotra · 2 BHK in Baner (Budget ₹65L). Client requested urgent call back.”
            </p>
          </div>
        )}

        {step >= 4 && (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/50 p-4 transition-all animate-fadeIn">
            <div className="flex items-center gap-2 text-emerald-800 text-[13.5px] font-medium">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Workflow complete: 24h follow-up calendar reminder queued automatically.</span>
            </div>
          </div>
        )}
      </div>
    ),
  },

  whatsapp: {
    id: "whatsapp",
    name: "WhatsApp Automation",
    badge: "02 — Customer Experience",
    tagline: "24/7 intelligent instant responses, lead qualification, and smart human handoff.",
    metric: "100% response rate within 5 seconds",
    tools: ["WhatsApp Cloud API", "Custom AI Engine", "Human Inbox Handoff"],
    steps: [
      {
        title: "Customer Message Received",
        description: "Buyer sends late-night inquiry about services and catalog.",
        badge: "Inbound",
      },
      {
        title: "Multilingual Understanding",
        description: "AI understands English, Hindi, and Hinglish nuances automatically.",
        badge: "Language AI",
      },
      {
        title: "Contextual Verified Reply",
        description: "Accurate product details and brochure PDF sent back instantly.",
        badge: "Instant Reply",
      },
      {
        title: "Lead Qualification Check",
        description: "Asks 2 quick qualifying questions (volume & timeline).",
        badge: "Screening",
      },
      {
        title: "Smooth Human Handoff",
        description: "When negotiation starts, system transfers the chat to senior sales with context notes.",
        badge: "Agent Handoff",
      },
    ],
    renderOutput: (step) => (
      <div className="rounded-2xl border border-[#0b0e0d]/10 bg-[#f4f7f6] p-4 font-sans">
        <div className="mb-3 flex items-center justify-between border-b border-[#0b0e0d]/8 pb-2">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-500 text-white font-bold text-[12px]">
              WA
            </span>
            <span className="text-[13px] font-semibold text-[#0b0e0d]">Cogniv WhatsApp Assistant</span>
          </div>
          <span className="font-mono text-[11px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-medium">
            Active 24/7
          </span>
        </div>

        <div className="space-y-3">
          {step >= 0 && (
            <div className="flex justify-start">
              <div className="max-w-[82%] rounded-2xl rounded-tl-sm bg-white p-3 text-[13.5px] text-[#0b0e0d] card-shadow">
                <p>Bhaiya bulk order ka rate list mil sakta hai kya? 500 units chahiye agle hafte tak.</p>
                <span className="mt-1 block text-right font-mono text-[10px] text-[#0b0e0d]/40">11:15 PM</span>
              </div>
            </div>
          )}

          {step >= 1 && (
            <div className="rounded-xl border border-blue-200 bg-blue-50/80 p-2 text-center text-[12px] font-mono text-[#1d4ed8]">
              ⚡ Language: Hinglish · Intent: Bulk Wholesale Catalog · Quantity: 500 units
            </div>
          )}

          {step >= 2 && (
            <div className="flex justify-end">
              <div className="max-w-[82%] rounded-2xl rounded-tr-sm bg-[#dcf8c6] p-3 text-[13.5px] text-[#0b0e0d] shadow-xs">
                <p>
                  Namaste! Bilkul, yahan 2026 wholesale catalog aur volume tier pricing attached hai.
                </p>
                <div className="mt-2 flex items-center gap-2 rounded-xl bg-white/70 p-2 border border-black/5">
                  <FileText className="h-4 w-4 text-emerald-600" />
                  <span className="text-[12px] font-medium">Cogniv_Wholesale_Pricing.pdf</span>
                </div>
                <span className="mt-1 block text-right font-mono text-[10px] text-[#0b0e0d]/40">11:15 PM · Delivered</span>
              </div>
            </div>
          )}

          {step >= 3 && (
            <div className="flex justify-end">
              <div className="max-w-[82%] rounded-2xl rounded-tr-sm bg-[#dcf8c6] p-3 text-[13.5px] text-[#0b0e0d] shadow-xs">
                <p>Kya aapka delivery location Mumbai mein hai ya bahar? Taaki best shipping quote de sakein.</p>
                <span className="mt-1 block text-right font-mono text-[10px] text-[#0b0e0d]/40">11:16 PM</span>
              </div>
            </div>
          )}

          {step >= 4 && (
            <div className="rounded-xl bg-[#0b0e0d] p-3 text-white">
              <div className="flex items-center justify-between text-[11px] font-mono text-white/50">
                <span>HUMAN HANDOFF INITIATED</span>
                <span className="text-emerald-400">Owner Notified</span>
              </div>
              <p className="mt-1 text-[13px] text-white/90">
                Customer replied: “Bhiwandi warehouse”. High-value enquiry routed directly to Sales Director with chat history.
              </p>
            </div>
          )}
        </div>
      </div>
    ),
  },

  "document-data": {
    id: "document-data",
    name: "Document & Data Automation",
    badge: "03 — Operations & Finance",
    tagline: "Extract tables and key fields from invoices, receipts, and POs into Tally & Excel.",
    metric: "99.8% field extraction accuracy",
    tools: ["OCR Vision AI", "Tally ERP / Excel", "Validation Rules Engine"],
    steps: [
      {
        title: "Vendor Invoice Ingestion",
        description: "PDF or photo arrives via email attachment or WhatsApp vendor upload.",
        badge: "Upload",
      },
      {
        title: "AI Field & Line Item OCR",
        description: "Extracts Invoice #, Date, GSTIN, HSN codes, and line-item amounts.",
        badge: "Data Extraction",
      },
      {
        title: "Rule-Based Validation",
        description: "Checks math consistency and verifies GSTIN format before posting.",
        badge: "Auto Audit",
      },
      {
        title: "Direct Sync to Tally / Database",
        description: "Creates clean ledger entry without human keystrokes.",
        badge: "ERP Sync",
      },
      {
        title: "Archive & Searchable Index",
        description: "File categorized and stored with searchable metadata for instant audit access.",
        badge: "Archived",
      },
    ],
    renderOutput: (step) => (
      <div className="space-y-4">
        {step >= 0 && (
          <div className="flex items-center justify-between rounded-2xl border border-[#0b0e0d]/10 bg-white p-4 card-shadow">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-[#2563eb]">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-[#0b0e0d]">Invoice_Vendor_7821.pdf</p>
                <p className="font-mono text-[11px] text-[#0b0e0d]/50">340 KB · Received 11:20 AM</p>
              </div>
            </div>
            <span className="rounded-full bg-blue-100 text-[#1d4ed8] px-3 py-1 font-mono text-[11px] font-semibold">
              Scanned
            </span>
          </div>
        )}

        {step >= 1 && (
          <div className="overflow-hidden rounded-2xl border border-[#0b0e0d]/10 bg-white card-shadow">
            <div className="border-b border-[#0b0e0d]/8 bg-[#fafaf9] px-4 py-2 text-[11px] font-mono text-[#0b0e0d]/50">
              DETECTED INVOICE FIELDS
            </div>
            <div className="divide-y divide-[#0b0e0d]/6 text-[13px]">
              <div className="flex justify-between px-4 py-2">
                <span className="text-[#0b0e0d]/60">Vendor Name</span>
                <span className="font-semibold text-[#0b0e0d]">Apex Precision Tools Ltd.</span>
              </div>
              <div className="flex justify-between px-4 py-2">
                <span className="text-[#0b0e0d]/60">GSTIN</span>
                <span className="font-mono font-medium text-[#2563eb]">27AAACA9876Q1ZB</span>
              </div>
              <div className="flex justify-between px-4 py-2">
                <span className="text-[#0b0e0d]/60">Total Amount</span>
                <span className="font-mono font-bold text-[#0b0e0d]">₹48,250.00</span>
              </div>
            </div>
          </div>
        )}

        {step >= 2 && (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/60 p-4">
            <div className="flex items-center gap-2 text-emerald-900 text-[13px] font-medium">
              <Check className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Tax Calculation Validated: CGST (9%) + SGST (9%) matches grand total.</span>
            </div>
          </div>
        )}

        {step >= 3 && (
          <div className="rounded-2xl bg-[#0b0e0d] p-4 text-white">
            <div className="flex items-center justify-between text-[11px] font-mono text-white/50">
              <span>ERP CONNECTOR</span>
              <span className="text-blue-300 font-semibold">Tally Prime XML Export</span>
            </div>
            <p className="mt-2 text-[13.5px] text-white/85">
              ✅ Voucher entry auto-created under Purchase Ledger #204. Zero manual data entry required.
            </p>
          </div>
        )}
      </div>
    ),
  },

  "internal-ops": {
    id: "internal-ops",
    name: "Internal Operations Automation",
    badge: "04 — Team & Operations",
    tagline: "Eliminate status chasing with automated job assignment, reminders, and daily summary reports.",
    metric: "Saves 2.5 hours daily for supervisors",
    tools: ["Task Boards", "WhatsApp Bot", "Executive Email Digest"],
    steps: [
      {
        title: "Operational Trigger",
        description: "New order or job card logged into system or spreadsheet.",
        badge: "Trigger",
      },
      {
        title: "Intelligent Workload Assignment",
        description: "Task automatically assigned based on team availability and location.",
        badge: "Assignment",
      },
      {
        title: "Timed WhatsApp Reminders",
        description: "Staff receives task details and checklist link directly on phone.",
        badge: "Notification",
      },
      {
        title: "Completion & POD Verification",
        description: "Worker taps 'Complete' and uploads delivery photo / proof.",
        badge: "Validation",
      },
      {
        title: "6:00 PM Management Summary",
        description: "Executive report compiled automatically with on-time percentage.",
        badge: "Reporting",
      },
    ],
    renderOutput: (step) => (
      <div className="space-y-4">
        {step >= 0 && (
          <div className="rounded-2xl border border-[#0b0e0d]/10 bg-white p-4 card-shadow">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#0b0e0d]/45">
              <span>JOB DISPATCH #8910</span>
              <span className="font-semibold text-[#2563eb]">Priority: Standard</span>
            </div>
            <p className="mt-1 text-[15px] font-semibold text-[#0b0e0d]">Warehouse Dispatch — Batch 40A</p>
            <p className="text-[13px] text-[#0b0e0d]/60">Destination: Thane Hub · Deadline: 4:00 PM</p>
          </div>
        )}

        {step >= 1 && (
          <div className="rounded-2xl border border-[#2563eb]/20 bg-[#eff6ff] p-4">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#1d4ed8]">
              <span>AUTO-ASSIGNMENT</span>
              <span className="font-semibold">Shift Match</span>
            </div>
            <p className="mt-1 text-[13.5px] text-[#0b0e0d]">
              Assigned to: <strong>Vikram Pawar (Logistics Lead)</strong> based on current active load.
            </p>
          </div>
        )}

        {step >= 2 && (
          <div className="rounded-2xl bg-[#0b0e0d] p-4 text-white">
            <div className="flex items-center justify-between text-[11px] font-mono text-white/50">
              <span>TIMED WHATSAPP REMINDER</span>
              <span className="text-emerald-400">Dispatched 2:30 PM</span>
            </div>
            <p className="mt-2 text-[13px] text-white/85">
              “Vikram, reminder for Batch 40A dispatch deadline in 90 mins. Please tap checklist when loaded.”
            </p>
          </div>
        )}

        {step >= 3 && (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/60 p-4">
            <div className="flex items-center justify-between text-emerald-900 text-[13px]">
              <span className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Proof of Delivery (POD) uploaded at 3:45 PM (15 mins early).
              </span>
              <span className="font-mono text-[11px] bg-emerald-100 px-2 py-0.5 rounded-full text-emerald-800">
                Verified
              </span>
            </div>
          </div>
        )}

        {step >= 4 && (
          <div className="rounded-2xl border border-[#0b0e0d]/10 bg-white p-4 card-shadow">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#0b0e0d]/45">
              <span>DAILY 6:00 PM EXECUTIVE DIGEST</span>
              <span className="text-blue-600 font-semibold">Sent to Management</span>
            </div>
            <p className="mt-1 text-[13.5px] text-[#0b0e0d]">
              📊 <strong>Today’s Operations:</strong> 18 of 18 jobs finished on time (100% SLA). Average turnaround: 3.2 hrs.
            </p>
          </div>
        )}
      </div>
    ),
  },
};

function DemoContent() {
  const searchParams = useSearchParams();
  const initialWorkflow = searchParams.get("workflow") || "lead-crm";
  const [activeTaskId, setActiveTaskId] = useState<string>(
    tasks[initialWorkflow] ? initialWorkflow : "lead-crm"
  );
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const activeTask = tasks[activeTaskId] || tasks["lead-crm"];

  const stopSimulation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  };

  const startSimulation = () => {
    stopSimulation();
    setCurrentStep(0);
    setIsRunning(true);

    let stepCounter = 0;
    intervalRef.current = setInterval(() => {
      stepCounter += 1;
      if (stepCounter < activeTask.steps.length) {
        setCurrentStep(stepCounter);
      } else {
        stopSimulation();
      }
    }, 1400);
  };

  const resetSimulation = () => {
    stopSimulation();
    setCurrentStep(0);
  };

  useEffect(() => {
    resetSimulation();
  }, [activeTaskId]);

  useEffect(() => {
    return () => stopSimulation();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-20 pb-12 bg-[#fafaf9]">
        {/* Header Hero */}
        <section className="mx-auto max-w-7xl px-4 pt-6 pb-4 md:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2563eb]/20 bg-[#eff6ff] px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#1d4ed8]">
            <Zap className="h-3.5 w-3.5 text-[#2563eb]" /> Interactive Workflow Lab
          </span>
          <h1 className="mt-2.5 text-2xl font-semibold tracking-tight text-[#0b0e0d] sm:text-3xl md:text-4xl">
            See Workflows Execute in Real Time
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-[14.5px] leading-relaxed text-[#0b0e0d]/65">
            Select any business task below and run the simulation to see how raw manual work turns into smooth, automated systems around your existing tools.
          </p>

          {/* Task Selectors */}
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4" role="tablist">
            {Object.values(tasks).map((t) => {
              const selected = t.id === activeTaskId;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTaskId(t.id)}
                  role="tab"
                  aria-selected={selected}
                  className={cn(
                    "btn-press flex flex-col items-start rounded-2xl border p-3 sm:p-3.5 text-left transition-all",
                    selected
                      ? "border-[#2563eb] bg-white shadow-md ring-1 ring-[#2563eb]"
                      : "border-[#0b0e0d]/10 bg-white/70 hover:bg-white hover:border-[#0b0e0d]/25 card-shadow"
                  )}
                >
                  <span className={cn("font-mono text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.14em]", selected ? "text-[#2563eb]" : "text-[#0b0e0d]/45")}>
                    {t.badge}
                  </span>
                  <span className="mt-1 text-[13.5px] sm:text-[14.5px] font-semibold text-[#0b0e0d]">
                    {t.name}
                  </span>
                  <span className="mt-1 text-[11px] sm:text-[11.5px] text-[#0b0e0d]/60 leading-snug line-clamp-2">
                    {t.tagline}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Live Interactive Simulation Sandbox */}
        <section className="mx-auto max-w-7xl px-4 mt-5 md:px-8">
          <div className="rounded-[1.5rem] border border-[#0b0e0d]/10 bg-white p-5 card-shadow md:p-8">
            {/* Task Banner */}
            <div className="flex flex-col gap-3 border-b border-[#0b0e0d]/8 pb-4 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#2563eb] font-semibold">
                  Active Workflow Simulation
                </span>
                <h2 className="mt-0.5 text-xl font-bold tracking-tight text-[#0b0e0d] md:text-2xl">
                  {activeTask.name}
                </h2>
                <p className="mt-0.5 text-[13.5px] text-[#0b0e0d]/65">{activeTask.tagline}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#eff6ff] border border-[#2563eb]/20 px-3 py-1 font-mono text-[11.5px] font-semibold text-[#1d4ed8]">
                  {activeTask.metric}
                </span>
              </div>
            </div>

            {/* Simulation Body */}
            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
              {/* Left Column: Pipeline Steps & Controls */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-[14px] font-mono uppercase tracking-[0.16em] text-[#0b0e0d]/45 font-semibold">
                    Workflow Sequence
                  </h3>
                  <ol className="mt-4 space-y-3">
                    {activeTask.steps.map((s, idx) => {
                      const isPast = idx < currentStep;
                      const isCurrent = idx === currentStep;
                      return (
                        <li
                          key={s.title}
                          className={cn(
                            "flex items-start gap-3 rounded-xl border p-3.5 transition-all",
                            isCurrent
                              ? "border-[#2563eb] bg-[#eff6ff]/60 shadow-xs"
                              : isPast
                              ? "border-emerald-500/20 bg-emerald-50/30"
                              : "border-[#0b0e0d]/6 bg-[#fafaf9] opacity-70"
                          )}
                        >
                          <span
                            className={cn(
                              "grid h-6 w-6 shrink-0 place-items-center rounded-full font-mono text-[11px] font-bold",
                              isCurrent
                                ? "bg-[#2563eb] text-white animate-pulse"
                                : isPast
                                ? "bg-emerald-600 text-white"
                                : "bg-[#0b0e0d]/10 text-[#0b0e0d]/60"
                            )}
                          >
                            {isPast ? "✓" : idx + 1}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[14px] font-semibold text-[#0b0e0d]">
                                {s.title}
                              </span>
                              <span className="font-mono text-[10px] uppercase text-[#0b0e0d]/45 px-1.5 py-0.5 rounded bg-[#0b0e0d]/5">
                                {s.badge}
                              </span>
                            </div>
                            <p className="mt-0.5 text-[12.5px] leading-relaxed text-[#0b0e0d]/60">
                              {s.description}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>

                {/* Control Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 pt-2">
                  <button
                    onClick={startSimulation}
                    disabled={isRunning}
                    className="btn-press inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#2563eb] px-6 py-3.5 text-[14px] font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-60 shadow-sm sm:py-3"
                  >
                    <Play className="h-4 w-4" />
                    {isRunning ? "Simulating Workflow…" : currentStep > 0 ? "Replay Simulation" : "Run Workflow Demo"}
                  </button>
                  <button
                    onClick={resetSimulation}
                    className="btn-press inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[#0b0e0d]/15 bg-white px-5 py-3 text-[14px] font-medium text-[#0b0e0d] hover:border-[#0b0e0d]/35"
                  >
                    <RotateCcw className="h-4 w-4" /> Reset
                  </button>
                </div>

                {/* Supported Tools */}
                <div className="border-t border-[#0b0e0d]/8 pt-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#0b0e0d]/50">
                    Integrated Tools
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {activeTask.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-lg border border-[#0b0e0d]/10 bg-[#fafaf9] px-2.5 py-1 text-[12px] font-medium text-[#0b0e0d]/70"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Live Simulation View */}
              <div>
                <div className="flex items-center justify-between pb-3">
                  <span className="font-mono text-[12px] text-[#0b0e0d]/50 uppercase tracking-[0.16em]">
                    Live Visual Output
                  </span>
                  <span className="font-mono text-[11.5px] text-[#2563eb]">
                    Stage {currentStep + 1} of {activeTask.steps.length}
                  </span>
                </div>
                <div className="min-h-[420px] rounded-2xl border border-[#0b0e0d]/10 bg-white p-5 card-shadow">
                  {activeTask.renderOutput(currentStep)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA to Convert */}
        <section className="mx-auto max-w-7xl px-4 mt-16 md:px-8">
          <div className="overflow-hidden rounded-[1.75rem] bg-[#0b0e0d] p-6 text-white card-shadow-dark sm:p-8 md:p-12">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue-300">
                  Custom Build For Your Operations
                </span>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-4xl">
                  Want this exact workflow automated for your business?
                </h3>
                <p className="mt-2 max-w-2xl text-[14.5px] text-white/65 leading-relaxed">
                  Book a free 30-minute automation audit. We’ll map your real process, calculate exact savings, and build a tailored prototype without disrupting your daily tools.
                </p>
              </div>

              <div className="flex flex-col gap-2.5 w-full sm:w-auto sm:flex-row shrink-0">
                <a
                  href="/#contact"
                  className="btn-press group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#2563eb] px-6 py-3.5 text-[14.5px] font-semibold text-white hover:bg-[#1d4ed8] sm:py-3"
                >
                  Book Free Automation Audit
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href={getWhatsAppUrl("Hi Cogniv, I explored your demo lab and want to automate my workflows.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-white/20 px-5 py-3 text-[14px] font-medium text-white hover:bg-white/10"
                >
                  💬 Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default function DemoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fafaf9] grid place-items-center">Loading Demo Lab…</div>}>
      <DemoContent />
    </Suspense>
  );
}
