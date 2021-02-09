import React from 'react';

import Document, { Html, Head, Main, NextScript } from 'next/document';

import { ServerStyleSheets } from '@material-ui/core/styles';
import colors from '../styles/colors';

/*
 * Controls the app's <html> and <body> tags.
 * Docs: https://nextjs.org/docs/advanced-features/custom-document
 */
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/birdie.png" />
        </Head>
        <body style={{ backgroundColor: colors.gray.l96 }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  /*
   * Decorate renderPage with Material ServerStyleSheets so the server renders custom Material styles
   * Material Docs: https://material-ui.com/guides/server-rendering/
   * Next Docs: https://nextjs.org/docs/advanced-features/custom-document#customizing-renderpage
   */
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
