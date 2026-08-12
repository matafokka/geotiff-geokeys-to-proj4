import { defineConfig, type HeadConfig } from "vitepress";
import typedocSidebar from "../api/typedoc-sidebar.json";

let HOST = process.env.HOST || "";

if (HOST.endsWith("/")) {
  HOST = HOST.substring(0, HOST.length - 1);
}

const title = "geotiff-geokeys-to-proj4";

export default defineConfig({
  title,
  description:
    "geotiff-geokeys-to-proj4 documentation website. This is a library that converts GeoTIFF's geokeys to Proj4 string.",
  base: process.env.DOCS_BASE_URL || "/",
  sitemap: HOST ? { hostname: HOST } : undefined,

  themeConfig: {
    logo: "/favicon.svg",
    search: { provider: "local" },
    outline: { level: "deep" },

    sidebar: [
      { text: "Home", collapsed: false, link: "/" },
      { text: "API Reference", items: typedocSidebar },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/matafokka/geotiff-geokeys-to-proj4" }],
  },

  head: [
    ["link", { rel: "shortcut icon", href: HOST + "/favicon.svg", type: "image/svg+xml", sizes: "any" }],
    ["link", { rel: "icon", href: HOST + "/favicon.png", type: "image/png", sizes: "512x512" }],
    ["link", { rel: "icon", href: HOST + "/favicon.ico", sizes: "256x256" }],
    ["link", { rel: "apple-touch-icon", href: HOST + "/favicon.png", type: "image/png", sizes: "512x512" }],

    metaWithProperty("og:locale", "en"),
    metaWithProperty("og:site_name", title),
    metaWithName("robots", "all"),
    metaWithName("twitter:card", "summary"),

    ...[
      ["image", HOST + "/splash.png"],
      ["image:type", "image/png"],
      ["image:width", "1200"],
      ["image:height", "600"],
      ["image:alt", "Logo and name of the library"],
    ].flatMap(([name, value]) => [metaWithProperty(`og:${name}`, value), metaWithName(`twitter:${name}`, value)]),
  ],

  transformHead: (ctx) => {
    const res: HeadConfig[] = [];

    if (HOST) {
      const canonicalUrl = HOST + "/" + ctx.pageData.relativePath.replace(/index\.md$/, "").replace(/\.md$/, ".html");

      res.push(["link", { rel: "canonical", href: canonicalUrl }], metaWithProperty("og:url", canonicalUrl));
    }

    res.push(
      metaWithProperty("og:title", ctx.title),
      metaWithProperty("og:description", ctx.description),
      metaWithName("twitter:title", ctx.title),
      metaWithName("twitter:description", ctx.description),
    );

    return res;
  },
});

function metaWithProperty(property: string, content: string): HeadConfig {
  return ["meta", { property, content }];
}

function metaWithName(name: string, content: string): HeadConfig {
  return ["meta", { name, content }];
}
