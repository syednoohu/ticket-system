import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from '../Redux/apiSlice'
import globalReducer from '../Redux/features/globalSlice'
import authReducer from '../Redux/features/authSlice'

export const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefault) => getDefault().concat(apiSlice.middleware),
  devTools:true
});
