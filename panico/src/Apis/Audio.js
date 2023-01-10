import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { store } from '../redux/store';
import {setRecordData, stopRecordData, setPlayingData, setIsRecording, setIsPlaying, setAudio} from '../redux/reducers/audioSlice'

const audioRecorderPlayer = new AudioRecorderPlayer();

export const onStartRecord = async () => {
  store.dispatch(setIsRecording(true))
  const result = await audioRecorderPlayer.startRecorder();
  audioRecorderPlayer.addRecordBackListener((e) => {
    console.log("Recording ...", e.currentPosition)
    store.dispatch(setRecordData({
      recordSecs: e.currentPosition,
      recordTime: audioRecorderPlayer.mmssss(
        Math.floor(e.currentPosition),
      ),
    }))
    return;
  });
  console.log("onStartRecord", result);
  store.dispatch(setAudio(result))
}

export const onStopRecord = async () => {
  const result = await audioRecorderPlayer.stopRecorder();
  audioRecorderPlayer.removeRecordBackListener()
  store.dispatch(stopRecordData())
  store.dispatch(setIsRecording(false))
  console.log("onStopRecord",result);
}


export const onStartPlay = async () => {
  try {
    console.log('onStartPlay');
    store.dispatch(setIsPlaying(true))
    const msg = await audioRecorderPlayer.startPlayer();
    const volume = await audioRecorderPlayer.setVolume(1.0);
    console.log(`path: ${msg}`, `volume: ${volume}`);
    audioRecorderPlayer.addPlayBackListener((e) => {
      store.dispatch(setPlayingData({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      }))
      return;
    });
  } catch (error) {
    console.log("onStartPlay error", error)
  }
};

export const onStopPlay = async () => {
  console.log('onStopPlay');
  store.dispatch(setIsPlaying(false))
  audioRecorderPlayer.stopPlayer();
  audioRecorderPlayer.removePlayBackListener();
};