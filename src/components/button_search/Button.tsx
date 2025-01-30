import { Component } from 'react';
import type { ReactNode } from 'react';
import styles from './index.module.css';

export class ButtonSearch extends Component {
  render(): ReactNode {
    return <button className={styles.button}>Search</button>;
  }
}
