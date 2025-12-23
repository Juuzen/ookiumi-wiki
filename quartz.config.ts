import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Ookiumi Wiki",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "it-IT",
    baseUrl: "juuzen.github.io/ookiumi-wiki",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        // 🌊 TEMA CHIARO - Mare e Oceano
        lightMode: {
          light: "#e8f4f8",           // Azzurro chiarissimo (schiuma del mare)
          lightgray: "#c5e3ed",       // Azzurro-grigio chiaro (onde calme)
          gray: "#7ba5b8",            // Blu-grigio (mare al tramonto)
          darkgray: "#2c5266",        // Blu marino scuro (profondità marine)
          dark: "#1a3a4a",            // Blu marino molto scuro (abissi)
          secondary: "#0d7d9e",       // Turchese intenso (oceano tropicale)
          tertiary: "#d4a574",        // Oro/Ambra (tesori e dobloni)
          highlight: "rgba(13, 125, 158, 0.15)",    // Turchese trasparente
          textHighlight: "#ffd70088", // Oro trasparente (tesoro evidenziato)
        },
        
        // 🪵 TEMA SCURO - Stiva e Legno della Nave
        darkMode: {
          light: "#2b1f17",           // Marrone molto scuro (legno della stiva)
          lightgray: "#3d2e23",       // Marrone scuro (casse di legno)
          gray: "#6b5544",            // Marrone medio (tavole della nave)
          darkgray: "#c9b8a3",        // Beige/Sabbia (corda e vele)
          dark: "#f0e6d2",            // Beige chiaro (pergamene)
          secondary: "#4da8c7",       // Turchese chiaro (acqua vista dalla stiva)
          tertiary: "#d4a574",        // Oro/Ambra (tesori nella stiva)
          highlight: "rgba(77, 168, 199, 0.15)",    // Turchese trasparente
          textHighlight: "#d4a57488", // Ambra trasparente (tesoro evidenziato)
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
