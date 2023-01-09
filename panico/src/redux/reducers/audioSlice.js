import { createSlice,  } from '@reduxjs/toolkit'

const initialState = {
  recordSecs: 0,
  recordTime: null,
  currentPositionSec: null,
  currentDurationSec: null,
  playTime: null,
  duration: null,
}

export const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setRecordData: (state, action) => {
      state.recordSecs = action.payload.recordSecs
      state.recordTime = action.payload.recordTime
    },
    stopRecordData: (state, action) => {
      state.recordSecs = 0
    },
    setPlayingData: (state, action) => {
      const {currentPositionSec, currentDurationSec, playTime, duration} = action.payload
      state.currentPositionSec = currentPositionSec
      state.currentDurationSec = currentDurationSec
      state.playTime = playTime
      state.duration = duration
    }

  }
})

export const { setRecordData, stopRecordData, setPlayingData } = audioSlice.actions

export default audioSlice.reducer