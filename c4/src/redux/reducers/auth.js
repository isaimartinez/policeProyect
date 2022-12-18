import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  authData: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setActiveMenu: (state, action) => {
        state.activeMenu = action.payload
      },
      auth: (state, action) => {
        localStorage.setItem('profile', JSON.stringify({...action?.payload}))
        state.authData = action?.payload
      },
      logout: (state, action) => {
        localStorage.clear()
        state.authData = null
      }
    },
})
  
export const {auth, logout} = authSlice.actions

export default authSlice.reducer