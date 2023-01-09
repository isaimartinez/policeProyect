import { configureStore } from '@reduxjs/toolkit'
import mainSlice from './reducers/mainSlice'
import audioSlice from './reducers/audioSlice'

export const store = configureStore({
  reducer: {
    main: mainSlice,
    audio: audioSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
  }),
})