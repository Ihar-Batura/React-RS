import styles from './Spinner.module.scss';
import { Component } from 'react';
import type { ReactNode } from 'react';

export class Spinner extends Component {
  render(): ReactNode {
    return (
      <div className={styles.container}>
        <span className={styles.spinner} />
      </div>
    );
  }
}
