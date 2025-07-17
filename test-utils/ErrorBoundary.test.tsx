import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../src/shared/utils/error/ErrorBoundary';
import { ThemeProvider } from '../src/context/ThemeProvider';

describe('Error Boundary', () => {
  const ThrowError = () => {
    throw new Error('Test error');
  };

  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <ThemeProvider>
        <ErrorBoundary>
          <div>Child Content</div>
        </ErrorBoundary>
      </ThemeProvider>
    );

    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('catches an error and displays the fallback UI', () => {
    render(
      <ThemeProvider>
        <ErrorBoundary>
          <ThrowError />
          <div>Child Content</div>
        </ErrorBoundary>
      </ThemeProvider>
    );

    expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
    expect(screen.getByText("Don't worry!")).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Try again/i })
    ).toBeInTheDocument();
    expect(screen.queryByText(/Child Content/i)).not.toBeInTheDocument();
  });

  it('renders children when theme context is not available', () => {
    render(
      <ErrorBoundary>
        <div>Child Without Theme</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child Without Theme')).toBeInTheDocument();
  });
});
