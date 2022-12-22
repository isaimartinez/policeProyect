import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeMenu: false,
  drawingZone: false,
  showZones: false,
  showTraffic: false,
  isModalIncidencia: false,
}

export const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
      setActiveMenu: (state, action) => {
        state.activeMenu = action.payload
      },
      setDrawingZone: (state, action) => {
        state.drawingZone = action.payload
      },
      setShowZones: (state, action) => {
        state.showZones = action.payload
      },
      setShowTraffic: (state, action) => {
        state.showTraffic = action.payload
      },
      setIsModalIncidencia: (state, action) => {
        state.isModalIncidencia = action.payload
      }
    },
})
  
export const { setActiveMenu, setDrawingZone, setShowZones, setShowTraffic, setIsModalIncidencia } = viewSlice.actions

export default viewSlice.reducer