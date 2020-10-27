import {useRouter} from 'next/router'
import { Layout } from 'tinacms-doc-toolkit'
import CONFIG, { loadComponent } from '../tina.config'
const SlugPage = () => {
  const router = useRouter()
  const currentSlug = typeof router.query.slug == 'undefined' ? "" : router.query.slug 
  if(router.isFallback){
      return <div>Loading...</div>
  }
  return <Layout currentSlug={'/'+currentSlug} config={CONFIG} loadComponent={loadComponent}/>
}

export default SlugPage