import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SITE } from "@/lib/utils";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Cogniv Solutions | Business Automation & AI Systems",
    template: "%s | Cogniv Solutions",
  },
  description: SITE.description,
  keywords: [
    "business automation",
    "AI automation",
    "business process automation",
    "AI solutions for businesses",
    "workflow automation",
    "custom business software",
    "WhatsApp automation",
    "AI agents for business",
  ],
  authors: [{ name: "Cogniv Solutions" }],
  creator: "Cogniv Solutions",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: "Cogniv Solutions",
    title: "Cogniv Solutions | Business Automation & AI Systems",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Cogniv Solutions | Business Automation & AI Systems",
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0e0d",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cogniv Solutions",
  url: SITE.url,
  slogan: "Business, Automated.",
  description: SITE.description,
  email: SITE.email,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#fafaf9] text-[#0b0e0d]">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
