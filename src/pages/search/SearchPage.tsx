import { Component } from 'react';
import type { ReactNode } from 'react';
import styles from './SearchPage.module.scss';
import { Search } from '../../components/common/search/Search';
import { Results } from '../../components/common/results/Results';
import { apiSearchCharacters } from '../../shared/api/apiSearchCharacters';
import { CharactersResponse } from '../../shared/types/types';
import getLastSearchTermFromLS from '../../shared/ls/getLastSearchTermFormLS';

interface SearchPageState {
  searchTerm: string;
  searchResults: CharactersResponse | null;
  searchError: boolean;
  isLoading: boolean;
  hasTestError: boolean;
}

export class SearchPage extends Component {
  state: SearchPageState = {
    searchTerm: '',
    searchResults: null,
    searchError: false,
    isLoading: false,
    hasTestError: false,
  };

  componentDidMount(): void {
    const lastTerm = getLastSearchTermFromLS();
    const term = lastTerm ?? '';
    this.handleSearch(term);
  }

  handleSearch = async (term: string): Promise<void> => {
    this.setState({ isLoading: true });
    try {
      const results = await apiSearchCharacters(term.trim());

      this.setState({
        searchResults: results,
        searchTerm: term,
      });
    } catch (error) {
      console.error('Failed to fetch characters:', error);
      this.setState({ searchError: true });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  throwTestError = (): void => {
    this.setState({
      hasTestError: true,
    });
  };

  render(): ReactNode {
    if (this.state.hasTestError) {
      throw new Error("Don't worry this a test error");
    }
    return (
      <main className={styles.container}>
        <div className={styles.wrapper}>
          <Search onSearch={this.handleSearch} />
          <Results
            data={this.state.searchResults}
            isError={this.state.searchError}
            isLoading={this.state.isLoading}
          />
          <button className={styles.button} onClick={this.throwTestError}>
            Error Button
          </button>
        </div>
      </main>
    );
  }
}
