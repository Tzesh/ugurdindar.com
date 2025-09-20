import styles from '../styles/AboutPage.module.css';
import { aboutBody } from '../constants/constants';

const AboutPage = () => {
  return (
    <div className={styles.fancyContainer}>
      {aboutBody.map((item, index) => (
        <div className={styles.card} key={index}>
          <h2 className={styles.heading}>&lt;{item.tag}&gt; {item.title} &lt;/{item.tag}&gt;</h2>
          <p className={styles.content}>&lt;p&gt;{item.content}&lt;/p&gt;</p>
        </div>
      ))}
      <div className={styles.resumeWrapper}>
        <a className={styles.resumeButton} href='/resume.pdf' target='_blank' rel='noopener'>
          Click here to see my resume
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
