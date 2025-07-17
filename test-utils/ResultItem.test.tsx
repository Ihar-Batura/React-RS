import { render, screen, fireEvent } from '@testing-library/react';
import { ResultItem } from '../src/components/ui/result/ResultItem';
import { Character } from '../src/shared/types/types';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '../src/context/ThemeProvider';

describe('Result Item Component', () => {
  const mockCharacter: Character = {
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
  };

  const mockStore = configureStore({
    reducer: {
      selectedItems: (state = { selectedItems: [] }) => state,
    },
  });

  const handleSelect = vi.fn();

  const renderResultItem = () => {
    return render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <ResultItem itemData={mockCharacter} onSelect={handleSelect} />
        </ThemeProvider>
      </Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders result item component with correct structure', () => {
    renderResultItem();

    const container = screen.getByRole('listitem');
    const name = screen.getByText(mockCharacter.name);
    const description = screen.getByText(/yearOfBirth: 2000/i);
    const checkbox = screen.getByRole('checkbox');

    expect(container).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
  });

  it('display the correct name', () => {
    renderResultItem();

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
  });

  it('generate the description correctly', () => {
    renderResultItem();

    expect(screen.getByText(/gender: M/i)).toBeInTheDocument();
    expect(screen.getByText(/yearOfBirth: 2000/i)).toBeInTheDocument();
  });

  it('does not include name and uid in the description', () => {
    renderResultItem();

    const description =
      screen.getByText(/yearOfBirth: 2000/i).textContent || '';

    expect(description).not.toContain('name');
    expect(description).not.toContain('uid');
  });

  it('clicked on the card', () => {
    renderResultItem();

    const container = screen.getByRole('listitem');

    fireEvent.click(container);
  });

  it('render N/A for undefined or null fields', () => {
    renderResultItem();

    expect(screen.getByText(/height: N\/A/i)).toBeInTheDocument();
  });

  it('handles checkbox click without triggering card click', () => {
    renderResultItem();
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);
    expect(handleSelect).not.toHaveBeenCalled();
  });
});
