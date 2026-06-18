const siteUrl = "https://www.envie-de-chanter.com";

const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/agenda/calendrier", priority: 0.9, changeFrequency: "daily" },
  { path: "/agenda/prochains-ateliers", priority: 0.9, changeFrequency: "daily" },
  { path: "/agenda/stages-et-formations", priority: 0.9, changeFrequency: "weekly" },
  { path: "/ateliers-de-chant/chant-collectif", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ateliers-de-chant/chant-maman-bebe", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ateliers-de-chant/chant-prenatal-ateliers", priority: 0.9, changeFrequency: "weekly" },
  { path: "/ateliers-de-chant/cours-particuliers", priority: 0.8, changeFrequency: "monthly" },
  { path: "/chant-prenatal/le-chant-prenatal-psychophonie", priority: 0.9, changeFrequency: "monthly" },
  { path: "/chant-prenatal/les-formateurs", priority: 0.7, changeFrequency: "monthly" },
  { path: "/chant-prenatal/prenatal-singing", priority: 0.7, changeFrequency: "monthly" },
  { path: "/chant-prenatal/canto-prenatal", priority: 0.7, changeFrequency: "monthly" },
  { path: "/chant-prenatal/canto-pre-natal-portugais", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact/liens", priority: 0.6, changeFrequency: "yearly" },
  { path: "/les-animateurs/france", priority: 0.8, changeFrequency: "weekly" },
  { path: "/les-animateurs/belgique", priority: 0.7, changeFrequency: "weekly" },
  { path: "/les-animateurs/canada", priority: 0.7, changeFrequency: "weekly" },
  { path: "/les-animateurs/suisse", priority: 0.7, changeFrequency: "weekly" },
  { path: "/les-animateurs/espana", priority: 0.7, changeFrequency: "weekly" },
  { path: "/les-animateurs/portugal", priority: 0.7, changeFrequency: "weekly" },
  { path: "/les-animateurs/deutschland", priority: 0.7, changeFrequency: "weekly" },
  { path: "/les-animateurs/amerique-du-sud", priority: 0.7, changeFrequency: "weekly" },
  { path: "/medias/publications", priority: 0.6, changeFrequency: "monthly" },
  { path: "/medias/la-presse-en-parle", priority: 0.6, changeFrequency: "monthly" },
  { path: "/medias/videos", priority: 0.6, changeFrequency: "monthly" },
  { path: "/stages-et-formations", priority: 0.9, changeFrequency: "monthly" },
];

export default function sitemap() {
  return routes.map(({ path, ...metadata }) => ({
    url: `${siteUrl}${path}`,
    ...metadata,
  }));
}
