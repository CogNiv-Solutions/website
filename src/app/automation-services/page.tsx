"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import {
  ArrowRight,
  MessageCircle,
  Users,
  FileStack,
  Workflow,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Play,
  Database,
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  Clock,
  TrendingUp,
} from "lucide-react";
import { getWhatsAppUrl } from "@/lib/utils";

const servicesList = [
  {
    id: "whatsapp-automation-services",
    number: "01",
    name: "WhatsApp Automation Services",
    subtitle: "Conversational AI, 24/7 Enquiry Handling & Customer Triage",
    desc: "Our WhatsApp automation services enable your business to respond to inquiries instantly, qualify customer intent, share catalogs, and collect orders around the clock without manual intervention.",
    deliverables: [
      "Official Meta WhatsApp Cloud API integration",
      "Automated lead capture and qualification",
      "Instant quote drafts and payment link delivery",
      "Smart human agent handoff when needed",
    ],
    tools: ["WhatsApp Cloud API", "Make", "n8n", "PostgreSQL"],
  },
  {
    id: "lead-crm-automation-services",
    number: "02",
    name: "Lead & CRM Automation Services",
    subtitle: "Zero-Leakage Sales Pipelines & Multi-Channel Routing",
    desc: "We engineer lead automation services that connect your marketing campaigns (Meta Ads, Google, website forms) directly into your CRM with automated lead scoring and scheduled follow-ups.",
    deliverables: [
      "Enquiry capture across ads, landing pages, and chat",
      "Intelligent budget and timeline scoring",
      "Instant deal creation in Zoho, HubSpot, or Sheets",
      "Automated WhatsApp and email nurturing sequences",
    ],
    tools: ["HubSpot", "Zoho CRM", "Google Sheets", "Twilio"],
  },
  {
    id: "document-invoice-automation-services",
    number: "03",
    name: "Document & Invoice OCR Services",
    subtitle: "Automated Data Extraction & Accounting Reconciliation",
    desc: "Our document automation services use advanced vision models to extract line items, taxes, and customer details from PDFs, paper bills, and purchase orders directly into your accounting software.",
    deliverables: [
      "99.4% field accuracy on multi-page invoices",
      "Automatic GSTIN verification and math checks",
      "Direct XML/API integration into Tally ERP & Excel",
      "Human-in-the-loop exception review dashboard",
    ],
    tools: ["Vision OCR", "Tally ERP 9 / Prime", "Excel", "AWS Textract"],
  },
  {
    id: "operations-workflow-automation-services",
    number: "04",
    name: "Operations & Workflow Automation Services",
    subtitle: "Cross-Tool Synchronization & Task Dispatch",
    desc: "Unify your operational workflows. We automate assignment dispatch, track job card statuses across factory or field teams, and deliver scheduled performance summaries to leadership.",
    deliverables: [
      "Automated task creation and assignment",
      "Cross-platform data sync between Slack, Sheets, and ERP",
      "Proactive escalation alerts for overdue tasks",
      "Daily executive digests sent straight to WhatsApp",
    ],
    tools: ["Slack", "Google Workspace", "PostgreSQL", "Zapier"],
  },
  {
    id: "tally-erp-automation-services",
    number: "05",
    name: "Tally ERP & Accounting Automation Services",
    subtitle: "End-to-End Voucher Posting & Inventory Sync",
    desc: "Eliminate repetitive accounting data entry. We engineer automated bridges between e-commerce, WhatsApp orders, CRM deals, and Tally Prime for instant sales and purchase vouchers.",
    deliverables: [
      "Automated sales and purchase voucher generation",
      "Real-time inventory sync between warehouse and accounting",
      "Customer ledger balances sent via automated WhatsApp",
      "Bank statement reconciliation pipelines",
    ],
    tools: ["Tally Prime", "Tally ERP 9", "XML / TDL", "Excel"],
  },
  {
    id: "ai-agents-automation-services",
    number: "06",
    name: "Custom AI Agent Development Services",
    subtitle: "Autonomous Decision Engines & Multi-Step Reasoning",
    desc: "For complex operational challenges where static rules fall short, we build custom AI agents capable of reasoning, reading multi-source records, parsing complex emails, and taking approved actions.",
    deliverables: [
      "Role-specific enterprise AI agents",
      "Private knowledge base (RAG) over company SOPs",
      "Multi-step verification and error recovery",
      "Zero training on public AI models for strict data privacy",
    ],
    tools: ["OpenAI GPT-4o", "Claude 3.5 Sonnet", "LangChain", "Vector DBs"],
  },
];

