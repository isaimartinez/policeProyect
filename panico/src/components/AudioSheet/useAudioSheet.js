import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {onStartRecord, onStopRecord, onStartPlay, onStopPlay} from '../../Apis/Audio'
import {setAudio} from '../../redux/reducers/audioSlice'

export const useAudioSheet = (onStoreAudio) => {
  const dispatch = useDispatch()
  const {playTime, duration, isRecording, isPlaying, audio} = useSelector((state) => state.audio)

  useEffect(() => {
    if(playTime&& duration){
      if(playTime == duration){
        onStopPlay()
      }
    }
  }, [playTime, duration])
  
  const handleRecordSwitch = () => {
    if(!isRecording) {
      onStartRecord()
    } else {
      onStopRecord()
    }
  }

  const handlePlaySwitch = () => {
    if(!isPlaying){
      onStartPlay()
    } else {
      onStopPlay()
    }
  }

  const handleRecordAgain = () => {
    dispatch(setAudio(null))
  }

  const handleAcceptAudio = () => {
    onStoreAudio(audio)
    onStopPlay()
  }

  return {isRecording, isPlaying, handleRecordSwitch, handlePlaySwitch, handleRecordAgain, handleAcceptAudio, audio}
}