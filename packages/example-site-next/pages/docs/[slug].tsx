import Link from 'next/link'
import {useRouter} from 'next/router'
// import Layout from '../components/Layout'
import { Layout } from 'next-tinacms-doc-toolkit'
import { DocumentConfig } from 'next-tinacms-doc-toolkit/build/interfaces'

const Test = ()=><div>this is a test</div>

const CONFIG: DocumentConfig = {
    LinkWrapper: ({to, children})=>{
      if(to==='/'){
          return <Link href={`/docs`} as={`/docs`}>{children}</Link>
      }
      return <Link href={`/docs/[slug]`} as={`/docs${to}`}>{children}</Link>
    },
    title: 'this is a test',
    pages: [
        { Component: Test, label: 'page 1',  slug: '/', code: 'let test = \'asdaf\''},
        { Component: Test, label: 'page 2',  slug: '/page-2', code: 'let test = \'page 2\''},
        { Component: Test, label: 'page 3',  slug: '/page-3'},
        { Component: Test, label: 'page 4',  slug: '/page-4'}
    ] 
  }
const IndexPage = () => {
  const router = useRouter()
  const currentSlug = router.query.slug as string
  console.log({currentSlug })
  if(router.isFallback){
      return <div>Loading...</div>
  }
  return <Layout currentSlug={'/'+currentSlug} config={CONFIG}/>
}


export default IndexPage