const serviceFaqs = [
  {
    q: "What are business automation services?",
    a: "Business automation services involve analyzing repetitive manual tasks in your company (such as copying lead details, drafting invoices, sending reminders, or updating spreadsheets) and engineering automated software pipelines to perform these tasks with zero human delay or error.",
  },
  {
    q: "How much do business automation services cost in India?",
    a: "Cogniv Solutions begins with a Free 30-Minute Automation Audit. Ongoing automation services typically range from ₹25,000 to ₹60,000 per month or fixed milestone pricing depending on complexity. We focus strictly on positive ROI: every system must save at least 3x to 5x its cost in manual team hours or recovered revenue.",
  },
  {
    q: "Why hire an automation services agency instead of building in-house?",
    a: "Hiring full-time automation engineers requires recruitment costs, high monthly salaries (₹80,000–₹1,50,000+/month), and months of ramp-up time. An experienced agency like Cogniv Solutions deploys working prototypes in 14 days, brings pre-tested integrations for WhatsApp, Tally, and CRMs, and handles ongoing monitoring and edge cases.",
  },
  {
    q: "How long does it take to deploy our first automation service?",
    a: "Most Cogniv automation services go live with real data within 2 to 3 weeks. Comprehensive enterprise deployments with multiple system integrations take between 4 to 6 weeks.",
  },
];

