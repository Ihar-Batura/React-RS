import { render, screen } from '@testing-library/react';
import { Spinner } from '../src/components/ui/spinner/Spinner';
import { ThemeProvider } from '../src/context/ThemeProvider';

describe('Spinner Component', () => {
  it('render spinner component', () => {
    render(
      <ThemeProvider>
        <Spinner />
      </ThemeProvider>
    );

    const container = screen.getByRole('status');
    expect(container).toBeInTheDocument();
  });
});
