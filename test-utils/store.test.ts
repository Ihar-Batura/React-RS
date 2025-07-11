import { store } from '../src/store/store';
import selectedItemsSlice from '../src/store/selectedItemsSlice';
import type { RootState, AppDispatch } from '../src/store/store';

describe('Redux Store', () => {
  it('should create the store without errors', () => {
    expect(store).toBeDefined();
  });

  it('should have the correct initial state structure', () => {
    const initialState = store.getState();

    expect(initialState).toHaveProperty('selectedItems');
    expect(selectedItemsSlice(undefined, { type: 'unknown' })).toEqual(
      initialState.selectedItems
    );
  });

  it('should export RootState and AppDispatch types correctly', () => {
    const testState: RootState = store.getState();
    const testDispatch: AppDispatch = store.dispatch;

    expect(testState).toBe(store.getState());
    expect(testDispatch).toBe(store.dispatch);
  });
});
