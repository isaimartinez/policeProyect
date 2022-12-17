import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs';

const initialState = {
  incidencias: [],
  date: dayjs(),
  selectedZones: [],
  zones: []
}

export const viewSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
      setIncidencias: (state, action) => {
        state.incidencias = action.payload
      },
      setDate: (state, action) => {
        state.date = action.payload
      },
      setSelectedZones: (state, action) => {
        state.selectedZones = action.payload
      },
      setZones: (state, action) => {
        state.zones = action.payload
      }
    },
})
  
export const { setIncidencias, setDate, setSelectedZones, setZones} = viewSlice.actions

export default viewSlice.reducer