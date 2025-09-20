import Head from 'next/head';
import { developer, websiteUrl, description, keywords, title, ogImage } from '../constants/constants';

const CustomHead = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="canonical" href={websiteUrl} />
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="author" content={developer} />
      <meta name="robots" content="index, follow" />
      <meta
        name="description"
        content={description}
      />
      <meta
        name="keywords"
        content={keywords}
      />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={description}
      />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={websiteUrl} />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:url" content={websiteUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="content-language" content="en" />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: title,
          url: websiteUrl,
          image: ogImage,
          description: description,
          sameAs: [websiteUrl],
        })}
      </script>
    </Head>
  );
};

export default CustomHead;

CustomHead.defaultProps = {
  title: title,
};
