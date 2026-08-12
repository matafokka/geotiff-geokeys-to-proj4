import { defineConfig, type HeadConfig } from "vitepress";
import typedocSidebar from "../api/typedoc-sidebar.json";

export default defineConfig({
  title: "geotiff-geokeys-to-proj4",
  description:
    "geotiff-geokeys-to-proj4 documentation website. This is a library that converts GeoTIFF's geokeys to Proj4 string.",
  base: process.env.DOCS_BASE_URL || "/",
  sitemap: process.env.HOST ? { hostname: process.env.HOST } : undefined,

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
    ["link", { rel: "shortcut icon", type: "image/svg+xml", href: "/favicon.svg", sizes: "512x512" }],

    ...[
      ["png", 512],
      ["ico", 256],
    ].map(([ext, size]): HeadConfig => ["link", { rel: "icon", href: `/favicon.${ext}`, sizes: size + "x" + size }]),

    metaWithProperty("og:locale", "en"),
    metaWithName("robots", "all"),
    metaWithName("twitter:card", "summary"),

    ...[
      ["image", "/splash.png"],
      ["image:type", "image/png"],
      ["image:width", "1200"],
      ["image:height", "600"],
    ].flatMap(([name, value]) => [metaWithProperty(`og:${name}`, value), metaWithName(`twitter:${name}`, value)]),
  ],

  transformHead: (ctx) => {
    const res: HeadConfig[] = [];

    if (process.env.HOST) {
      res.push([
        "link",
        {
          rel: "canonical",
          href: process.env.HOST + ctx.pageData.relativePath.replace(/index\.md$/, "").replace(/\.md$/, ".html"),
        },
      ]);
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
