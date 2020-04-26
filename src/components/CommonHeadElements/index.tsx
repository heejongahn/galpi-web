import React from 'react';

interface Props {
  title?: string;
  description?: string;
  url?: string;
}

export default function CommonHeadElements({ title, description, url }: Props) {
  return (
    <>
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
      {url != null ? (
        <>
          <meta property="og:url" content={url} />
          <meta name="twitter:url" content={url} />
        </>
      ) : null}
    </>
  );
}
