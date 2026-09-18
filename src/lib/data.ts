export type Transformation = {
  id: string;
  manual: string;
  manualDetail: string;
  auto: string;
  autoDetail: string;
};

export const transformations: Transformation[] = [
  {
    id: "whatsapp",
    manual: "WhatsApp enquiry arrives",
    manualDetail: "Someone reads it, replies late, forgets to log it.",
    auto: "Lead captured automatically",
    autoDetail: "Understood, logged, assigned — reply sent in minutes.",
  },
  {
    id: "excel",
    manual: "Excel copy-paste between files",
    manualDetail: "Same data typed into sheets, Tally, and reports.",
    auto: "Data synchronised",
    autoDetail: "Entered once, reflected everywhere it belongs.",
  },
  {
    id: "followup",
    manual: "Follow-up depends on memory",
    manualDetail: "Interested customers go cold waiting for a call back.",
    auto: "Follow-up scheduled",
    autoDetail: "Every open lead gets a timed next step. Nothing slips.",
  },
];

export type Problem = { title: string; text: string };

export const problems: Problem[] = [
  {
    title: "Lost leads",
    text: "Enquiries arrive, but nobody follows up in time.",
  },
  {
    title: "Repetitive data entry",
    text: "Your team types the same information again and again.",
  },
  {
    title: "Follow-up gaps",
    text: "Interested customers go cold because follow-ups are manual.",
  },
  {
    title: "Scattered reporting",
    text: "Important information lives across different tools.",
  },
];

export type SolutionCategory = {
  id: string;
  index: string;
  title: string;
  summary: string;
  items: string[];
  outcome: string;
};

export const solutionCategories: SolutionCategory[] = [
  {
    id: "leads",
    index: "01",
    title: "Customer & lead automation",
    summary: "Every enquiry answered, logged, and followed up.",
    items: ["WhatsApp enquiries", "Lead capture", "CRM updates", "Follow-ups"],
    outcome: "No enquiry waits, no lead goes missing.",
  },
  {
    id: "data",
    index: "02",
    title: "Data & document automation",
    summary: "Information entered once, available everywhere.",
    items: ["Invoices", "Documents", "Excel & Sheets", "Tally entries"],
    outcome: "No re-typing, no version confusion.",
  },
  {
    id: "operations",
    index: "03",
    title: "Operations automation",
    summary: "Internal work moves without chasing people.",
    items: ["Task routing", "Approvals", "Notifications", "Reports"],
    outcome: "Status is visible without asking around.",
  },
  {
    id: "custom",
    index: "04",
    title: "Custom automation",
    summary: "For workflows no off-the-shelf tool covers.",
    items: ["Complex workflows", "Integrations", "Internal tools", "Business-specific systems"],
    outcome: "Built around how you already work.",
  },
];

export type Demo = {
  id: string;
  title: string;
  context: string;
  problem: string;
  trigger: string;
  automation: string;
  result: string;
  steps: { label: string; title: string; detail: string }[];
};

