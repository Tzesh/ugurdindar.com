import Link from 'next/link';
import Illustration from '../components/Illustration';
import styles from '../styles/HomePage.module.css';

export default function HomePage() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.background}>
          <h1>A.K.A</h1>
          <h1>LOBEAR</h1>
        </div>
        <div className={styles.foreground}>
          <div className={styles.content}>
            <h1 className={styles.name}>Onur Dindar</h1>
            <h6 className={styles.bio}>Computer Engineering Student</h6>
            <Link href="/about">
              <button className={styles.button}>About</button>
            </Link>
            <Link href="/github">
              <button className={styles.outlined}>Projects</button>
            </Link>
          </div>
          <Illustration className={styles.illustration} />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { title: 'Home' },
  };
}
