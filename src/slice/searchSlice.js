import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    filteredProducts: [],
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setFilteredProducts(state, action) {
      state.filteredProducts = action.payload;
    },
  },
});

export const { setQuery, setFilteredProducts } = searchSlice.actions;
export default searchSlice.reducer;
