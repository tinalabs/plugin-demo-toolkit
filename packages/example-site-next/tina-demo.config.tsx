import Link from "next/link";
import { Config } from "tinacms-doc-toolkit";
import { join } from "path";
import glob from "glob";

const CONTENT_DIR = join(process.cwd(), "./content");
const PAGES = glob.sync(`${CONTENT_DIR}/**/*.mdx`)
  .map(pagePath => {
    const relativePath = pagePath.replace(CONTENT_DIR, '');
    const slug = relativePath.startsWith('index.mdx')
      ? "Introduction" // Use introduction for root page
      : pagePath.replace(CONTENT_DIR, '').replace("index.mdx", '').replace('.mdx', ''); // Use page path as slug
    const label = slug.replace(/\/([a-Z]{1})/, (value) => value.toUpperCase()); // Capital case slug

    return {
      label,
      slug,
      loadPage: import(pagePath)
    }
  });

export const DemoConfig: Config = {
  pages: PAGES,
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
