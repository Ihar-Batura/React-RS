import { Component } from 'react';
import type { ReactNode } from 'react';
import styles from './index.module.css';

export class Header extends Component {
  render(): ReactNode {
    return (
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <h1 className={styles.logo}>Star Wars</h1>
        </div>
      </header>
    );
  }
}
