import { Component } from 'react';
import type { ReactNode } from 'react';
import styles from './Footer.module.scss';

export class Footer extends Component {
  render(): ReactNode {
    return (
      <footer className={styles.footer}>
        <div className={styles.wrapper}>
          <p className={styles.year}>© 2025</p>
          <a
            className={styles.link}
            href="https://github.com/Ihar-Batura"
            target="_blank"
            rel="noreferrer"
          >
            Ihar Batura
          </a>
        </div>
      </footer>
    );
  }
}
