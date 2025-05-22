import Head from 'next/head';

interface SeoHeadProps {
  readonly title: string;
  readonly description: string;
  readonly canonicalUrl?: string;
  readonly author?: string;
  readonly url?: string;
  readonly linkedInUrl?: string;
  readonly twitterUrl?: string;
  readonly faceBookUrl?: string;
  readonly keywords?: string;
  readonly website?: string;
  readonly preconnect?: string;
}

export function SeoHead({
  title,
  description,
  canonicalUrl,
  author,
  url,
  linkedInUrl,
  twitterUrl,
  faceBookUrl,
  keywords,
  website,
  preconnect,
}: Readonly<SeoHeadProps>) {
  if (!title) {
    return null;
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <meta name="author" content={author} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="all follow" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Facebook */}
      {faceBookUrl && <meta property="fb:app_id" content={faceBookUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={twitterUrl} />
      <meta name="twitter:site" content="@twitterusername" />

      {/* LinkedIn */}
      <meta property="linkedin:title" content={title} />
      <meta property="linkedin:description" content={description} />
      <meta property="linkedin:url" content={linkedInUrl} />

      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="google-site-verification" content="" />
      {preconnect && <link rel="preconnect" href={preconnect} />}
      {website && <link rel="dns-prefetch" href={website} />}
    </Head>
  );
}

export default SeoHead;
