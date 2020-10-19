import { Layout } from 'next-tinacms-doc-toolkit'
import * as DocPage from './[slug]'

const IndexPage = () => {
  return <Layout currentSlug={'/'} config={DocPage.CONFIG} loadComponent={DocPage.loadComponent} />
}

export default IndexPage