import styles from '../styles/ContactCode.module.css';

const contactItems = [
  {
    social: 'website',
    link: 'onurdindar.com',
    href: 'https://onurdindar.com',
  },
  {
    social: 'email',
    link: 'mail@onurdindar.com',
    href: 'mailto:mail@onurdindar.com',
  },
  {
    social: 'github',
    link: 'lobeario',
    href: 'https://github.com/lobeario',
  },
  {
    social: 'linkedin',
    link: '0nurdindar',
    href: 'https://www.linkedin.com/in/0nurdindar/',
  }
];

const ContactCode = () => {
  return (
    <div className={styles.code}>
      <p className={styles.line}>
        <span className={styles.className}>.socials</span> &#123;
      </p>
      {contactItems.slice(0, 4).map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;&nbsp;{item.social}:{' '}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
          ;
        </p>
      ))}
      {contactItems.slice(4, contactItems.length).map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;{item.social}:{' '}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
          ;
        </p>
      ))}
      <p className={styles.line}>&#125;</p>
    </div>
  );
};

export default ContactCode;
