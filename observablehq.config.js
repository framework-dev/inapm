// See https://observablehq.com/framework/config for documentation.
export default {
  // The project’s title; used in the sidebar and webpage titles.
  title: "In Networked and Programmable Media",

  // The pages and sections in the sidebar. If you don’t specify this option,
  // all pages will be listed in alphabetical order. Listing pages explicitly
  // lets you organize them into sections and have unlisted pages.
  pages: [
    {
      name: "Context",
      pages: [
        { name: "Prospectus", path: "/inapm0" }
      ]
    },
    {
      name: "Prelims",
      pages: [
        { name: "Epigraph", path: "/inapm1_epigraph" },
        { name: "Preface", path: "/inapm1_preface" },
      ]
    },
    {
      name: "Body",
      pages: [
        { name: "Hypertext", path: "/inapm2_hypertext" },
        { name: "HyperCard", path: "/inapm2_hypercard" },
        { name: "Collocations", path: "/inapm2_collocations" },
        { name: "Collocations - Live", path: "/inapm2_collocations_a" },
        { name: "Book Unbound", path: "/inapm2_bookunbound" },
        // { name: "Book Unbound - Live", path: "/inapm2_bookunbound_a" },
      ]
    },
    {
      name: "Apparatus",
      pages: [
        { name: "Bibliography", path: "/inapm1_bibliography" },
        { name: "About the Author", path: "/inapm1_authorbio" },
      ]
    }
  ],

  // pages: [
  //   {
  //     name: "Examples",
  //     pages: [
  //       {name: "Dashboard", path: "/example-dashboard"},
  //       {name: "Report", path: "/example-report"}
  //     ]
  //   }
  // ],

  // Content to add to the head of the page, e.g. for a favicon:
  head: '<link rel="icon" href="favicon.ico" type="image/x-icon" sizes="32x32">',

  // The path to the source root.
  root: "src",

  // Some additional configuration options and their defaults:
  // theme: "default", // try "light", "dark", "slate", etc.
  // header: "", // what to show in the header (HTML)
  // footer: "Built with Observable.", // what to show in the footer (HTML)
  // sidebar: true, // whether to show the sidebar
  // toc: true, // whether to show the table of contents
  pager: false, // whether to show previous & next links in the footer
  // output: "dist", // path to the output root for build
  // search: true, // activate search
  // linkify: true, // convert URLs in Markdown to links
  // typographer: false, // smart quotes and other typographic improvements
  // cleanUrls: true, // drop .html from URLs
};
