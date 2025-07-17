import { createSlice } from '@reduxjs/toolkit';

export type SelectedItem = {
  id: string;
  name: string;
  description: string;
};

const initialState: { selectedItems: SelectedItem[] } = {
  selectedItems: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    addItem(state, action) {
      const itemExists = state.selectedItems.some(
        (item) => item.id === action.payload.id
      );

      if (!itemExists) {
        state.selectedItems.push(action.payload);
      }
    },
    removeItem(state, action) {
      state.selectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    removeAllItems(state) {
      state.selectedItems = [];
    },
  },
});

export const { addItem, removeItem, removeAllItems } =
  selectedItemsSlice.actions;

export default selectedItemsSlice.reducer;