export const demos: Demo[] = [
  {
    id: "whatsapp-lead",
    title: "WhatsApp lead automation",
    context: "Real estate enquiry · sample data",
    problem: "Enquiries sit unread; replies take hours.",
    trigger: "Customer sends a WhatsApp message.",
    automation: "Message understood, lead created, reply sent.",
    result: "Qualified lead assigned with a scheduled follow-up.",
    steps: [
      { label: "Trigger", title: "WhatsApp enquiry arrives", detail: "“2 BHK chahiye, budget 60 lakh ke around, Baner ya Wakad.”" },
      { label: "Understand", title: "Intent captured", detail: "2 BHK · ₹60 L · Baner, Wakad — logged without typing." },
      { label: "Record", title: "Lead created & assigned", detail: "One record: source, priority, owner, next step." },
      { label: "Act", title: "Reply + follow-up scheduled", detail: "Options sent; reminder set if there is no reply." },
    ],
  },
  {
    id: "invoice-data",
    title: "Invoice → data",
    context: "Distribution billing · sample data",
    problem: "Invoices re-typed into Tally and Excel.",
    trigger: "Vendor invoice arrives as photo or PDF.",
    automation: "Key fields read once, checked, synced.",
    result: "Draft entry ready for approval — no re-typing.",
    steps: [
      { label: "Trigger", title: "Invoice photo received", detail: "A supplier bill arrives on WhatsApp or email." },
      { label: "Read", title: "Key fields extracted", detail: "Seller, items, amounts, tax — pulled into a draft." },
      { label: "Check", title: "Totals validated", detail: "Mismatches flagged for a human before posting." },
      { label: "Sync", title: "Draft synced to your system", detail: "Ready in Tally / sheets for one-click approval." },
    ],
  },
  {
    id: "lead-crm",
    title: "Lead → CRM",
    context: "Multi-channel capture · sample data",
    problem: "Leads scattered across inboxes and sheets.",
    trigger: "Enquiry from website, portal, or call.",
    automation: "Deduped, qualified, routed to the right owner.",
    result: "One pipeline — every lead has an owner and next step.",
    steps: [
      { label: "Trigger", title: "Enquiry arrives", detail: "Website form, portal, or phone — any channel." },
      { label: "Dedupe", title: "Checked against existing leads", detail: "No duplicates, no double-calling the same person." },
      { label: "Route", title: "Qualified & assigned", detail: "Budget, timeline, and fit decide the owner." },
      { label: "Track", title: "Pipeline stays current", detail: "Status, owner, and next step in one place." },
    ],
  },
  {
    id: "followup",
    title: "Follow-up automation",
    context: "Post-enquiry nurture · sample data",
    problem: "Warm leads go cold waiting for a call back.",
    trigger: "No reply within the agreed window.",
    automation: "Timed reminders and check-ins go out.",
    result: "Every open lead gets a next step — automatically.",
    steps: [
      { label: "Trigger", title: "Silence window passes", detail: "24 hours with no reply after the first response." },
      { label: "Nudge", title: "Polite check-in sent", detail: "Short message with the pending options attached." },
      { label: "Escalate", title: "Owner notified if still silent", detail: "A human steps in only where it matters." },
      { label: "Close", title: "Outcome logged", detail: "Interested, revisit later, or closed — recorded." },
    ],
  },
  {
    id: "operations",
    title: "Internal operations",
    context: "Daily reporting · sample data",
    problem: "Status asked on calls; reports built by hand.",
    trigger: "Day ends — tasks, sales, or jobs close out.",
    automation: "Activity collected into one summary.",
    result: "A short daily report, without evening overtime.",
    steps: [
      { label: "Trigger", title: "Work items close", detail: "Orders, jobs, or tickets marked done." },
      { label: "Collect", title: "Activity gathered", detail: "Counts, exceptions, and pending items pulled together." },
      { label: "Summarise", title: "Summary prepared", detail: "Done, pending, and blocked — in plain language." },
      { label: "Send", title: "Delivered to the team", detail: "WhatsApp or email at the hour you choose." },
    ],
  },
];

export type ProcessStep = {
  n: string;
  title: string;
  text: string;
  short: string;
  time: string;
};

export const processSteps: ProcessStep[] = [
  { n: "01", title: "Understand", text: "We learn how your team actually works.", short: "How your team actually works.", time: "Week 0" },
  { n: "02", title: "Find", text: "We identify the repetitive bottlenecks worth fixing first.", short: "Where repetitive work slows things down.", time: "Week 1" },
  { n: "03", title: "Build", text: "We create one working automation with your real data.", short: "A working automation around the workflow.", time: "Week 2–3" },
  { n: "04", title: "Integrate", text: "We connect it to the tools you already use.", short: "Connected to the tools you already use.", time: "Week 4+" },
  { n: "05", title: "Improve", text: "We measure, tighten edge cases, and extend.", short: "Monitored, refined, expanded when useful.", time: "Ongoing" },
];

