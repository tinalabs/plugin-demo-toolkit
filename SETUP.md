# Set up from scratch
> warning: This document is still under devolvement

## 1. Getting started

getting started is pretty simple first you need to setup a basic layout.

In this example we will be using nextjs but it should also easily translate to CRA or any react framework


fist we need to add `tinacms-doc-toolkit` to your project
```bash
yarn add tinacms styled-components tinacms-doc-toolkit
```

next lets make a basic slug page

*`/[slug].tsx`*
```js
import Link from 'next/link'
import {useRouter} from 'next/router'
import { Layout } from 'next-tinacms-doc-toolkit'
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
```


Notice we are missing a couple of things. We are missing `CONFIG` and `loadComponent`


## 2 setup `LoadComponent` Function

First we will add the async `LoadComponet Fuction`. This Function will be passed to the layout. It takes in a file name as a parameter and returns the imported file.

For next the fuction could look like this depending on your folder structor
```jss
export const loadComponent = async (fileName: string) => {
  try {
    const component = await import(`../../docs/${fileName}.mdx`);
    return component;
  } catch (e) {
    console.error(`${fileName} was not found`);
    console.error(e);
    throw e;
  }
};
```

adding this your slug page could look like this

```js
export const loadComponent = async (fileName: string) => {
  try {
    const component = await import(`../../docs/${fileName}.mdx`);
    return component;
  } catch (e) {
    console.error(`${fileName} was not found`);
    console.error(e);
    throw e;
  }
};

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
```
For this to work we need to add the mdx loader to our next project. Thankfully this is pretty simple. 
`yarn add @next/mdx @mdx-js/loader`
edit next.config.js to look like this

```js
const config = {
  //.. old config
};
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})
module.exports = withMDX(config)
```


Now mdx is all setup but we are still missing the `CONFIG` for our project

## 3. Setup the Config

The config object is where you made all add all of the configuration for your doc site happen. It is made up of a couple of simple interfaces.

```ts
export interface DocumentConfig {
  pages: Page[];
  title: string;
  LinkWrapper: React.FC<{ to: string }>;
  tableOfContentsText?: string;
  tinaConfig?: TinaCMSConfig;
}

export interface Page {
  label: string;
  slug: string;
  filePath: string;
}
```
Document config
| Option              | Description                                                                                                                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pages               | an array of `page` objects                                                                                                                                                                  |
| title               | the title of what you are documenting. This will be the header of the page                                                                                                                  |
| LinkWrapper         | router systems are not a concern of this plugin. One must pass there own `LinkWrapper` Components which is passed a prop called to. This component wraps the links in the table of contents |
| tableOfContentsText | The title that is displayed over the table of contents side panel. This defaults to "Table of contents"  but can be used to override this text                                              |
| TinaConfig          | The global TinaConfiguration that will be used for all mdx files. Defaults to {}. [See all options here.](https://tinacms.org/docs/cms/#cms-configuration)                                  |

an example (for nextjs) might look like this

```js
export const CONFIG: DocumentConfig = {
    LinkWrapper: ({to, children})=>{
      if(to==='/'){
          return <Link href={`/docs`} as={`/docs`}>{children}</Link>
      }
      return <Link href={`/docs/[slug]`} as={`/docs${to}`}>{children}</Link>
    },
    title: 'Tinacms Documentation Toolkit Docs',
    pages: [
        { filePath: "IndexPage" ,label: 'Intro',  slug: '/', },
        { filePath: "PageOne" , label: 'Getting started',  slug: '/page-one',},
    ],
    tinaConfig: {
      enabled: false,
    }
}
```

## MDX files

Now that we have all of the configuration done we are ready to create mdx files. Simply make a file with the extension .mdx. You can now put markdown and JSX in this file. The name of this file is what you will pass to the config file.


## TinaConfig

In your mdx file we might want to export certain tina configuration. Its is really easy to do so. Simply add

```js
export const TinaConfig = {
    //... tina configeration here
}
```
To your mdx file. This will override any of the configuration in the global mdx file.

For example when you went to this page you might have noticed that the sidebar and toolbar are enabled thats because the TinaConfig for this page looks like

```js
export const TinaConfig = {
    enabled: true,
    sidebar: true,
    toolbar: true
}
```

on the next page is an example showing how to you can access the cms object in MDX!
