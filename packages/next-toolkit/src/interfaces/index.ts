// export interface ComponentPage extends BasePage {
//   Component: React.FC;
// }
// export interface FilePage extends BasePage {
//   file: string;
// }

import { TinaCMSConfig } from "tinacms";

export interface DocumentConfig {
  pages: Page[];
  title: string;
  LinkWrapper: React.FC<{ to: string }>;
  tableOfContentsText?: string;
  tinaConfig?: TinaCMSConfig;
}

export interface Page {
  label: string;
  slug: string;
  filePath: string;
}
export interface LayoutProps {
  config: DocumentConfig;
  currentSlug: string;
  loadComponent: (name: string) => any;
}
