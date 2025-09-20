import Link from 'next/link';
import Illustration from '../components/Illustration';
import styles from '../styles/HomePage.module.css';
import { developer, developerTitle, username} from '../constants/constants';

export default function HomePage() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.background}>
          <h1 className={styles.aka}>A.K.A</h1>
          <h1>{username}</h1>
        </div>
        <div className={styles.foreground}>
          <div className={styles.content}>
            <h1 className={styles.name}>{developer}</h1>
            <h6 className={styles.bio}>{developerTitle}</h6>
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
