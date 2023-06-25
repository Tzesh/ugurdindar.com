import Tab from './Tab';
import styles from '../styles/Tabsbar.module.css';

const Tabsbar = () => {
  return (
    <div className={styles.tabs}>
      <Tab icon="/react_icon.svg" filename="home.jsx" path="/" />
      <Tab icon="/html_icon.svg" filename="about.html" path="/about" />
      <Tab icon="/markdown_icon.svg" filename="github.md" path="/github" />
      <Tab icon="/css_icon.svg" filename="contact.css" path="/contact" />
    </div>
  );
};

export default Tabsbar;
