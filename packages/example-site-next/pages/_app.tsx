// TODO: See why this needs to be imported
import 'bulma/css/bulma.min.css';
import {MDXProvider} from '@mdx-js/react'

import {CodeBlock} from '../component/CodeBlock'
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