import '@styles/globals.css'
import {AppProvider} from '@services/context.js'

function Application({Component, pageProps}) {
  return (<AppProvider>
    <Component {...pageProps} />
  </AppProvider>);
}

export default Application
