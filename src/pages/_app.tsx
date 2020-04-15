import App from 'next/app';
import Head from 'next/head';

import '../styles/reset.scss';

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
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
