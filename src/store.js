import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from './slice/userSlice'
import  productSlice  from './slice/productSlice'
import productfilterSlice from './slice/productfiterSlice'
import offerFilterSlice from './slice/offerFilterSlice'
import searchSlice from './slice/searchSlice'

export default configureStore({
  reducer: {
    currentUser: userSlice,
    currentProduct: productSlice,
    currentProductFilter: productfilterSlice,
    currentOfferFilter: offerFilterSlice,
    search: searchSlice,
  },
})