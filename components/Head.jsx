import Head from 'next/head';

const CustomHead = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="Portfolio of Uğur Dindar, a.k.a Tzesh"
      />
      <meta
        name="keywords"
        content="Uğur, Dindar, Tzesh, Portfolio, ugurdindar, ugurdindar.com, vscode-portfolio, vscode, portfolio"
      />
      <meta property="og:title" content="Uğur Dindar Portfolio" />
      <meta
        property="og:description"
        content="Portfolio of Uğur Dindar, a.k.a Tzesh"
      />
      <meta property="og:image" content="https://imgur.com/xpLZHs0.png" />
      <meta property="og:url" content="https://ugurdindar.com" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default CustomHead;

CustomHead.defaultProps = {
  title: 'Nitin Ranganath',
};
