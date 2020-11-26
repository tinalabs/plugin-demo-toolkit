import {MDXProvider} from '@mdx-js/react'
import {CodeBlock} from 'tinacms-doc-toolkit'
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
    <MDXProvider components={components}>
      <Layout currentSlug={currentSlug} config={Config}>
        <Loader />
      </Layout>
    </MDXProvider>
  )
}


const components = {
  pre: (props: any) => {
        return <div {...props} />;
    },
  code: CodeBlock
}

export const getStaticProps=()=>{
  return {props: {}}
}
export const getStaticPaths=()=>{
  const paths = Config.pages.map(page=>{
    return {
      params: {
        slug: [page.slug.replace('/', '')]
      }
    }
    
  })
  console.dir(paths)
  return {
    paths,
    fallback: false
  }
}



export default SlugHandler;