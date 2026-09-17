import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Automation Demos | Cogniv Solutions",
  description:
    "Test live, interactive simulations of Cogniv Solutions' business automation systems: WhatsApp chatbots, CRM lead routing, invoice OCR data extraction, and operations sync.",
  alternates: {
    canonical: "/demo",
  },
  openGraph: {
    title: "Interactive Automation Demos | Cogniv Solutions",
    description:
      "Test live, interactive simulations of Cogniv Solutions' business automation systems: WhatsApp chatbots, CRM lead routing, invoice OCR data extraction, and operations sync.",
    url: "https://cognivsolutions.in/demo",
    siteName: "Cogniv Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive Automation Demos | Cogniv Solutions",
    description:
      "Test live, interactive simulations of Cogniv Solutions' business automation systems: WhatsApp chatbots, CRM lead routing, invoice OCR data extraction, and operations sync.",
  },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
