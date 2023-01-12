import React,{useEffect} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import ActionSheet from "react-native-actions-sheet";
import {getHp} from '../Apis/Dimensions'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux'
import {onStartRecord, onStopRecord, onStartPlay, onStopPlay} from '../Apis/Audio'
import {setAudio, setIsPlaying} from '../redux/reducers/audioSlice'


const AudioSheet = ({actionSheetRef, onStoreAudio}) => {
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

  return (
    
    <ActionSheet ref={actionSheetRef}>
      <View style={{height: getHp(0.3),}}>
        {
          audio && !isRecording ? (
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity style={{flex: 1, alignItems: 'center'}}
              onPress={handleRecordAgain}
            >
              <Icon name={"redo"} size={23} color="#64748b"/>
              <Text style={{color: "#334155", marginTop: 5}}>Grabar de Nuevo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, alignItems: 'center'}} 
              onPress={handlePlaySwitch}
            >
              <Icon name={!isPlaying ?"play" : "pause"} size={50} color="#64748b"/>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, alignItems: 'center'}}
              onPress={handleAcceptAudio}
            >
              <Icon name={"check"} size={23} color="#64748b"/>
              <Text style={{color: "#334155", marginTop: 5}}>Aceptar</Text>
            </TouchableOpacity>
          </View>) : (
            <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
              onPress={handleRecordSwitch}
            >
              <Icon name={!isRecording ?"microphone" : "stop"} size={50} color="#64748b"/>
              <Text style={{color: "#64748b", marginTop: 5}}>{!isRecording ? "R E C": "PARAR DE GRABAR"}</Text>
            </TouchableOpacity>
          )
        }
      </View>
    </ActionSheet>
  )
}

export default AudioSheet