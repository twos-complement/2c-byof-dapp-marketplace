import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@emotion/react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import theme from '../util/theme'
import Layout from '../components/Layout'
import GuestLayout from '../components/GuestLayout'
import { useRouter } from 'next/dist/client/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const CurrentLayout = router.pathname.includes('home') ? GuestLayout : Layout; 

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Hack FS 2021"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <CurrentLayout>
            <Component {...pageProps} />
          </CurrentLayout>
        </ThemeProvider>
      </MuiThemeProvider>
    </>
  )
}

export default MyApp;
