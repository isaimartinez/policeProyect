import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeMenu: false,
  drawingZone: false,
  showZones: false,
  showTraffic: false
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
      }
    },
})
  
export const { setActiveMenu, setDrawingZone, setShowZones, setShowTraffic } = viewSlice.actions

export default viewSlice.reducer