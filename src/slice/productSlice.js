import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
  name: 'user',
  initialState: {
    value: JSON.parse(localStorage.getItem('product'))?JSON.parse(localStorage.getItem('product')) : null ,
  },
  reducers: {
    productData: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { productData } = productSlice.actions

export default productSlice.reducer