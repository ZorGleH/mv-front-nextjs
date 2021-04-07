import '@styles/globals.css'
import '@styles/footer.css'
import '@styles/loader.css'
import "@styles/scss/config.scss";
import {appWithTranslation} from 'next-i18next'
import {AppProvider} from '@services/context.js'
import Header from '@components/layouts/Header'
import Footer from '@components/layouts/Footer'


function Application({Component, pageProps}) {
  return (<AppProvider>
    <Header />
    <Component {...pageProps} />
    <Footer />
  </AppProvider>);
}

export default appWithTranslation(Application)
