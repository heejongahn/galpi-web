import Head from 'next/head';

interface Props {
  title?: string;
  description?: string;
}

export default function CommonHeadElements({ title, description }: Props) {
  return (
    <Head>
      {title != null ? (
        <>
          <title>{title}</title>
          <meta name="twitter:title" content={title} />
          <meta property="og:title" title={title} />
        </>
      ) : null}
      {description != null ? (
        <>
          <meta name="description" content={description}></meta>
          <meta name="twitter:description" content={description} />
          <meta property="og:description" content={description} />
        </>
      ) : null}
    </Head>
  );
}
