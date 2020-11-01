import Link from "next/link";
import { Config } from "tinacms-doc-toolkit";

export const DemoConfig: Config = {
  pages: [
    {
      label: "Intro",
      slug: "/",
      loadComponent: async () => (await import("./docs/Intro.mdx")).default,
    },
    {
      label: "Getting started",
      slug: "/intro",
      loadComponent: async () => (await import("./docs/GettingStarted.mdx")).default,
    },
    {
      label: "Config",
      slug: "/config",
      loadComponent: async () => (await import("./docs/Config.mdx")).default,
    },
    {
      label: "MDX Files",
      slug: "/mdx-files",
      loadComponent: async () => (await import("./docs/MdxFiles.mdx")).default,
    },
    {
      label: "Tina Config",
      slug: "/tina-config",
      loadComponent: async () => (await import("./docs/TinaConfig.mdx")).default,
    },
    {
      label: "CMS object",
      slug: "/cms",
      loadComponent: async () => (await import("./docs/CmsObject.mdx")).default,
    },
  ],
  tinaConfig: {
    enabled: true,
  },
  components: {
    Link: ({ to, children }) => (
      <Link href={`/[...slug]`} as={`${to}`}>
        {children}
      </Link>
    ),
  }
};

export default DemoConfig;
