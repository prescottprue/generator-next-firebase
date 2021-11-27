import initAuth from '../initAuth'
import '../styles/globals.css'

initAuth()

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
