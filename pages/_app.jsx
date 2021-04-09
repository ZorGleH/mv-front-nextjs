import '@styles/globals.css'
import '@styles/footer.css'
import '@styles/loader.css'
import "@styles/scss/config.scss";
// import "~react-flags-select/css/react-flags-select.css";
// 
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS

import {appWithTranslation} from 'next-i18next'
import {AppProvider} from '@services/context.js'
import Header from '@components/layouts/Header'
import Footer from '@components/layouts/Footer'


function Application({Component, pageProps}) {
  return (<AppProvider>
    <Header />
    <main className="d-flex flex-column justify-content-center">
      <Component {...pageProps} />
    </main>
    <Footer />
  </AppProvider>);
}

export default appWithTranslation(Application)
