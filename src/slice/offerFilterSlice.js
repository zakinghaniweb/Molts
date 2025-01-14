import { createSlice } from '@reduxjs/toolkit'

export const offerFilterSlice = createSlice({
  name: 'offerFilter',
  initialState: {
    value: "null",
  },
  reducers: {
    offerFilter: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { offerFilter } = offerFilterSlice.actions

export default offerFilterSlice.reducer