export default function AutomationServicesPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="pt-24 pb-20 md:pt-32 md:pb-28">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] font-mono text-[#0b0e0d]/50">
            <Link href="/" className="hover:text-[#0b0e0d] transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#0b0e0d] font-medium">Automation Services</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20 md:mb-28">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ea580c]/20 bg-[#fff7ed] px-3.5 py-1 text-[12px] font-mono uppercase tracking-wider text-[#ea580c]">
              <Cpu className="h-3.5 w-3.5" />
              Full-Cycle Automation Agency India
            </div>
            <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-[#0b0e0d] sm:text-5xl md:text-6xl md:leading-[1.1]">
              AI & Business Automation Services for Growing Companies
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-[#0b0e0d]/70">
              Cogniv Solutions provides bespoke business automation services in India. We eliminate manual bottlenecks across WhatsApp, CRMs, Tally ERP, and spreadsheets — saving your team 20+ hours weekly and scaling your revenue capacity.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/audit"
                className="btn-press group inline-flex items-center gap-2 rounded-full bg-[#0b0e0d] px-6 py-3.5 text-[14.5px] font-semibold text-white hover:bg-[#1a201e]"
              >
                Book Free Automation Audit
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/demo"
                className="btn-press inline-flex items-center gap-2 rounded-full border border-[#0b0e0d]/15 bg-white px-6 py-3.5 text-[14.5px] font-medium text-[#0b0e0d] hover:bg-slate-50"
              >
                <Play className="h-3.5 w-3.5 fill-[#ea580c] text-[#ea580c]" />
                See Live Demos
              </Link>
            </div>
          </Reveal>
        </section>

        {/* 6 Core Automation Services Grid */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24 md:mb-32">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-[#ea580c]">
                Capabilities Catalog
              </span>
              <h2 className="mt-3 text-2xl sm:text-4xl font-semibold tracking-tight text-[#0b0e0d]">
                End-to-End Business Automation Services
              </h2>
              <p className="mt-4 text-[15px] sm:text-[16px] text-[#0b0e0d]/70">
                Custom engineered workflows designed around your existing systems, not generic software templates.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {servicesList.map((srv, idx) => (
              <Reveal key={srv.id} delay={0.08 * idx}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-[#0b0e0d]/10 bg-white p-7 transition-all duration-300 hover:border-[#ea580c]/40 hover:shadow-lg hover:shadow-[#ea580c]/5">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-sm font-semibold text-[#ea580c]">
                        {srv.number}
                      </span>
                      <span className="rounded-full bg-[#fff7ed] px-2.5 py-0.5 text-[11px] font-mono font-medium text-[#ea580c]">
                        Ready to Deploy
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-[#0b0e0d]">{srv.name}</h3>
                    <p className="mt-1 text-[12.5px] font-medium text-[#ea580c]">{srv.subtitle}</p>
                    <p className="mt-3 text-[14px] leading-relaxed text-[#0b0e0d]/70">{srv.desc}</p>

                    <div className="mt-5 space-y-2 border-t border-[#0b0e0d]/8 pt-4">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-[#0b0e0d]/50">
                        Deliverables
                      </p>
                      {srv.deliverables.map((d) => (
                        <div key={d} className="flex items-start gap-2 text-[13px] text-[#0b0e0d]/80">
                          <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[#ea580c]" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 border-t border-[#0b0e0d]/8 pt-4">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {srv.tools.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-[#fafaf9] px-2 py-0.5 font-mono text-[10.5px] text-[#0b0e0d]/60 border border-[#0b0e0d]/8"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link
                      href="/audit"
                      className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#ea580c] hover:underline"
                    >
                      Request Consultation <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Why Hire an Agency Section */}
        <section className="border-y border-[#0b0e0d]/10 bg-white py-16 md:py-24 mb-20 md:mb-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <Reveal>
                <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-[#ea580c]">
                  Strategic Advantage
                </span>
                <h2 className="mt-3 text-2xl sm:text-4xl font-semibold tracking-tight text-[#0b0e0d]">
                  Why partner with an automation services specialist?
                </h2>
                <div className="mt-6 space-y-4 text-[15px] sm:text-[16px] leading-relaxed text-[#0b0e0d]/75">
                  <p>
                    Most companies attempt automation in two ways: either they buy complex software subscriptions that nobody uses, or they assign internal staff to build messy spreadsheet macros that break constantly.
                  </p>
                  <p>
                    Cogniv Solutions operates as your dedicated automation engineering partner. We take full ownership of designing, building, testing, deploying, and maintaining your automation infrastructure.
                  </p>
                  <p>
                    The result? Predictable operational capacity, zero headcount expansion, and guaranteed data security.
                  </p>
                </div>
              </Reveal>

              <div className="space-y-4">
                <Reveal delay={0.1}>
                  <div className="rounded-2xl border border-[#0b0e0d]/10 bg-[#fafaf9] p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="h-5 w-5 text-[#ea580c]" />
                      <h3 className="font-semibold text-[#0b0e0d]">Speed to Production</h3>
                    </div>
                    <p className="text-[14px] text-[#0b0e0d]/70">
                      Working prototype live in 14 days with your actual real-world data and workflows.
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="rounded-2xl border border-[#0b0e0d]/10 bg-[#fafaf9] p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="h-5 w-5 text-[#ea580c]" />
                      <h3 className="font-semibold text-[#0b0e0d]">Strict ROI Guarantees</h3>
                    </div>
                    <p className="text-[14px] text-[#0b0e0d]/70">
                      If an automation service doesn't produce at least 3x to 5x return in hours or revenue, we don't build it.
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={0.3}>
                  <div className="rounded-2xl border border-[#0b0e0d]/10 bg-[#fafaf9] p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <ShieldCheck className="h-5 w-5 text-[#ea580c]" />
                      <h3 className="font-semibold text-[#0b0e0d]">Enterprise Data Privacy</h3>
                    </div>
                    <p className="text-[14px] text-[#0b0e0d]/70">
                      Your customer records and accounting ledgers are isolated, encrypted, and never fed to public models.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Automation Services FAQs */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20 md:mb-28">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-[#ea580c]">
                Answers
              </span>
              <h2 className="mt-3 text-2xl sm:text-4xl font-semibold tracking-tight text-[#0b0e0d]">
                Frequently Asked Questions About Automation Services
              </h2>
            </div>
          </Reveal>

          <div className="max-w-3xl mx-auto space-y-4">
            {serviceFaqs.map((faq, i) => (
              <Reveal key={faq.q} delay={0.08 * i}>
                <div className="rounded-2xl border border-[#0b0e0d]/10 bg-white p-6 sm:p-7 shadow-2xs">
                  <h3 className="text-base sm:text-lg font-semibold text-[#0b0e0d]">{faq.q}</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-[#0b0e0d]/70">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-3xl bg-[#0b0e0d] p-8 sm:p-12 md:p-16 text-white text-center">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                Get Started
              </span>
              <h2 className="mt-3 text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
                Evaluate your automation opportunities today.
              </h2>
              <p className="mt-4 max-w-xl mx-auto text-base sm:text-lg text-white/70">
                Claim a free 30-minute automation audit. We'll map your repetitive workflows and calculate how many hours you can save each week.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/audit"
                  className="btn-press group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[#0b0e0d] hover:bg-orange-50"
                >
                  Book Free Automation Audit
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <a
                  href={getWhatsAppUrl("Hi Cogniv, I'd like to ask about your business automation services.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-[15px] font-medium text-white hover:bg-white/10"
                >
                  <MessageCircle className="h-4 w-4 text-[#25d366]" />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
