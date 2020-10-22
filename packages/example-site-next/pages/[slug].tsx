import Link from 'next/link'
import {useRouter} from 'next/router'
import { Layout, DocumentConfig } from 'tinacms-doc-toolkit'
export const loadComponent = async (fileName: string) => {
  try {
    const component = await import(`../docs/${fileName}.mdx`);
    return component;
  } catch (e) {
    console.error(`${fileName} was not found`);
    console.error(e);
    throw e;
  }
};

export const CONFIG: DocumentConfig = {
    LinkWrapper: ({to, children})=>{
      if(to==='/'){
          return <Link href={`/`} as={`/`}>{children}</Link>
      }
      return <Link href={`/[slug]`} as={`${to}`}>{children}</Link>
    },
    title: 'Tinacms Documentation Toolkit Docs',
    pages: [
        { filePath: "Intro" ,label: 'Intro',  slug: '/', },
        { filePath: "GettingStarted" , label: 'Getting started',  slug: '/intro',},
        { filePath: "LoadComponent" , label: 'Load Component',  slug: '/load-component',},
        { filePath: "Config" , label: 'Config',  slug: '/config',},
        { filePath: "MdxFiles" , label: 'MDX Files',  slug: '/mdx-files',},
        { filePath: "TinaConfig" , label: 'Tina Config',  slug: '/tina-config',},
    ],
    tinaConfig: {
      enabled: false,
    }
}
const SlugPage = () => {
  const router = useRouter()
  const currentSlug = router.query.slug as string
  console.log({currentSlug })
  if(router.isFallback || !currentSlug){
      return <div>Loading...</div>
  }
  return <Layout currentSlug={'/'+currentSlug} config={CONFIG} loadComponent={loadComponent}/>
}


export default SlugPage