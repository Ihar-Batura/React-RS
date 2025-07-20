import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../src/shared/utils/error/ErrorBoundary';
import { vi } from 'vitest';

describe('Error Boundary', () => {
  const ThrowError = () => {
    throw new Error('Test error');
  };

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Child Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('catches an error and displays the fallback UI', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
        <div>Child Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
    expect(screen.getByText("Don't worry!")).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Try again/i })
    ).toBeInTheDocument();
    expect(screen.queryByText(/Child Content/i)).not.toBeInTheDocument();
  });

  it('logs an error to console when an error happen', () => {
    const consoleSpy = vi.spyOn(console, 'error');

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
