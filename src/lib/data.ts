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
  number: string;
  title: string;
  short: string;
  flow: string[];
  points: string[];
  detail?: string;
};

export const solutions: Solution[] = [
  {
    id: "lead-crm",
    icon: Users,
    number: "01",
    title: "Lead & CRM Automation",
    short: "Capture, qualify, assign and follow up automatically without spreadsheet leakage.",
    flow: ["WhatsApp / Website", "Lead Qualification", "CRM Entry", "Follow-up"],
    points: ["Instant enquiry capture", "Auto-qualification & scoring", "Timed follow-up reminders"],
  },
  {
    id: "whatsapp",
    icon: MessageCircle,
    number: "02",
    title: "WhatsApp Automation",
    short: "Turn incoming customer conversations into structured work with smart human handoff.",
    flow: ["Customer Message", "AI Response", "Lead Capture", "Human Handoff"],
    points: ["24/7 instant replies", "Order & enquiry triage", "Clean team routing"],
  },
  {
    id: "documents",
    icon: FileStack,
    number: "03",
    title: "Document & Data Automation",
    short: "Extract data from quotations, invoices and sheets directly into your core database.",
    flow: ["Document / PO", "Data Extraction", "Validation", "Database / Tally"],
    points: ["Zero manual re-typing", "Format standardization", "Direct ERP / Sheet sync"],
  },
  {
    id: "internal-ops",
    icon: Workflow,
    number: "04",
    title: "Internal Operations Automation",
    short: "Connect assignments, status tracking and daily reporting so nothing drops.",
    flow: ["Task Trigger", "Assignment", "Tracking", "Reminder", "Reporting"],
    points: ["Automated task routing", "Cross-tool sync", "Scheduled progress summaries"],
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
    title: "Audit",
    text: "Understand the business and identify repetitive processes.",
    time: "Phase 1",
  },
  {
    n: "02",
    title: "Workflow Mapping",
    text: "Identify where automation can be introduced.",
    time: "Phase 2",
  },
  {
    n: "03",
    title: "Prototype",
    text: "Design and test the proposed workflow.",
    time: "Phase 3",
  },
  {
    n: "04",
    title: "Implementation",
    text: "Integrate the workflow into the business.",
    time: "Phase 4",
  },
  {
    n: "05",
    title: "Optimization",
    text: "Measure performance and improve the system.",
    time: "Phase 5",
  },
];

export const navLinks = [
  { label: "Services", href: "/automation-services" },
  { label: "AI Solutions", href: "/ai-solutions" },
  { label: "Interactive Demos", href: "/demo" },
  { label: "About Us", href: "/about" },
  { label: "Pricing & ROI", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

