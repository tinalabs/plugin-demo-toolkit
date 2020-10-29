import Link from "next/link";
import { DocumentConfig } from "tinacms-doc-toolkit";

export const Config: DocumentConfig = {
  pages: [
    {
      label: "Intro",
      slug: "/",
      loadComponent: async () => await import("./docs/CmsObject.mdx"),
    },
    {
      label: "Getting started",
      slug: "/intro",
      loadComponent: async () => await import("./docs/CmsObject.mdx"),
    },
    {
      label: "Config",
      slug: "/config",
      loadComponent: async () => await import("./docs/CmsObject.mdx"),
    },
    {
      label: "MDX Files",
      slug: "/mdx-files",
      loadComponent: async () => await import("./docs/CmsObject.mdx"),
    },
    {
      label: "Tina Config",
      slug: "/tina-config",
      loadComponent: async () => await import("./docs/CmsObject.mdx"),
    },
    {
      label: "CMS object",
      slug: "/cms",
      loadComponent: async () => await import("./docs/CmsObject.mdx"),
    },
  ],
  tinaConfig: {
    enabled: false,
  },
  LinkWrapper: ({ to, children }) => {
    return (
      <Link href={`/[...slug]`} as={`${to}`}>
        {children}
      </Link>
    );
  },
};

export default Config;
