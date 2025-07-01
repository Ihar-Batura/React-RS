import { render, screen } from '@testing-library/react';
import { Spinner } from '../src/components/ui/spinner/Spinner';

describe('Spinner Component', () => {
  it('render spinner component', () => {
    render(<Spinner />);

    const container = screen.getByRole('status');
    expect(container).toBeInTheDocument();
  });
});
