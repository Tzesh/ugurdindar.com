// General constants for the portfolio website
export const developer = 'Uğur Dindar';
export const website = 'ugurdindar.com';
export const username = 'tzesh';

// SEO constants
export const title = `${developer} - ${website}`;
export const description = 'Portfolio of Uğur Dindar, a.k.a Tzesh';
export const keywords = 'Uğur, Dindar, Tzesh, Portfolio, ugurdindar, ugurdindar.com, vscode-portfolio, vscode, portfolio';
export const ogImage = 'https://imgur.com/xpLZHs0.png';
export const websiteUrl = 'https://ugurdindar.com';

// Homepage constants
export const developerTitle = 'Software Engineer';

// Explorer items
export const explorerItems = [
  {
    name: 'home.jsx',
    path: '/',
    icon: 'react_icon.svg',
  },
  {
    name: 'about.html',
    path: '/about',
    icon: 'html_icon.svg',
  },
  {
    name: 'github.md',
    path: '/github',
    icon: 'markdown_icon.svg',
  },
  {
    name: 'contact.css',
    path: '/contact',
    icon: 'css_icon.svg',
  }
];

// About page content
export const aboutBody = [
  {
    tag: 'h1',
    title: 'Who am I?',
    content: 'An ordinary person who interested in Computer Science & Technologies since childhood and also a graduate from Eskişehir Technical University. I have been known as Tzesh which is my nickname. I am striving to improve my knowledge by developing, staying up-to-date, and learning new things day by day.',
  },
  {
    tag: 'h2',
    title: 'My Resume',
    content: 'If you want to seek more information about me, you can check my resume.',
  }
];

// Contact page content
export const contacts = [
  {
    social: 'email',
    link: 'mail@' + website,
    href: 'mailto:mail@' + website,
  },
  {
    social: 'github',
    link: username,
    href: 'https://github.com/' + username,
  },
  {
    social: 'linkedin',
    link: 'ugurdindar',
    href: 'https://www.linkedin.com/in/ugurdindar',
  },
  {
    social: 'steam',
    link: 'tzesh',
    href: 'https://steamcommunity.com/id/tzesh',
  }
];

// Bottombar link
export const bottombarLink = 'https://github.com/tzesh/ugurdindar.com';