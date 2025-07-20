import { render, screen } from '@testing-library/react';
import { Results } from '../src/components/common/results/Results';
import { CharactersResponse } from '../src/shared/types/types';

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
      performers: [[]],
      episodes: [[]],
      movies: [[]],
      characterSpecies: [[]],
      characterRelations: [[]],
      titles: [[]],
      occupations: [[]],
      organizations: [[]],
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

describe('Results Component', () => {
  it('should render Spinner when isLoading = true', () => {
    render(<Results data={null} isError={false} isLoading={true} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should display an error message if isError = true', () => {
    render(<Results data={null} isError={true} isLoading={false} />);
    expect(
      screen.getByText(/Ooops! Error getting characters collection/i)
    ).toBeInTheDocument();
  });

  it('should display "Nothing found" if there is no data and isError = false', () => {
    render(<Results data={null} isError={false} isLoading={false} />);
    expect(screen.getByText(/Nothing found!/i)).toBeInTheDocument();
  });

  it('render results component with correct structure', () => {
    render(
      <Results data={mockCharactersData} isError={false} isLoading={false} />
    );
    expect(screen.getByText('Character:')).toBeInTheDocument();
    expect(screen.getByText('Description:')).toBeInTheDocument();
  });
});
