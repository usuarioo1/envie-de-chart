export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard/",
          "/login",
          "/register",
          "/users",
          "/crud-demo",
          "/stages-et-formations-dynanique",
        ],
      },
    ],
    sitemap: "https://www.envie-de-chanter.com/sitemap.xml",
    host: "https://www.envie-de-chanter.com",
  };
}
