import { render, screen } from '@testing-library/react';
import { Results } from '../src/components/common/results/Results';

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
});
