import { createSlice } from '@reduxjs/toolkit';

interface CountriesState {
  list: string[];
  selected: string;
}

const initialState: CountriesState = {
  list: [
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Belarus',
    'Belgium',
    'Bolivia',
    'Brazil',
    'Bulgaria',
    'Canada',
    'Chile',
    'China',
    'Denmark',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'Finland',
    'France',
    'Germany',
    'Greece',
    'Iceland',
    'India',
    'Japan',
    'Kazakhstan',
    'Kenya',
    'Latvia',
    'Lithuania',
    'Mexico',
    'Morocco',
    'Norway',
    'Poland',
    'Portugal',
    'Romania',
    'Singapore',
    'Slovakia',
    'Turkey',
    'United Kingdom',
    'United States',
    'Vietnam',
    'Zimbabwe',
  ],
  selected: '',
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setSelectedCountry: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { setSelectedCountry } = countriesSlice.actions;
export default countriesSlice.reducer;
