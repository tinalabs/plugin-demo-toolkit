import {useRouter} from 'next/router'
import { Layout, Loader } from 'tinacms-doc-toolkit'
import Config from '../tina-demo.config'

export function SlugHandler() {
  const router = useRouter()
  const slug = typeof router.query.slug == 'undefined' ? "/" : router.query.slug 
  const currentSlug = Array.isArray(slug) ? slug.join("/") : slug;

  if (router.isFallback) {
    return <Loader />
  }

  return (
    <Layout currentSlug={currentSlug} config={Config}>
      <Loader />
    </Layout>
  )
}

export default SlugHandler;