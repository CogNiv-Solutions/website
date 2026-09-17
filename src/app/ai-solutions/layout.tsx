import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Solutions & Automation Systems | Cogniv Solutions",
  description:
    "Explore bespoke AI automation solutions by Cogniv Solutions: WhatsApp Business AI, CRM lead qualification pipelines, document and invoice OCR extraction, and cross-tool operations sync.",
  alternates: {
    canonical: "/ai-solutions",
  },
  openGraph: {
    title: "AI Solutions & Automation Systems | Cogniv Solutions",
    description:
      "Explore bespoke AI automation solutions by Cogniv Solutions: WhatsApp Business AI, CRM lead qualification pipelines, document and invoice OCR extraction, and cross-tool operations sync.",
    url: "https://cognivsolutions.in/ai-solutions",
    siteName: "Cogniv Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Solutions & Automation Systems | Cogniv Solutions",
    description:
      "Explore bespoke AI automation solutions by Cogniv Solutions: WhatsApp Business AI, CRM lead qualification pipelines, document and invoice OCR extraction, and cross-tool operations sync.",
  },
};

export default function AiSolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
