import Link from 'next/link'
import {  DocumentConfig } from 'tinacms-doc-toolkit'

const CONFIG: DocumentConfig = {
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
        { filePath: "Config" , label: 'Config',  slug: '/config',},
        { filePath: "MdxFiles" , label: 'MDX Files',  slug: '/mdx-files',},
        { filePath: "TinaConfig" , label: 'Tina Config',  slug: '/tina-config',},
    ],
    tinaConfig: {
      enabled: false,
    }
}

export default CONFIG