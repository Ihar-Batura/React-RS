import styles from './Search.module.scss';
import { Component } from 'react';
import type { ReactNode } from 'react';
import { LocalStorageService } from '../../../shared/ls/localStorageService';

interface SearchProps {
  onSearch: (term: string) => void;
}

export class Search extends Component<SearchProps> {
  state = {
    term: '',
  };

  storageService = new LocalStorageService();

  constructor(props: SearchProps) {
    super(props);

    const lastTerm = this.storageService.getLastSearchTerm();
    if (lastTerm) {
      this.state = {
        term: lastTerm,
      };
    }
  }

  handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      term: e.target.value,
    });
  };

  handleClickSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.storageService.setLastSearchTerm(this.state.term);
    this.props.onSearch(this.state.term);
  };

  render(): ReactNode {
    return (
      <div className={styles.container}>
        <input
          className={styles.input}
          value={this.state.term}
          onChange={this.handleTermChange}
        ></input>
        <button className={styles.button} onClick={this.handleClickSearch}>
          Search
        </button>
      </div>
    );
  }
}
