import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SearchPage } from '../src/pages/search/SearchPage';

describe('Search Page Component', () => {
  it('render search page component', () => {
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );

    const container = screen.getByRole('main');
    expect(container).toBeInTheDocument();
  });
});
