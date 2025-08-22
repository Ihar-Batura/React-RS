import { render, screen } from '@testing-library/react';
import { Main } from '../src/components/layout/main/Main';
import { vi } from 'vitest';
import { useSelector } from 'react-redux';
import type { FormValues } from '../src/types/types';
import type { Gender } from '../src/types/types';

vi.mock('../../public/placeholder.png', () => 'mock-placeholder.png');

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

const mockUseSelector = vi.mocked(useSelector);

describe('Main Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithEntries = (entries: FormValues[]) => {
    mockUseSelector.mockImplementation((callback) => {
      return callback({
        forms: { formEntries: entries },
      });
    });
    render(<Main />);
  };

  it('renders empty message when no form data is available', () => {
    renderWithEntries([]);

    const emptyMessage = screen.getByText(/No form data yet!/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it('renders a list of form entries when data is available', () => {
    const mockEntries = [
      {
        name: 'Jac',
        age: 25,
        email: 'jac@mail.ru',
        password: '@Password123!',
        gender: 'male' as Gender,
        acceptedTerms: true,
        country: 'United States',
        profilePicture: 'iVBORw0KGgoANSUhEI...',
      },
    ];

    renderWithEntries(mockEntries);

    expect(screen.getByText('Jac')).toBeInTheDocument();
    expect(screen.getByText('Age: 25')).toBeInTheDocument();
    expect(screen.getByText('Email: jac@mail.ru')).toBeInTheDocument();
    expect(screen.getByText('Password: @Password123!')).toBeInTheDocument();
    expect(screen.getByText('Gender: male')).toBeInTheDocument();
    expect(screen.getByText('Accepted Terms: Yes')).toBeInTheDocument();
    expect(screen.getByText('Country: United States')).toBeInTheDocument();

    const images = screen.getAllByAltText('Profile Picture');
    expect(images).toHaveLength(1);
    expect(images[0]).toHaveAttribute('src', 'iVBORw0KGgoANSUhEI...');
  });
});
