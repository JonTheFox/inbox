import styles from "../styles/Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>Created by</span>
      <a
        href="https://www.linkedin.com/in/jonathan-weiss-45010295/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Jonathan Weiss
      </a>
    </footer>
  );
}
