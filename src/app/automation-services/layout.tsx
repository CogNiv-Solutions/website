import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Automation Services | AI & Workflow Automation Agency India",
  description:
    "End-to-end business automation services in India by Cogniv Solutions. We build custom WhatsApp automation services, CRM pipelines, document OCR, and ERP integrations.",
  alternates: {
    canonical: "/automation-services",
  },
  openGraph: {
    title: "Business Automation Services | AI & Workflow Automation Agency India",
    description:
      "End-to-end business automation services in India by Cogniv Solutions. We build custom WhatsApp automation services, CRM pipelines, document OCR, and ERP integrations.",
    url: "https://cognivsolutions.in/automation-services",
    siteName: "Cogniv Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Automation Services | AI & Workflow Automation Agency India",
    description:
      "End-to-end business automation services in India by Cogniv Solutions. We build custom WhatsApp automation services, CRM pipelines, document OCR, and ERP integrations.",
  },
};

export default function AutomationServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
