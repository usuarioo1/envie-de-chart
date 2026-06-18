const siteUrl = "https://www.envie-de-chanter.com";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Envie de Chanter",
  url: siteUrl,
  logo: `${siteUrl}/assets/icon/icono.png`,
  email: "marielaurepotel@orange.fr",
  telephone: "+33164409423",
  sameAs: [
    "https://www.facebook.com/Enviedechanter",
    "https://www.instagram.com/enviedechanter_chant_prenatal/",
  ],
};

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

function normalizeDate(value) {
  if (!value) return null;
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();

  const match = String(value).match(/(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
  if (!match) return null;
  return new Date(`${match[3]}-${match[2].padStart(2, "0")}-${match[1].padStart(2, "0")}T00:00:00+01:00`).toISOString();
}

export function eventsJsonLd(workshops = [], stages = []) {
  const events = [
    ...workshops.map((workshop) => ({
      "@type": "Event",
      name: workshop.title,
      description: workshop.description,
      startDate: normalizeDate(workshop.date),
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      organizer: { "@id": `${siteUrl}/#organization` },
      url: `${siteUrl}/agenda/calendrier`,
      ...(workshop.price > 0 && {
        offers: {
          "@type": "Offer",
          price: workshop.price,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: `${siteUrl}/agenda/calendrier`,
        },
      }),
    })),
    ...stages.map((stage) => ({
      "@type": "Event",
      name: stage.title,
      description: stage.description,
      startDate: normalizeDate(stage.date),
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      organizer: { "@id": `${siteUrl}/#organization` },
      url: `${siteUrl}/agenda/calendrier`,
      location: {
        "@type": "Place",
        name: stage.location,
        address: stage.location,
      },
    })),
  ].filter((event) => event.startDate);

  if (!events.length) return null;
  return { "@context": "https://schema.org", "@graph": events };
}

export function peopleJsonLd(animateurs) {
  if (!animateurs.length) return null;

  return {
    "@context": "https://schema.org",
    "@graph": animateurs.map((animateur) => ({
      "@type": "Person",
      name: animateur.name,
      jobTitle: "Animateur de chant prénatal et psychophonie",
      ...(animateur.email && { email: animateur.email }),
      ...(animateur.phone && { telephone: animateur.phone }),
      ...((animateur.city || animateur.region) && {
        address: {
          "@type": "PostalAddress",
          addressLocality: animateur.city,
          addressRegion: animateur.region,
        },
      }),
      worksFor: { "@id": `${siteUrl}/#organization` },
    })),
  };
}
