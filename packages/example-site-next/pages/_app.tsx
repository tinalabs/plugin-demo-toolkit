// TODO: See why this needs to be imported
import 'bulma/css/bulma.min.css';
import '../styles/index.css'
import {MDXProvider} from '@mdx-js/react'
import {CodeBlock} from 'tinacms-doc-toolkit'


const components = {
  pre: (props:any) => {
        return <div {...props} />;
    },
  code: CodeBlock
}

 function MyApp({ Component, pageProps }: any) {

return (<MDXProvider components={components}>
          <Component {...pageProps} />
       </MDXProvider>)
}
export default MyApp