import styles from '../styles/AboutPage.module.css';

const contactItems = [
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

const AboutPage = () => {
  return (
    <div className={styles.code}>
      {contactItems.slice(0, contactItems.length).map((item, index) => (
        <div>
          <p className={styles.line} key={index}>
            &lt;{item.tag}&gt;{item.title}&lt;/{item.tag}&gt;
          </p>
          <p className={styles.line} key={index + 1}>
            &lt;p&gt;{item.content}&lt;/p&gt;
          </p>
        </div>
      ))}
      <div>
        <a className={styles.line} href='/resume.pdf' target='_blank' rel='noopener'>
          &lt;a href="/resume.pdf" target="_blank" rel="noopener"&gt;Click here to see my resume&lt;/a&gt;
        </a>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'About' },
  };
}

export default AboutPage;
