import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import ActionSheet from "react-native-actions-sheet";
import {getHp} from '../../Apis/Dimensions'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAudioSheet } from './useAudioSheet';

const AudioSheet = ({actionSheetRef, onStoreAudio}) => {
  const {isRecording, isPlaying, audio,handleRecordSwitch, handlePlaySwitch, handleRecordAgain, handleAcceptAudio} = useAudioSheet(onStoreAudio)


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