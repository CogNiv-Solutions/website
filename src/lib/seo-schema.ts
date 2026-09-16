import { SITE } from "./utils";
import { solutions } from "./data";

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "What is a Free Automation Audit and what do we receive?",
    answer:
      "A focused 30-minute review of one core operational workflow in your business. You leave with an actionable roadmap showing where your team is losing manual hours, which tasks can be automated immediately, and the expected ROI — whether or not you decide to work with us.",
  },
  {
    question: "Can Cogniv integrate with our existing tools like WhatsApp, Excel, and Tally?",
    answer:
      "Yes. We specialize in building around your real-world stack without forcing you to replace what already works. We routinely integrate WhatsApp Business API, Excel, Google Sheets, Tally ERP, custom CRMs, Slack, and cloud databases into seamless automated pipelines.",
  },
  {
    question: "How long does it take to deploy our first automation system?",
    answer:
      "Most projects follow a 2 to 3 week rollout for the first working prototype with real data. Full implementation, including custom edge-case handling, access control, and team onboarding, typically completes within 4 to 6 weeks with zero disruption to daily business.",
  },
  {
    question: "Do we need to hire technical engineers or developers to maintain this?",
    answer:
      "No. We build automated workflows designed for non-technical operations teams. Every system includes automated monitoring, alerting for edge cases, and human-in-the-loop review controls so your existing staff can operate it with total confidence.",
  },
  {
    question: "How do you guarantee our business data remains secure and confidential?",
    answer:
      "Security and privacy are core engineering priorities. We implement role-based access control, end-to-end data encryption in transit and at rest, and strict non-disclosure safeguards. Your proprietary business data is never used to train public AI models.",
  },
  {
    question: "What kind of return on investment (ROI) can our business expect?",
    answer:
      "Our clients typically reclaim 15 to 30+ hours of repetitive manual work per week per department, eliminate order-entry and data-transfer mistakes, and accelerate response times from hours to under two minutes, unlocking faster sales conversions and lower overhead.",
  },
];

/**
 * Builds the comprehensive Schema.org JSON-LD graph for Cogniv Solutions.
 */
export function generateSeoJsonLd() {
  const organizationSchema = {
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: "Cogniv",
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    image: `${SITE.url}/opengraph-image.png`,
    description: SITE.description,
    email: SITE.email,
    telephone: "+91-97529-90241",
    priceRange: "$$",
    currenciesAccepted: "INR, USD",
    paymentAccepted: "Bank Transfer, UPI, Credit Card",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    areaServed: [
      {
        "@type": "Country",
        name: "India",
      },
      {
        "@type": "AdministrativeArea",
        name: "Worldwide",
      },
    ],
    knowsAbout: [
      "Business Process Automation",
      "AI Workflow Automation",
      "WhatsApp Business API Integration",
      "CRM & Lead Management Systems",
      "Document Extraction & OCR",
      "Custom Enterprise Software",
      "Autonomous AI Agents",
    ],
    slogan: SITE.tagline,
  };

  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: {
      "@id": `${SITE.url}/#organization`,
    },
    inLanguage: "en-IN",
  };

  const serviceCatalogSchema = {
    "@type": "OfferCatalog",
    "@id": `${SITE.url}/#services`,
    name: "Cogniv Business Automation Services",
    itemListElement: solutions.map((solution, index) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        "@id": `${SITE.url}/#service-${solution.id}`,
        name: solution.title,
        description: solution.detail ? `${solution.short} ${solution.detail}` : `${solution.short} - ${solution.points.join(". ")}`,
        provider: {
          "@id": `${SITE.url}/#organization`,
        },
        serviceType: solution.title,
        areaServed: {
          "@type": "Country",
          name: "India",
        },
      },
      position: index + 1,
    })),
  };

  const faqSchema = {
    "@type": "FAQPage",
    "@id": `${SITE.url}/#faq`,
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${SITE.url}/#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Solutions",
        item: `${SITE.url}/#solutions`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Pricing & ROI",
        item: `${SITE.url}/#pricing`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Automation Audit",
        item: `${SITE.url}/#contact`,
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      websiteSchema,
      serviceCatalogSchema,
      faqSchema,
      breadcrumbSchema,
    ],
  };
}
