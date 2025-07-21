import { render, screen } from '@testing-library/react';
import { CharacterDetails } from '../src/components/ui/character/CharacterDetails';
import { Character } from '../src/shared/types/types';

const mockCharacterData: Character = {
  uid: 'CHMA0000009075',
  name: 'Spock',
  gender: 'M',
  yearOfBirth: 2230,
  monthOfBirth: null,
  dayOfBirth: null,
  placeOfBirth: null,
  yearOfDeath: null,
  monthOfDeath: null,
  dayOfDeath: null,
  placeOfDeath: null,
  height: null,
  weight: null,
  deceased: null,
  bloodType: null,
  maritalStatus: 'MARRIED',
  serialNumber: null,
  hologramActivationDate: null,
  hologramStatus: null,
  hologramDateStatus: null,
  hologram: false,
  fictionalCharacter: false,
  mirror: true,
  alternateReality: false,
  performers: [],
  episodes: [],
  movies: [],
  characterSpecies: [],
  characterRelations: [],
  titles: [],
  occupations: [
    {
      uid: 'CHMA00000090751',
      name: 'USA',
      legalOccupation: false,
      medicalOccupation: true,
      scientificOccupation: true,
    },
  ],
  organizations: [],
};

describe('CharacterDetails Component', () => {
  it('renders correct character details structure', () => {
    render(<CharacterDetails character={mockCharacterData} />);

    const container = screen.getByRole('container');
    expect(container).toBeInTheDocument();
    expect(container.tagName).toBe('DIV');

    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Character Information:');

    const sections = screen.getAllByTestId('character-section');
    expect(sections.length).toBe(6);
  });

  it('renders message when no character is provided', () => {
    render(<CharacterDetails character={null} />);

    const errorMessage = screen.getByText(
      /Character information with this UID not found!/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders all section titles correctly ', () => {
    render(<CharacterDetails character={mockCharacterData} />);

    expect(screen.getByText(/Performers:/i)).toBeInTheDocument();
    expect(screen.getByText(/Episodes:/i)).toBeInTheDocument();
    expect(screen.getByText(/Movies:/i)).toBeInTheDocument();
    expect(screen.getByText(/Occupations:/i)).toBeInTheDocument();
    expect(screen.getByText(/Species:/i)).toBeInTheDocument();
    expect(screen.getByText(/Organizations:/i)).toBeInTheDocument();
  });

  it('renders section correctly when character data is provided', () => {
    render(<CharacterDetails character={mockCharacterData} />);

    const descriptionWithLink = screen.getByText(/Character Information/i);
    expect(descriptionWithLink).toBeInTheDocument();

    expect(screen.getByText(/USA/i)).toBeInTheDocument();
  });

  it('renders section correctly when character data is partial presence of', () => {
    render(<CharacterDetails character={mockCharacterData} />);

    const descriptionWithLink = screen.getByText(/Character Information/i);
    expect(descriptionWithLink).toBeInTheDocument();

    expect(screen.getByText(/Performers:/i)).toBeInTheDocument();
    expect(
      screen.getByText(/No performer information available/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Episodes:/i)).toBeInTheDocument();
    expect(
      screen.getByText(/This character does not appear in any episodes/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Movies:/i)).toBeInTheDocument();
    expect(
      screen.getByText(/This character does not appear in any movies/i)
    ).toBeInTheDocument();
  });

  it('renders organizations section correctly', () => {
    const characterWithOrganizations: Character = {
      ...mockCharacterData,
      organizations: [
        {
          uid: 'ORF001',
          name: 'Starfleet',
          government: false,
          intergovernmentalOrganization: false,
          researchOrganization: false,
          sportOrganization: false,
          medicalOrganization: false,
          militaryOrganization: false,
          militaryUnit: false,
          governmentAgency: false,
          lawEnforcementAgency: false,
          prisonOrPenalColony: false,
          mirror: false,
          alternateReality: false,
        },
      ],
    };
    render(<CharacterDetails character={characterWithOrganizations} />);
    expect(screen.getByText(/Organizations:/i)).toBeInTheDocument();
    expect(screen.getByText(/Starfleet/i)).toBeInTheDocument();
  });

  it('renders species section correctly', () => {
    const characterWithSpecies: Character = {
      ...mockCharacterData,
      characterSpecies: [
        {
          uid: 'SPEC000001',
          name: 'Vulcan',
          numerator: 1,
          denominator: 2,
        },
      ],
    };
    render(<CharacterDetails character={characterWithSpecies} />);
    expect(screen.getByText(/Species:/i)).toBeInTheDocument();
    expect(screen.getByText(/Vulcan — 1\/2/i)).toBeInTheDocument();
  });

  it('renders movies section correctly', () => {
    const characterWithMovies: Character = {
      ...mockCharacterData,
      movies: [
        {
          uid: 'MO000001',
          title: 'Star Trek: The Motion Picture',
          yearFrom: 1979,
          mainDirector: {
            uid: 'DIR000001',
            name: 'Robert Wise',
          },
          titleBulgarian: 'Robert Wise',
          titleCatalan: null,
          titleChineseTraditional: 'Robert',
          titleGerman: 'Robert',
          titleItalian: 'Robert',
          titleJapanese: 'Robert',
          titlePolish: 'Robert',
          titleRussian: 'Robert',
          titleSerbian: 'Robert',
          titleSpanish: 'Robert',
          stardateFrom: 1980,
          stardateTo: 1982,
          yearTo: 2000,
          usReleaseDate: 'Robert',
        },
      ],
    };
    render(<CharacterDetails character={characterWithMovies} />);
    expect(screen.getByText(/Movies:/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Star Trek: The Motion Picture/i)
    ).toBeInTheDocument();
  });
});
