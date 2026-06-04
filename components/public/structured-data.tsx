import { business, servicesSeed } from "@/lib/seed-data";

export function StructuredData() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: "Digital service center and government service center in Tarsadi, Kosamba, Gujarat.",
    telephone: business.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kosamba",
      addressRegion: "Gujarat",
      addressCountry: "IN",
      streetAddress: "Tarsadi"
    },
    areaServed: business.localAreas,
    url: business.baseUrl,
    priceRange: "Rs. 2 - Rs. 300",
    makesOffer: servicesSeed.map((service) => ({
      "@type": "Offer",
      name: service.name,
      description: service.description,
      price: service.charges,
      priceCurrency: "INR"
    }))
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which services are available at Vraj Online Center?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PAN card, Aadhaar guidance, Ayushman card, voter ID, certificates, scholarships, job forms, admissions, PVC printing, xerox, printing, and scanning are available."
        }
      },
      {
        "@type": "Question",
        name: "Where is Vraj Online Center located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vraj Online Center is located in Tarsadi, Kosamba, Gujarat, India."
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}
