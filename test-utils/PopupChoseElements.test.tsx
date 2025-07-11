import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { PopupChoseElements } from '../src/components/ui/popup/PopupChoseElements';
import { removeAllItems } from '../src/store/selectedItemsSlice';
import { saveAs } from 'file-saver';
import { render, screen, fireEvent } from '@testing-library/react';

vi.mock('../src/shared/hooks/useTheme', () => ({
  useTheme: vi.fn(() => ({ theme: 'light' })),
}));

vi.mock('file-saver', () => ({
  saveAs: vi.fn(),
}));

describe('PopupChoseElements', () => {
  const mockStore = configureStore({
    reducer: {
      selectedItems: () => ({
        selectedItems: [
          { id: 1, name: 'Item 1', description: 'Description 1' },
          { id: 2, name: 'Item 2', description: 'Description 2' },
        ],
      }),
    },
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderPopupChoseElements = () => {
    return render(
      <Provider store={mockStore}>
        <PopupChoseElements />
      </Provider>
    );
  };

  it('renders correctly with items count', () => {
    renderPopupChoseElements();

    expect(screen.getByText('Selected 2 items')).toBeInTheDocument();
  });

  it('renders singular form when only 1 item', () => {
    const storeWithOneItem = configureStore({
      reducer: {
        selectedItems: () => ({
          selectedItems: [
            { id: 1, name: 'Item 1', description: 'Description 1' },
          ],
        }),
      },
    });

    render(
      <Provider store={storeWithOneItem}>
        <PopupChoseElements />
      </Provider>
    );

    expect(screen.getByText('Selected 1 item')).toBeInTheDocument();
  });

  it('dispatches removeAllItems action when "Unselect all" button is clicked', () => {
    const dispatch = vi.fn();
    vi.spyOn(mockStore, 'dispatch').mockImplementation(dispatch);

    renderPopupChoseElements();

    fireEvent.click(screen.getByText('Unselect all'));
    expect(dispatch).toHaveBeenCalledWith(removeAllItems());
  });

  it('calls saveAs when "Download" button is clicked', () => {
    renderPopupChoseElements();

    fireEvent.click(screen.getByText('Download'));

    expect(saveAs).toHaveBeenCalled();
  });
});
