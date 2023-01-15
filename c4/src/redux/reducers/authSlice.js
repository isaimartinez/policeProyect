import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {signIn} from '../../APIs'
import { toast } from 'react-toastify';

const initialState = {
  authData: null
}

// First, create the thunk
export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (user) => {
    try {
    const {data} = await signIn(user)
    return data
    } catch (error) {
      toast.error('Error en el servidor', {
        position: "top-right",
        autoClose: 2500,
        theme: "light",
      });
      return null
    }
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
        if(action?.payload){
          console.log("success", action?.payload)
          localStorage.setItem('profile', JSON.stringify({...action?.payload}))
          state.authData = action?.payload
        }
      })
    },
})
  
export const {auth, logout} = authSlice.actions

export default authSlice.reducer