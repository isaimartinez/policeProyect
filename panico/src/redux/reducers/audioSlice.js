import { createSlice,  } from '@reduxjs/toolkit'

const initialState = {
  recordSecs: 0,
  recordTime: null,
  currentPositionSec: null,
  currentDurationSec: null,
  playTime: null,
  duration: null,
  isRecording: false,
  isPlaying: false,
  audio: null
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
      console.log(currentPositionSec, currentDurationSec, playTime, duration)
      state.currentPositionSec = currentPositionSec
      state.currentDurationSec = currentDurationSec
      state.playTime = playTime
      state.duration = duration
    },
    setIsRecording: (state, action) => {
      state.isRecording = action.payload
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload
    },
    setAudio: (state, action) => {
      state.audio = action.payload
    }

  }
})

export const { setRecordData, stopRecordData, setPlayingData, setIsRecording, setIsPlaying, setAudio } = audioSlice.actions

export default audioSlice.reducer