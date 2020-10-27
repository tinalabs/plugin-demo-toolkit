import Link from 'next/link'
import {  DocumentConfig } from 'tinacms-doc-toolkit'

const CONFIG: DocumentConfig = {
    LinkWrapper: ({to, children})=>{
      return <Link href={`/[...slug]`} as={`${to}`}>{children}</Link>
    },
    title: 'Tinacms Documentation Toolkit Docs',
    pages: [
        { filePath: "Intro" ,label: 'Intro',  slug: '/', },
        { filePath: "GettingStarted" , label: 'Getting started',  slug: '/intro',},
        { filePath: "Config" , label: 'Config',  slug: '/config',},
        { filePath: "MdxFiles" , label: 'MDX Files',  slug: '/mdx-files',},
        { filePath: "TinaConfig" , label: 'Tina Config',  slug: '/tina-config',},
        { filePath: "CmsObject" , label: 'CMS object',  slug: '/cms',},
    ],
    tinaConfig: {
      enabled: false,
    }
}

export const loadComponent = async (fileName: string) => {
  try {
    const component = await import(`./docs/${fileName}.mdx`);
    return component;
  } catch (e) {
    console.error(`${fileName} was not found`);
    console.error(e);
    throw e;
  }
};

export default CONFIG