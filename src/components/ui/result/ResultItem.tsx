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

    arrItemData.forEach((el) => {
      if (el[0] !== 'name' && el[0] !== 'uid') {
        if (el[1] === null || el[1] === undefined) {
          textDescription += `${el[0]}: 'N/A', `;
        } else {
          textDescription += `${el[0]}: ${el[1]}, `;
        }
      }
    });

    return (
      <li className={styles.container}>
        <p className={styles.name}>{this.props.itemData.name}</p>
        <p className={styles.description}>{textDescription}</p>
      </li>
    );
  }
}
