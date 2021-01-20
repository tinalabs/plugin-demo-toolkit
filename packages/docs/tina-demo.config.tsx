import Link from "next/link";
import { Config  } from "tinacms-doc-toolkit";


export const DemoConfig: Config = {
  pages: [
    {
      label: "Intro",
      slug: "/",
      loadPage: import("./content/Intro.mdx"),
    },
    {
      label: "Getting started",
      slug: "/intro",
      loadPage: import("./content/GettingStarted.mdx"),
    },
    {
      label: "Config",
      slug: "/config",
      loadPage: import("./content/Config.mdx"),
    },
    {
      label: "MDX Files",
      slug: "/mdx-files",
      loadPage: import("./content/MdxFiles.mdx"),
    },
    {
      label: "Tina Config",
      slug: "/tina-config",
      loadPage: import("./content/TinaConfig.mdx"),
    },
    {
      label: "CMS object",
      slug: "/cms",
      loadPage: import("./content/CmsObject.mdx"),
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
