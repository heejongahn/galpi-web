import App from 'next/app';
import Head from 'next/head';
import { withRouter } from 'next/router';

import '../styles/reset.scss';
import CommonHeadElements from '../components/CommonHeadElements';

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    const host = process.env.HOST;
    const url = `${host}${router.asPath}`;

    const title = '갈피';
    const description = '갈피는 아름다운 독후감 관리 앱입니다.';
    const ogImageUrl = `${host}/og.png`;

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
          <CommonHeadElements
            title={title}
            description={description}
            url={url}
          />
          <meta name="twitter:creator" content="갈피" />
          <meta name="twitter:site" content="@galpi_official" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={ogImageUrl} />

          <meta property="og:locale" content="ko_kR" />
          <meta property="og:site_name" content="갈피" />
          <meta property="og:image" content={ogImageUrl} />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}

export default withRouter(MyApp);
