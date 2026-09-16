import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE = {
  name: "Cogniv Solutions",
  short: "Cogniv",
  tagline: "Business, Automated.",
  url: "https://cognivsolutions.in",
  email: "cognivsolutions@gmail.com",
  phone: "+91 97529 90241",
  whatsappNumber: "919752990241",
  calendarUrl: process.env.NEXT_PUBLIC_CALENDAR_URL || "",
  description:
    "Cogniv Solutions helps businesses identify operational bottlenecks and turn repetitive work into intelligent, scalable automation.",
} as const;

export function getWhatsAppUrl(customMessage?: string) {
  const defaultText =
    "Hi Cogniv, I'm interested in exploring automation for my business workflow.";
  const text = encodeURIComponent(customMessage || defaultText);
  return `https://wa.me/${SITE.whatsappNumber}?text=${text}`;
}

export function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

