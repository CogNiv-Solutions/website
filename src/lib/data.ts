import {
  Workflow,
  MessageCircle,
  Users,
  FileStack,
  Blocks,
  Bot,
  type LucideIcon,
} from "lucide-react";

export type Solution = {
  id: string;
  icon: LucideIcon;
  title: string;
  short: string;
  detail: string;
  points: string[];
};

export const solutions: Solution[] = [
  {
    id: "workflow",
    icon: Workflow,
    title: "AI Workflow Automation",
    short: "Automate repetitive decisions and handoffs between tools.",
    detail:
      "We map the workflow as it actually runs, then connect AI, rules, APIs and your existing tools so work moves without manual chasing.",
    points: ["Approvals & routing", "Status updates", "Exception handling"],
  },
  {
    id: "whatsapp",
    icon: MessageCircle,
    title: "WhatsApp Business Automation",
    short: "Turn incoming chats into structured, trackable work.",
    detail:
      "Enquiries get understood, categorised and logged automatically — with instant replies for common questions and clean handoff when a human is needed.",
    points: ["Auto-replies", "Enquiry capture", "Human handoff"],
  },
  {
    id: "crm",
    icon: Users,
    title: "Lead & CRM Automation",
    short: "Capture, qualify, assign and follow up automatically.",
    detail:
      "Every lead is created once, scored, routed to the right person, and followed up on time — no spreadsheet, no missed call.",
    points: ["Capture & dedupe", "Qualify & score", "Assign & remind"],
  },
  {
    id: "documents",
    icon: FileStack,
    title: "Document & Data Automation",
    short: "Pull data out of documents and into your systems.",
    detail:
      "Quotations, invoices, forms and site reports get read once and moved where they belong — searchable, linked, and auditable.",
    points: ["Extraction", "Validation", "System sync"],
  },
  {
    id: "software",
    icon: Blocks,
    title: "Custom Business Software",
    short: "Internal tools built around how you actually work.",
    detail:
      "Where automation alone isn't enough, we build focused software — dashboards, portals, trackers — around the real workflow.",
    points: ["Internal tools", "Customer portals", "Operational dashboards"],
  },
  {
    id: "agents",
    icon: Bot,
    title: "AI Agents",
    short: "Defined tasks, done reliably, with oversight.",
    detail:
      "Scoped agents that perform specific business tasks — drafting follow-ups, summarising threads, preparing reports — with logs and limits.",
    points: ["Scoped tasks", "Review steps", "Full audit trail"],
  },
];

export type Industry = {
  id: string;
  name: string;
  manual: string[];
  automate: string[];
  benefit: string;
};

export const industries: Industry[] = [
  {
    id: "distributors",
    name: "Distributors & Wholesalers",
    manual: ["Orders on phone / WhatsApp", "Stock checked manually", "Invoices re-entered in Tally / Excel"],
    automate: ["Order intake → stock check → invoice draft", "Low-stock alerts", "Dispatch updates"],
    benefit: "Fewer order errors and faster dispatch without adding headcount.",
  },
  {
    id: "real-estate",
    name: "Real Estate",
    manual: ["Leads in multiple inboxes", "Manual qualification calls", "Follow-ups depend on memory"],
    automate: ["Lead capture → qualify → property match", "Scheduled follow-ups", "Site-visit pipeline"],
    benefit: "Every enquiry answered in minutes and tracked to site visit.",
  },
  {
    id: "education",
    name: "Coaching & Education",
    manual: ["Admission queries one-by-one", "Fee reminders by hand", "Attendance in registers"],
    automate: ["Counselling triage", "Fee & batch reminders", "Parent / student updates"],
    benefit: "Counsellors spend time closing, not copy-pasting replies.",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    manual: ["Job cards on paper", "Material tracking in Excel", "Status asked on calls"],
    automate: ["Job tracking", "Material & QC checklists", "Daily output summary"],
    benefit: "Shop-floor status visible without chasing supervisors.",
  },
  {
    id: "logistics",
    name: "Logistics",
    manual: ["Bookings over calls", "PODs on WhatsApp", "Billing reconciled monthly"],
    automate: ["Booking → assign → track", "POD collection", "Exception alerts"],
    benefit: "Fewer where-is-my-truck calls and cleaner billing.",
  },
  {
    id: "services",
    name: "Professional Services",
    manual: ["Briefs scattered in email", "Timesheets delayed", "Invoices follow weeks later"],
    automate: ["Intake → task creation", "Time & milestone capture", "Invoice triggers"],
    benefit: "Work, time and billing stay linked from day one.",
  },
];

export const discoverSteps = [
  {
    n: "01",
    title: "Discover",
    text: "We study how the business actually operates — not the SOP document, the real day-to-day.",
  },
  {
    n: "02",
    title: "Identify",
    text: "We find the repetitive, expensive and error-prone steps worth automating first.",
  },
  {
    n: "03",
    title: "Automate",
    text: "We connect AI, workflows, APIs and your existing systems to remove the manual work.",
  },
  {
    n: "04",
    title: "Build",
    text: "Where automation isn't enough, we build focused software around the workflow.",
  },
  {
    n: "05",
    title: "Measure",
    text: "We track time saved, response speed and error reduction — in plain numbers.",
  },
];

export const engagementSteps = [
  {
    n: "01",
    title: "Automation Audit",
    text: "A focused review of your tools, chats, sheets and daily routines to find automation candidates.",
    time: "Week 0",
  },
  {
    n: "02",
    title: "Workflow Mapping",
    text: "We document the current flow and the target flow — what changes, who approves, what connects.",
    time: "Week 1",
  },
  {
    n: "03",
    title: "Prototype",
    text: "One workflow, working end-to-end with your real data, so you can feel the difference early.",
    time: "Week 2–3",
  },
  {
    n: "04",
    title: "Implementation",
    text: "Rollout, integrations, access control and team training — without breaking daily operations.",
    time: "Week 4+",
  },
  {
    n: "05",
    title: "Optimization",
    text: "We monitor, tighten edge cases and extend to the next workflow once the first one holds.",
    time: "Ongoing",
  },
];

export const navLinks = [
  { label: "Solutions", href: "#solutions" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Industries", href: "#industries" },
  { label: "Demo", href: "#demo" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];
