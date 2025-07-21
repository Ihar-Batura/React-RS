import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../src/components/common/pagination/Pagination';

describe('Pagination Component', () => {
  const onPageChange = vi.fn();

  it('does not render when totalPages <= 1', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={onPageChange} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders correctly on the first page with ellipsis', () => {
    render(
      <Pagination currentPage={1} totalPages={7} onPageChange={onPageChange} />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    expect(screen.getByText('...')).toBeInTheDocument();

    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('calls onPageChange when a page is clicked', () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );

    const pageButton = screen.getByRole('button', { name: '2' });
    fireEvent.click(pageButton);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('does not call onPageChange if current page is clicked', () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );

    const activeButton = screen.getByRole('button', { name: '3' });
    fireEvent.click(activeButton);

    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('renders all buttons without ellipsis when totalPages <= 7', () => {
    render(
      <Pagination currentPage={4} totalPages={6} onPageChange={onPageChange} />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();

    expect(screen.queryByText('...')).not.toBeInTheDocument();
  });
});
