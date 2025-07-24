import { render, screen } from '@testing-library/react';
import { SearchPage } from '../src/pages/search/SearchPage';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from '../src/context/ThemeProvider';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import selectedItemsSlice from '../src/store/selectedItemsSlice';
import { characterApi } from '../src/store/apiSlice';

const mockStore = configureStore({
  reducer: {
    selectedItems: selectedItemsSlice,
    [characterApi.reducerPath]: characterApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(characterApi.middleware),
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

    const searchInput = screen.getByPlaceholderText(/Enter character name/i);
    expect(searchInput).toBeInTheDocument();

    const searchButton = screen.getByRole('button', { name: /Search/i });
    expect(searchButton).toBeInTheDocument();
  });
});
