import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../styles/theme';
import '../styles/responsive-fonts.css';

import Head from 'next/head';
import type { AppProps /*, AppContext */ } from 'next/app';
/*
 * Controls the initialization of pages.
 * Docs: https://nextjs.org/docs/advanced-features/custom-app
 */

export default function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Read Tweet</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
          key="viewport-meta"
        ></meta>
      </Head>
      <ThemeProvider theme={theme}>
        {/* CSS Reset */}
        <CssBaseline />
        {/* <Header /> */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
