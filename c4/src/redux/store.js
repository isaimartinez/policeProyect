import { configureStore } from '@reduxjs/toolkit'
import viewReducer from './reducers/viewSlice'
import incidenciasReducer from './reducers/dataSlice'
import authReducer from './reducers/authSlice'

export const store = configureStore({
  reducer: {
    view: viewReducer,
    data: incidenciasReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
  }),

})