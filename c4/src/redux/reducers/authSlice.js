import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {signIn} from '../../APIs'
import {redirect} from 'react-router-dom'

const initialState = {
  authData: null
}

// First, create the thunk
export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (user) => {
    const {data} = await signIn(user)
    return data
  }
)


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      auth: (state, action) => {
        state.authData = action?.payload
      },
      logout: (state, action) => {
        localStorage.clear()
        state.authData = null
      }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchLogin.fulfilled, (state, action) => {
        localStorage.setItem('profile', JSON.stringify({...action?.payload}))
        state.authData = action?.payload
      })
    },
})
  
export const {auth, logout} = authSlice.actions

export default authSlice.reducer