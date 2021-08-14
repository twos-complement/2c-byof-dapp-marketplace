import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@emotion/react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import theme from '../util/theme'
import Layout from '../components/Layout'
import withIdx from '../components/hoc/withIdx'
import withData from '../components/hoc/withData'

function MyApp({ Component, pageProps }) {
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
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </MuiThemeProvider>
    </>
  )
}

export default withIdx(withData(MyApp));
