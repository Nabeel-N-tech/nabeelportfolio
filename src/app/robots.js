export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: "https://nabeeln.vercel.app/sitemap.xml",
    host: "https://nabeeln.vercel.app",
  };
}