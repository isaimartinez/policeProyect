import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  incidencias: [],
}

export const viewSlice = createSlice({
    name: 'incidencias',
    initialState,
    reducers: {
      setIncidencias: (state, action) => {
        state.incidencias = action.payload
      },
    },
})
  
export const { setIncidencias,} = viewSlice.actions

export default viewSlice.reducer