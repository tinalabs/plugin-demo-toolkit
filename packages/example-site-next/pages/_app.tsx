import {MDXProvider} from '@mdx-js/react'
import {CodeBlock} from 'tinacms-doc-toolkit'

const components = {
  pre: (props: any) => {
        return <div {...props} />;
    },
  code: CodeBlock
}

export function App({ Component, pageProps }: any) {
  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>)
}

export default App;