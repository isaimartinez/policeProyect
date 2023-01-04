import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {getData, storeData} from '../../Apis/storage'



const initialState = {
  user: null,
  sendingReport: false,
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
    setSendingReport: (state, action) => {
      state.sendingReport = action.payload
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
export const { setUser, setSendingReport } = mainSlice.actions

export default mainSlice.reducer