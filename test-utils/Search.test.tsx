import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from '../src/components/common/search/Search';
import getLastSearchTermFromLS from '../src/shared/ls/getLastSearchTermFormLS';
import setLastSearchTermToLS from '../src/shared/ls/setLastSearchTermToLS';
import { ThemeProvider } from '../src/context/ThemeProvider';

describe('Search Component', () => {
  const mockOnSearch = vi.fn();

  vi.mock('../src/shared/ls/setLastSearchTermToLS', () => ({
    default: vi.fn(),
  }));

  vi.mock('../src/shared/ls/getLastSearchTermFormLS', () => ({
    default: vi.fn(),
  }));

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  const renderSearchComponent = () => {
    return render(
      <ThemeProvider>
        <Search onSearch={mockOnSearch} />
      </ThemeProvider>
    );
  };

  it('renders search component with correct structure', () => {
    renderSearchComponent();

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
  });

  it('load last search term from localStorage if exists', () => {
    vi.mocked(getLastSearchTermFromLS).mockReturnValueOnce('saved query');

    renderSearchComponent();

    const input = screen.getByRole('textbox');

    expect((input as HTMLInputElement).value).toBe('saved query');
  });

  it('updates input value on user typing', () => {
    renderSearchComponent();

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test query' } });

    expect((input as HTMLInputElement).value).toBe('test query');
  });

  it('calls onSearch with correct term when button is clicked', () => {
    renderSearchComponent();

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'react' } });

    const button = screen.getByRole('button', { name: /Search/i });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('react');
  });

  it('save search term to localStorage when button is clicked', () => {
    renderSearchComponent();

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'localStorage test' } });

    const button = screen.getByRole('button', { name: /Search/i });
    fireEvent.click(button);

    expect(setLastSearchTermToLS).toHaveBeenCalledWith('localStorage test');
  });
});
