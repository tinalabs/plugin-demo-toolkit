import { Layout } from 'tinacms-doc-toolkit'
import CONFIG from '../tina.config'
import {loadComponent} from './[slug]'
  const IndexPage = () => {
    return <Layout currentSlug={'/'} config={CONFIG} loadComponent={loadComponent}/>
  }


export default IndexPage