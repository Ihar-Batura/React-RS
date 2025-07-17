import { render, screen } from '@testing-library/react';
import { SearchPage } from '../src/pages/search/SearchPage';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from '../src/context/ThemeProvider';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import selectedItemsSlice from '../src/store/selectedItemsSlice';

const mockStore = configureStore({
  reducer: {
    selectedItems: selectedItemsSlice,
  },
});

describe('Search Page Component', () => {
  const renderSearchPage = () => {
    return render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <BrowserRouter>
            <SearchPage />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  };

  it('render search page component', () => {
    renderSearchPage();

    const container = screen.getByRole('main');
    expect(container).toBeInTheDocument();
  });
});
