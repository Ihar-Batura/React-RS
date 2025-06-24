import { Component } from 'react';
import type { ReactNode } from 'react';
import styles from './Main.module.scss';

export class Main extends Component {
  render(): ReactNode {
    return (
      <main className={styles.main}>
        <div className={styles.wrapper}></div>
      </main>
    );
  }
}
