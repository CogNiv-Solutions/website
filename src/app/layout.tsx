import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SITE } from "@/lib/utils";
import { generateSeoJsonLd } from "@/lib/seo-schema";
import { WhatsAppFloat } from "@/components/whatsapp-float";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["italic", "normal"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Cogniv Solutions | Business Automation",
    template: "%s | Cogniv Solutions",
  },
  description:
    "Cogniv Solutions automates repetitive business work — WhatsApp enquiries, lead follow-ups, data entry, and reporting — around the tools you already use.",
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
    "workflow automation",
    "WhatsApp business automation",
    "lead follow-up automation",
    "data entry automation",
    "Tally Excel automation",
    "small business automation India",
    "automation services",
    "business automation services",
    "automation services India",
    "workflow automation services",
    "process automation services",
    "Cogniv Solutions",
    "Cogniv",
    "business process automation India",
    "WhatsApp automation services",
    "WhatsApp CRM integration",
    "lead automation CRM",
    "custom business software",
    "Tally automation services",
    "automation audit",
    "small business automation tools",
    "B2B workflow automation",
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
      "x-default": "https://cognivsolutions.in",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: "Cogniv Solutions",
    title: "Cogniv Solutions | Business Automation",
    description:
      "We automate the work your team repeats every day — from WhatsApp enquiries and follow-ups to data entry and reporting.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Cogniv Solutions - Business Automation",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cogniv Solutions | Business Automation",
    description:
      "We automate the work your team repeats every day — from WhatsApp enquiries and follow-ups to data entry and reporting.",
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

// Escape '<' to prevent HTML parser breakout in embedded JSON-LD scripts
const safeJsonLd = JSON.stringify(generateSeoJsonLd()).replace(/</g, "\\u003c");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f4f5f5] text-[#0b0b0c]">
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

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  width: "device-width",
  initialScale: 1,
};
