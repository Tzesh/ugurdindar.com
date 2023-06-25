import styles from '../styles/ContactCode.module.css';

const contactItems = [
  {
    social: 'website',
    link: 'ugurdindar.com',
    href: 'https://ugurdindar.com',
  },
  {
    social: 'email',
    link: 'mail@ugurdindar.com',
    href: 'mailto:mail@ugurdindar.com',
  },
  {
    social: 'github',
    link: 'tzesh',
    href: 'https://github.com/tzesh',
  },
  {
    social: 'linkedin',
    link: 'ugurdindar',
    href: 'https://www.linkedin.com/in/ugurdindar/',
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
