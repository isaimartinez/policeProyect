import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeMenu: true,
  screenSize: undefined
}

export const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
      setActiveMenu: (state, action) => {
        state.activeMenu = action.payload
      },
      setScreenSize: (state, action) => {
        state.screenSize = action.payload
      }
    },
})
  
export const { setActiveMenu, setScreenSize} = viewSlice.actions

export default viewSlice.reducer