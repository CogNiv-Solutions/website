import type { MetadataRoute } from "next";
import { SITE } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE.url}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/#solutions`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/#demo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/#pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/#contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];
}
