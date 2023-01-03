import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {getData, storeData} from '../../Apis/storage'



const initialState = {
  user: null,
  coords: {}
}

export const fetchData = createAsyncThunk(
  'main/fetchData',
  async (key) => {
    let data = await getData(key);
    return data
  }
)

export const saveData = createAsyncThunk(
  'main/saveData',
  async ({data, key}) => {
    await storeData(data, key);
    return data
  }
)



export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setCoords: (state, action) => {
      state.coords = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(saveData.fulfilled, (state, action) => {
      state.user = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
export const { setUser, setCoords } = mainSlice.actions

export default mainSlice.reducer