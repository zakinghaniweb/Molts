import { createSlice } from '@reduxjs/toolkit'

export const productfilterSlice = createSlice({
  name: 'productFilter',
  initialState: {
    value: 'null',
  },
  reducers: {
    productFilter: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { productFilter } = productfilterSlice.actions

export default productfilterSlice.reducer