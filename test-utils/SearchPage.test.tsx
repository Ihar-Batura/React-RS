import { render, screen } from '@testing-library/react';
import { SearchPage } from '../src/pages/search/SearchPage';

describe('Search Page Component', () => {
  it('render search page component', () => {
    render(<SearchPage />);

    const container = screen.getByRole('main');
    expect(container).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /Error Button/i });
    expect(button).toBeInTheDocument();
  });
});
