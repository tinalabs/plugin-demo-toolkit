import Link from 'next/link'
// import Layout from '../components/Layout'
import { Layout } from 'next-tinacms-doc-toolkit'
import { DocumentConfig } from 'next-tinacms-doc-toolkit/build/interfaces'
const Test = ()=><div>this is a test</div>


export const loadComponent = async (fileName: string) => {
  try {
    const component = await import(`../docs/${fileName}.tsx`);
    return component;
  } catch (e) {
    console.error(`${fileName} was not found`);
    console.error(e);
    throw e;
  }
}
const CONFIG: DocumentConfig = {
    LinkWrapper: ({to, children})=>{
      if(to==='/'){
          return <Link href={`/docs`} as={`/docs`}>{children}</Link>
      }
      return <Link href={`/docs/[slug]`} as={`/docs${to}`}>{children}</Link>
    },
    title: 'this is a test',
    pages: [
        { filePath: "pageOne" ,label: 'page 1',  slug: '/', },
        { filePath: "pageTwo.tsx" , label: 'page 2',  slug: '/page-2',},
    ] 
  }
  const IndexPage = () => {
    const fileName = 'pageOne'
    console.log(__dirname)
    import(`../docs/${fileName}.tsx`).then(asdf=>{
      console.log({asdf: asdf.default.toString()})
    }).catch(e=>{
      console.log(e)
    })
    // console.log({test})
    return <Layout currentSlug={'/'} config={CONFIG} loadComponent={loadComponent}/>
  }


export default IndexPage