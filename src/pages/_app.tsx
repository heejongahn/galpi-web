import App from 'next/app';
import Head from 'next/head';
import { withRouter } from 'next/router';

import '../styles/reset.scss';
import { MediaContextProvider } from '../components/Media';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <link
            rel="stylesheet"
            href="//fonts.googleapis.com/css?family=Lato:300,300italic,400,400italic,700,700italic|Noto Serif KR:300,300italic,400,400italic,700,700italic&subset=latin,latin-ext"
          />
          <meta
            name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
          />
          <meta name="twitter:creator" content="갈피" />
          <meta name="twitter:site" content="@galpi_official" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content="https://web.galpi.world/og.png" />

          <meta property="og:locale" content="ko_kR" />
          <meta property="og:site_name" content="갈피" />
          <meta property="og:image" content="https://web.galpi.world/og.png" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </Head>
        <MediaContextProvider>
          <Component {...pageProps} />
        </MediaContextProvider>
      </>
    );
  }
}

export default withRouter(MyApp);
