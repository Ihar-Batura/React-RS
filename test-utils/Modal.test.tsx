import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '../src/components/modal/Modal';

import { vi } from 'vitest';
vi.mock('react-dom', () => ({
  ...vi.importActual('react-dom'),
  createPortal: (children: React.ReactNode) => children,
}));

describe('Modal Component', () => {
  const onClose = vi.fn();
  const children = <div data-testid="modal-children">Modal Content</div>;

  const renderModal = (isOpen: boolean) => {
    render(
      <Modal isOpen={isOpen} onClose={onClose}>
        {children}
      </Modal>
    );
  };

  it('does not render anything when isOpen is false', () => {
    renderModal(false);

    expect(screen.queryByRole('button', { name: /×/ })).not.toBeInTheDocument();
  });

  it('renders modal content when isOpen is true', () => {
    renderModal(true);

    expect(screen.getByRole('button', { name: '×' })).toBeInTheDocument();
  });

  it('calls onClose when clicking on the close button', () => {
    renderModal(true);

    const closeButton = screen.getByRole('button', { name: '×' });
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('focuses the #name input when modal opens', () => {
    const input = document.createElement('input');
    input.id = 'name';
    input.setAttribute('data-testid', 'name-input');
    document.body.appendChild(input);

    renderModal(true);

    expect(input).toHaveFocus();
  });
});
