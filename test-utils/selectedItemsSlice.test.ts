import selectedItemsSlice, {
  addItem,
  removeItem,
  removeAllItems,
  SelectedItem,
} from '../src/store/selectedItemsSlice';

describe('selectedItemsSlice', () => {
  const mockItem1: SelectedItem = {
    id: '111',
    name: 'Spock',
    description: 'Description ...',
  };

  const mockItem2: SelectedItem = {
    id: '222',
    name: 'Brock',
    description: 'Description ...',
  };

  it('should return the initial state', () => {
    const initialState = selectedItemsSlice(undefined, { type: 'unknown' });
    expect(initialState).toEqual({ selectedItems: [] });
  });

  it('should handle addItem to add a new item', () => {
    let state = selectedItemsSlice(undefined, addItem(mockItem1));
    expect(state.selectedItems).toHaveLength(1);
    expect(state.selectedItems[0]).toEqual(mockItem1);

    state = selectedItemsSlice(state, addItem(mockItem1));
    expect(state.selectedItems).toHaveLength(1);
  });

  it('should handle removeItem to remove an existing item', () => {
    let state = selectedItemsSlice(undefined, addItem(mockItem1));
    state = selectedItemsSlice(state, addItem(mockItem2));

    state = selectedItemsSlice(state, removeItem({ id: mockItem1.id }));
    expect(state.selectedItems).toHaveLength(1);
    expect(state.selectedItems[0]).toEqual(mockItem2);
  });

  it('should handle removeAllItems to clear the list', () => {
    let state = selectedItemsSlice(undefined, addItem(mockItem1));
    state = selectedItemsSlice(state, addItem(mockItem2));

    state = selectedItemsSlice(state, removeAllItems());
    expect(state.selectedItems).toHaveLength(0);
  });
});
