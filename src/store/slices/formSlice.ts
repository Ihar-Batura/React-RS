import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormValues } from '../../types/types';

interface FormsState {
  formEntries: FormValues[];
}

const initialState: FormsState = {
  formEntries: [],
};

export const formSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormValues>) => {
      const newEntry = {
        ...action.payload,
      };
      state.formEntries.push(newEntry);
    },
  },
});

export const { addFormData } = formSlice.actions;
export default formSlice.reducer;
