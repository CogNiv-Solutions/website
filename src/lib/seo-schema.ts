import { SITE } from "./utils";
import { FAQS, solutionCategories } from "./data";

export type { FaqItem } from "./data";
export { FAQS };

/**
 * Builds the Schema.org JSON-LD graph for Cogniv Solutions.
 */
export function generateSeoJsonLd() {
  const organizationSchema = {
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: "Cogniv",
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    image: `${SITE.url}/opengraph-image.png`,
    description: SITE.description,
    email: SITE.email,
    telephone: "+91-97529-90241",
    priceRange: "$$",
    currenciesAccepted: "INR, USD",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    areaServed: [
      {
        "@type": "Country",
        name: "India",
      },
    ],
    knowsAbout: [
      "Business Process Automation",
      "Workflow Automation",
      "WhatsApp Business Integration",
      "CRM & Lead Management",
      "Document Data Extraction",
      "Custom Business Software",
    ],
    slogan: SITE.tagline,
  };

  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: {
      "@id": `${SITE.url}/#organization`,
    },
    inLanguage: "en-IN",
  };

  const serviceCatalogSchema = {
    "@type": "OfferCatalog",
    "@id": `${SITE.url}/#services`,
    name: "Cogniv Business Automation Services",
    itemListElement: solutionCategories.map((solution, index) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        "@id": `${SITE.url}/#service-${solution.id}`,
        name: solution.title,
        description: `${solution.summary} ${solution.outcome}`,
        provider: {
          "@id": `${SITE.url}/#organization`,
        },
        serviceType: solution.title,
        areaServed: {
          "@type": "Country",
          name: "India",
        },
      },
      position: index + 1,
    })),
  };

  const faqSchema = {
    "@type": "FAQPage",
    "@id": `${SITE.url}/#faq`,
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${SITE.url}/#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Solutions",
        item: `${SITE.url}/solutions`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Demo Lab",
        item: `${SITE.url}/demos`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Pricing",
        item: `${SITE.url}/pricing`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Free Workflow Audit",
        item: `${SITE.url}/audit`,
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      websiteSchema,
      serviceCatalogSchema,
      faqSchema,
      breadcrumbSchema,
    ],
  };
}
