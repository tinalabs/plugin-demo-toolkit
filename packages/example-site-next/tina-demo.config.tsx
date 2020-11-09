import Link from "next/link";
import { Config  } from "tinacms-doc-toolkit";


export const DemoConfig: Config = {
  pages: [
    {
      label: "Intro",
      slug: "/",
      loadPage: import("./docs/Intro.mdx"),
    },
    {
      label: "Getting started",
      slug: "/intro",
      loadPage: import("./docs/GettingStarted.mdx"),
    },
    {
      label: "Config",
      slug: "/config",
      loadPage: import("./docs/Config.mdx"),
    },
    {
      label: "MDX Files",
      slug: "/mdx-files",
      loadPage: import("./docs/MdxFiles.mdx"),
    },
    {
      label: "Tina Config",
      slug: "/tina-config",
      loadPage: import("./docs/TinaConfig.mdx"),
    },
    {
      label: "CMS object",
      slug: "/cms",
      loadPage: import("./docs/CmsObject.mdx"),
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
