import styles from './ResultItem.module.scss';
import { Component } from 'react';
import type { ReactNode } from 'react';
import { Character } from '../../../shared/types/types';

interface ResultItemProps {
  itemData: Character;
}

export class ResultItem extends Component<ResultItemProps> {
  render(): ReactNode {
    const arrItemData: [string, number | string | null][] = Object.entries(
      this.props.itemData
    );
    let textDescription = '';

    for (let i = 0; i < arrItemData.length; i += 1) {
      if (arrItemData[i][0] === 'uid') {
        i += 2;
      }
      if (arrItemData[i][1]) {
        textDescription += `${arrItemData[i][0]}: ${arrItemData[i][1]}, `;
      }
    }

    return (
      <li className={styles.container}>
        <p className={styles.name}>{this.props.itemData.name}</p>
        <p className={styles.description}>{textDescription}</p>
      </li>
    );
  }
}
