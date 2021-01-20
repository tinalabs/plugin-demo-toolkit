import Link from "next/link";
import { Config } from "tinacms-doc-toolkit";

const PAGE_PATHS = Array.isArray(process.env.pagePaths) ? process.env.pagePaths : [];

export const DemoConfig: Config = {
  pages: PAGE_PATHS.map(slug => {
    const label = slug === '/'
      ? "Introduction"
      : slug.replace("/", " ");
    const loadPage = import("./content" + slug.replace(/\/$/, '/index') + ".mdx");
  
    return {
      label,
      slug,
      loadPage
    }
  }),
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
