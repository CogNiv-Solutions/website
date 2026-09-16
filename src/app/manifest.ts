import type { MetadataRoute } from "next";
import { SITE } from "@/lib/utils";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cogniv Solutions | Business Automation & AI Systems",
    short_name: "Cogniv",
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf9",
    theme_color: "#0b0e0d",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/opengraph-image.png",
        sizes: "1200x630",
        type: "image/png",
      },
    ],
  };
}
