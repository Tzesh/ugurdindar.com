import Head from 'next/head';

const CustomHead = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="Portfolio of Onur Dindar, a.k.a "
      />
      <meta
        name="keywords"
        content="Onur, Dindar, Lobear, Portfolio, onurdindar, onurdindar.com, vscode-portfolio, vscode, portfolio"
      />
      <meta property="og:title" content="Onur Dindar Portfolio" />
      <meta
        property="og:description"
        content="Portfolio of Onur Dindar, a.k.a Lobear"
      />
      <meta property="og:image" content="https://imgur.com/xpLZHs0.png" />
      <meta property="og:url" content="https://onurdindar.com" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default CustomHead;

CustomHead.defaultProps = {
  title: 'Onur Dindar | Portfolio',
};
