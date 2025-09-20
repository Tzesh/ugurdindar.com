import styles from '../styles/AboutPage.module.css';

const contactItems = [
  {
    tag: 'h1',
    title: 'About?',
    content: 'A computer engineering student at Izmir Institute of Technology who is interested in computers since childhood. I am striving to improve myself in the field of software development.'
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
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'About' },
  };
}

export default AboutPage;