export type Industry = {
  id: string;
  name: string;
  blurb: string;
  example: string;
  manual: string[];
  automate: string[];
  benefit: string;
};

export const industries: Industry[] = [
  {
    id: "real-estate",
    name: "Real Estate",
    blurb: "Enquiry qualification, matching, and follow-ups.",
    example: "WhatsApp enquiry → qualification → site-visit follow-up",
    manual: ["Leads in multiple inboxes", "Manual qualification calls", "Follow-ups depend on memory"],
    automate: ["Lead capture → qualify → property match", "Scheduled follow-ups", "Site-visit pipeline"],
    benefit: "Every enquiry answered in minutes and tracked to site visit.",
  },
  {
    id: "distributors",
    name: "Distribution",
    blurb: "Order intake, stock checks, and dispatch updates.",
    example: "Order message → processing → dispatch update",
    manual: ["Orders on phone / WhatsApp", "Stock checked manually", "Invoices re-entered in Tally / Excel"],
    automate: ["Order intake → stock check → invoice draft", "Low-stock alerts", "Dispatch updates"],
    benefit: "Fewer order errors and faster dispatch.",
  },
  {
    id: "education",
    name: "Education",
    blurb: "Admission queries, reminders, and batch updates.",
    example: "Enquiry → follow-up → admissions workflow",
    manual: ["Admission queries one-by-one", "Fee reminders by hand", "Attendance in registers"],
    automate: ["Counselling triage", "Fee & batch reminders", "Parent / student updates"],
    benefit: "Counsellors spend time advising, not copy-pasting replies.",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    blurb: "Job tracking, checklists, and output summaries.",
    example: "Job card → tracking → daily summary",
    manual: ["Job cards on paper", "Material tracking in Excel", "Status asked on calls"],
    automate: ["Job tracking", "Material & QC checklists", "Daily output summary"],
    benefit: "Shop-floor status visible without chasing supervisors.",
  },
  {
    id: "logistics",
    name: "Logistics",
    blurb: "Bookings, tracking, and proof-of-delivery.",
    example: "Booking → assignment → delivery confirmation",
    manual: ["Bookings over calls", "PODs on WhatsApp", "Billing reconciled monthly"],
    automate: ["Booking → assign → track", "POD collection", "Exception alerts"],
    benefit: "Fewer where-is-my-truck calls and cleaner billing.",
  },
  {
    id: "services",
    name: "Professional Services",
    blurb: "Intake, task tracking, and billing triggers.",
    example: "Brief → tasks → invoice trigger",
    manual: ["Briefs scattered in email", "Timesheets delayed", "Invoices follow weeks later"],
    automate: ["Intake → task creation", "Time & milestone capture", "Invoice triggers"],
    benefit: "Work, time, and billing stay linked from day one.",
  },
];

export const principles = [
  {
    n: "01",
    title: "Workflow first",
    text: "We map how work actually moves before recommending any technology.",
  },
  {
    n: "02",
    title: "Built around your business",
    text: "We work with the tools and routines your team already uses.",
  },
  {
    n: "03",
    title: "AI where it helps",
    text: "We use AI only where it genuinely removes work or prevents loss.",
  },
  {
    n: "04",
    title: "Measurable outcomes",
    text: "Time saved, faster response, less rework — tracked in plain numbers.",
  },
];

export const tools = [
  { name: "WhatsApp", note: "Business API" },
  { name: "Excel", note: "Spreadsheets" },
  { name: "Google Sheets", note: "Shared sheets" },
  { name: "Tally", note: "Accounting" },
  { name: "Zoho", note: "CRM & Books" },
  { name: "HubSpot", note: "CRM" },
  { name: "Gmail", note: "Email" },
  { name: "Slack", note: "Team alerts" },
];

