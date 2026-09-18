import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Automation Audit | Cogniv Solutions",
  description:
    "Book a free 30-minute operational automation audit with Cogniv Solutions. We analyze your team's repetitive tasks and deliver a customized 14-day ROI roadmap.",
  alternates: {
    canonical: "/audit",
  },
  openGraph: {
    title: "Free Automation Audit | Cogniv Solutions",
    description:
      "Book a free 30-minute operational automation audit with Cogniv Solutions. We analyze your team's repetitive tasks and deliver a customized 14-day ROI roadmap.",
    url: "https://cognivsolutions.in/audit",
    siteName: "Cogniv Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Automation Audit | Cogniv Solutions",
    description:
      "Book a free 30-minute operational automation audit with Cogniv Solutions. We analyze your team's repetitive tasks and deliver a customized 14-day ROI roadmap.",
  },
};

export default function AuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
