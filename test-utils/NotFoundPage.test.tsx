import { render, screen, fireEvent } from '@testing-library/react';
import { NotFoundPage } from '../src/pages/not-found/NotFoundPage';
import { MemoryRouter } from 'react-router';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('NotFoundPage Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders not-found with correct structure', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const container = screen.getByRole('main');
    expect(container).toBeInTheDocument();
    expect(container.tagName).toBe('MAIN');

    const title = screen.getByText(/404/i);
    expect(title).toBeInTheDocument();

    const description = screen.getByText(/exist/i);
    expect(description).toBeInTheDocument();

    const goHomeButton = screen.getByRole('button', { name: /Go Home/i });
    expect(goHomeButton).toBeInTheDocument();

    const goBackButton = screen.getByRole('button', { name: /Go Back/i });
    expect(goBackButton).toBeInTheDocument();
  });

  it('calls navigate with -1 when Go Back button is clicked', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const buttonGoBack = screen.getByText('Go Back');
    fireEvent.click(buttonGoBack);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('calls navigate with / when Go Home button is clicked', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const buttonGoBack = screen.getByText('Go Home');
    fireEvent.click(buttonGoBack);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