export type PricingTier = {
  id: string;
  name: string;
  price: string;
  blurb: string;
  points: string[];
  featured?: boolean;
};export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: "₹2,999+",
    blurb: "One simple workflow, automated end to end.",
    points: ["Single workflow automation", "Form → sheet / email flow", "Basic notifications & setup"],
  },
  {
    id: "business",
    name: "Business",
    price: "₹7,999+",
    blurb: "WhatsApp, leads, and CRM connected with follow-ups.",
    points: ["Lead capture & CRM sync", "WhatsApp workflows", "Automated follow-ups & dashboard"],
    featured: true,
  },
  {
    id: "ai",
    name: "AI-assisted",
    price: "₹14,999+",
    blurb: "AI-assisted replies, qualification, and documents.",
    points: ["AI replies & qualification", "Document reading & extraction", "Usage-aware integrations"],
  },
  {
    id: "custom",
    name: "Custom",
    price: "₹24,999+",
    blurb: "Multi-system automation built around your operation.",
    points: ["Custom workflows & software", "Multiple integrations", "Multi-team rollout & support"],
  },
];

export const automationInterests = [
  "Lead Management",
  "WhatsApp",
  "Data Entry",
  "Documents",
  "Follow-ups",
  "Internal Operations",
  "Website Development",
  "Other",
];

export const websiteService = {
  id: "website",
  title: "Website Development",
  summary: "Websites built around your business.",
  text: "From simple business websites to more customized experiences — clear, responsive, and designed around what your customers need to do.",
  uses: [
    "Business websites",
    "Landing pages",
    "Portfolio & company sites",
    "Service websites",
    "Custom experiences",
    "Workflow-connected sites",
  ],
  price: "₹2,000–₹3,000",
  priceNote:
    "Website projects start from ₹2,000–₹3,000. Final pricing depends on the type and scope of the website.",
};

export const websiteAutomationCombo = {
  id: "website-automation",
  title: "Website + Automation",
  summary: "Your website can do more than just look good.",
  text: "Connect your site to the workflows behind it — lead capture, WhatsApp, CRM, follow-ups, forms, and data handling.",
  price: "₹7,999+",
  priceNote:
    "Websites with workflow automation start from ₹7,999+, depending on the automation and integrations required.",
};

export const navLinks = [
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Demos", href: "/demos" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
];

export type FaqItem = { question: string; answer: string };

export const FAQS: FaqItem[] = [
  {
    question: "What is the Free Workflow Audit?",
    answer:
      "A focused 30-minute review of one core workflow. You leave with a map of what to automate first — whether or not we build it.",
  },
  {
    question: "Can we start with just one workflow?",
    answer:
      "Yes. Most engagements start with a single bottleneck. We expand only once the first automation holds up in daily use.",
  },
  {
    question: "Do we need to replace our existing software?",
    answer:
      "No. We build around WhatsApp, Excel, Sheets, Tally, and your CRM. You keep what works; we connect it.",
  },
  {
    question: "Will you need access to our customer data?",
    answer:
      "Only the minimum needed for the workflow in scope, with role-based access. We never use your data to train public models.",
  },
  {
    question: "Who owns the automation after delivery?",
    answer:
      "You do. Workflows, credentials, and documentation are handed over, and your team is shown how to operate them.",
  },
  {
    question: "What happens if an automation fails?",
    answer:
      "Failures pause with a clear reason and alert the right person — work falls back to a defined manual step, never silently.",
  },
  {
    question: "Are third-party software or API costs included?",
    answer:
      "No. Services like WhatsApp Business, AI APIs, or hosting bill separately. We flag these costs during the audit.",
  },
  {
    question: "What happens after the automation is delivered?",
    answer:
      "We monitor the first weeks closely, fix edge cases, and offer ongoing maintenance. You choose whether to extend to the next workflow.",
  },
];
