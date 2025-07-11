import { render, screen } from '@testing-library/react';
import { Results } from '../src/components/common/results/Results';
import { CharactersResponse } from '../src/shared/types/types';
import { ThemeProvider } from '../src/context/ThemeProvider';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemsSlice from '../src/store/selectedItemsSlice';

const mockCharactersData: CharactersResponse = {
  characters: [
    {
      uid: '1Y7p',
      name: 'Olympic',
      gender: 'M',
      yearOfBirth: 2000,
      monthOfBirth: 1,
      dayOfBirth: 1,
      placeOfBirth: 'Moon',
      yearOfDeath: null,
      monthOfDeath: null,
      dayOfDeath: null,
      placeOfDeath: null,
      height: null,
      weight: null,
      deceased: false,
      bloodType: null,
      maritalStatus: null,
      serialNumber: null,
      hologramActivationDate: null,
      hologramStatus: 'No',
      hologramDateStatus: null,
      hologram: true,
      fictionalCharacter: true,
      mirror: true,
      alternateReality: true,
      performers: [],
      episodes: [],
      movies: [],
      characterSpecies: [],
      characterRelations: [],
      titles: [],
      occupations: [],
      organizations: [],
    },
  ],
  page: {
    firstPage: true,
    lastPage: false,
    numberOfElements: 1,
    pageNumber: 0,
    pageSize: 100,
    totalElements: 1,
    totalPages: 1,
  },
  sort: {
    clauses: [],
  },
};

const mockStore = configureStore({
  reducer: {
    selectedItems: selectedItemsSlice,
  },
});

const mockOnSelectCharacter = vi.fn();

const renderResults = (props: {
  data: CharactersResponse | null;
  isError: boolean;
  isLoading: boolean;
}) => {
  return render(
    <Provider store={mockStore}>
      <ThemeProvider>
        <Results
          data={props.data}
          isError={props.isError}
          isLoading={props.isLoading}
          onSelectCharacter={mockOnSelectCharacter}
        />
      </ThemeProvider>
    </Provider>
  );
};

describe('Results Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('render results component with correct structure', () => {
    renderResults({
      data: mockCharactersData,
      isError: false,
      isLoading: false,
    });

    expect(screen.getByText('Character:')).toBeInTheDocument();
    expect(screen.getByText('Description:')).toBeInTheDocument();
  });

  it('should render Spinner when isLoading = true', () => {
    renderResults({ data: null, isError: false, isLoading: true });

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should display an error message if isError = true', () => {
    renderResults({ data: null, isError: true, isLoading: false });

    expect(
      screen.getByText(/Ooops! Error getting characters collection/i)
    ).toBeInTheDocument();
  });

  it('should display "Nothing found" if there is no data and isError = false', () => {
    renderResults({ data: null, isError: false, isLoading: false });

    expect(screen.getByText(/Nothing found!/i)).toBeInTheDocument();
  });
});
