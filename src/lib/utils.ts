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
  description:
    "Cogniv Solutions helps businesses identify operational bottlenecks and turn repetitive work into intelligent, scalable automation.",
} as const;

export function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}
