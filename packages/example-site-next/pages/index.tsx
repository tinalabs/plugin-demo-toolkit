import { Layout } from 'next-tinacms-doc-toolkit'
import {CONFIG} from './[slug]'
import {loadComponent} from './[slug]'
  const IndexPage = () => {
    return <Layout currentSlug={'/'} config={CONFIG} loadComponent={loadComponent}/>
  }


export default IndexPage