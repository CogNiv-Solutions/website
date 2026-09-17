import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Cogniv Solutions — AI & Workflow Automation",
  description:
    "Learn about Cogniv Solutions: our mission to automate repetitive business work, our workflow-first engineering philosophy, and how we differ from bloated SaaS platforms and generic software agencies.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | Cogniv Solutions — AI & Workflow Automation",
    description:
      "Learn about Cogniv Solutions: our mission to automate repetitive business work, our workflow-first engineering philosophy, and how we differ from bloated SaaS platforms and generic software agencies.",
    url: "https://cognivsolutions.in/about",
    siteName: "Cogniv Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Cogniv Solutions — AI & Workflow Automation",
    description:
      "Learn about Cogniv Solutions: our mission to automate repetitive business work, our workflow-first engineering philosophy, and how we differ from bloated SaaS platforms and generic software agencies.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
