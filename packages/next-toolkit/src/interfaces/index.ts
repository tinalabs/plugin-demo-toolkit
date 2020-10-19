// export interface ComponentPage extends BasePage {
//   Component: React.FC;
// }
// export interface FilePage extends BasePage {
//   file: string;
// }

import { TinaCMSConfig } from "tinacms";

export type Page = BasePage;
export interface DocumentConfig {
  pages: Page[];
  title: string;
  LinkWrapper: React.FC<{ to: string }>;
  tableOfContentsText?: string;
  tinaConfig?: TinaCMSConfig;
}

interface BasePage {
  label: string;
  slug: string;
  filePath: string;
}
export interface LayoutProps {
  config: DocumentConfig;
  currentSlug: string;
  loadComponent: (name: string) => any;
}
