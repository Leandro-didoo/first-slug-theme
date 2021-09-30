import 'materialize-css/dist/css/materialize.min.css';
import '../styles/globals.scss'
import NextNprogress from 'nextjs-progressbar';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNprogress
        color="#9c27b0"
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
        showOnShallow={true}
      />
      <Component {...pageProps} />
    </>

  )
}
export default MyApp
