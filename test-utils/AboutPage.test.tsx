import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AboutPage } from '../src/pages/about/AboutPage';
import { ThemeProvider } from '../src/context/ThemeProvider';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('AboutPage Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  const renderAboutPage = () => {
    return render(
      <MemoryRouter>
        <ThemeProvider>
          <AboutPage />
        </ThemeProvider>
      </MemoryRouter>
    );
  };

  it('renders about with correct structure', () => {
    renderAboutPage();

    const container = screen.getByRole('main');
    expect(container).toBeInTheDocument();
    expect(container.tagName).toBe('MAIN');

    const description = screen.getByText(/React 2025 Q3/i);
    expect(description).toBeInTheDocument();

    const descriptionWithLink = screen.getByText(/the course program/i);
    expect(descriptionWithLink).toBeInTheDocument();

    const link = descriptionWithLink.querySelector('a');
    expect(link).toBeInTheDocument();

    const goBackButton = screen.getByRole('button', { name: /Go Back/i });
    expect(goBackButton).toBeInTheDocument();
  });

  it('renders link to course correctly', () => {
    renderAboutPage();

    const descriptionWithLink = screen.getByText(/the course program/i);
    expect(descriptionWithLink).toBeInTheDocument();

    const link = descriptionWithLink.querySelector('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer noopener');
  });

  it('calls navigate with -1 when Go Back button is clicked', () => {
    renderAboutPage();

    const buttonGoBack = screen.getByText('Go Back');
    fireEvent.click(buttonGoBack);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
