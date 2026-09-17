import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SITE } from "@/lib/utils";
import { generateSeoJsonLd } from "@/lib/seo-schema";
import { WhatsAppFloat } from "@/components/whatsapp-float";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Cogniv Solutions | AI & Business Automation Services India",
    template: "%s | Cogniv Solutions — Automation Services",
  },
  description:
    "Cogniv Solutions delivers bespoke AI and business automation services in India. We eliminate operational bottlenecks across WhatsApp, CRMs, ERPs, and spreadsheets to save 20+ hours weekly.",
  applicationName: "Cogniv Solutions",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Cogniv Solutions",
    statusBarStyle: "black-translucent",
  },
  keywords: [
    "automation services",
    "business automation services",
    "AI automation services",
    "automation services India",
    "workflow automation services",
    "process automation services",
    "Cogniv Solutions",
    "Cogniv",
    "business automation",
    "AI automation agency",
    "business process automation India",
    "workflow automation agency",
    "WhatsApp automation services",
    "WhatsApp business automation",
    "WhatsApp CRM integration",
    "lead qualification automation",
    "lead automation CRM",
    "AI agents for business",
    "custom business software",
    "Tally automation services",
    "Tally invoice automation",
    "document data extraction OCR",
    "invoice OCR AI",
    "automation audit",
    "free business automation audit",
    "operational efficiency AI",
    "enterprise workflow integration",
    "small business automation tools",
    "B2B workflow automation",
    "order dispatch automation",
    "operations automation Indore",
    "business software developers India",
  ],
  other: {
    "geo.region": "IN-MP",
    "geo.placename": "Indore, India",
    "revisit-after": "2 days",
    "rating": "General",
  },
  authors: [{ name: "Cogniv Solutions", url: SITE.url }],
  creator: "Cogniv Solutions",
  publisher: "Cogniv Solutions",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "https://cognivsolutions.in",
      "en-US": "https://cognivsolutions.in",
      "x-default": "https://cognivsolutions.in",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: "Cogniv Solutions",
    title: "Cogniv Solutions | Business Automation & AI Systems for Growing Companies",
    description:
      "Turn repetitive manual work into intelligent, scalable automated systems. Streamline WhatsApp, leads, documents, and operations.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Cogniv Solutions - Business Automation & AI Systems",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cogniv Solutions | Business Automation & AI Systems",
    description:
      "Turn repetitive manual work into intelligent, scalable automated systems. Streamline WhatsApp, leads, documents, and operations.",
    images: ["/opengraph-image.png"],
    creator: "@cognivsolutions",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0b0e0d",
  width: "device-width",
  initialScale: 1,
};

// Escape '<' to prevent HTML parser breakout in embedded JSON-LD scripts
const safeJsonLd = JSON.stringify(generateSeoJsonLd()).replace(/</g, "\\u003c");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#fafaf9] text-[#0b0e0d]">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <script
          id="seo-json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd }}
        />
        <SmoothScroll>{children}</SmoothScroll>
        <WhatsAppFloat />
      </body>
    </html>
  );
}
