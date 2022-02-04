import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from 'next/app';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';

import '../styles/reset.scss';
import { MediaContextProvider } from '../components/Media';
import { FirebaseContextProvider } from '../context/FirebaseContext';

const queryClient = new QueryClient();

const fontFamily = `Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR',
'Malgun Gothic', sans-serif`;

const theme = extendTheme({
  fonts: {
    heading: fontFamily,
    body: fontFamily,
  },
});

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Head>
            <link
              rel="stylesheet"
              type="text/css"
              href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css"
            />
            <meta
              name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
            />
            <meta name="twitter:creator" content="갈피" />
            <meta name="twitter:site" content="@galpi_official" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta
              name="twitter:image"
              content="https://web.galpi.world/og.png"
            />

            <meta property="og:locale" content="ko_kR" />
            <meta property="og:site_name" content="갈피" />
            <meta
              property="og:image"
              content="https://web.galpi.world/og.png"
            />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
          </Head>
          <FirebaseContextProvider>
            <MediaContextProvider>
              <Component {...pageProps} />
            </MediaContextProvider>
          </FirebaseContextProvider>
        </QueryClientProvider>
      </ChakraProvider>
    );
  }
}

MyApp.getInitialProps = async ({ ctx }) => {
  const { req } = ctx;

  if (req) {
    return { pageProps: { isServer: true } };
  } else {
    return { pageProps: { isServer: false } };
  }
};

export default withRouter(MyApp);
