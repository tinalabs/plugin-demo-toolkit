// export interface ComponentPage extends BasePage {
//   Component: React.FC;
// }
// export interface FilePage extends BasePage {
//   file: string;
// }

export type Page = BasePage;
export interface DocumentConfig {
  pages: Page[];
  title: string;
  LinkWrapper: React.FC<{ to: string }>;
}

interface BasePage {
  label: string;
  slug: string;
  code?: string;
  Component: React.FC;
}
export interface LayoutProps {
  config: DocumentConfig;
  currentSlug: string;
}
