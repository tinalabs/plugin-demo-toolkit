import {useRouter} from 'next/router'
import { Layout } from 'tinacms-doc-toolkit'
import CONFIG from '../tina.config'
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

const SlugPage = () => {
  const router = useRouter()
  const currentSlug = router.query.slug as string
  if(router.isFallback || !currentSlug){
      return <div>Loading...</div>
  }
  return <Layout currentSlug={'/'+currentSlug} config={CONFIG} loadComponent={loadComponent}/>
}


export default SlugPage