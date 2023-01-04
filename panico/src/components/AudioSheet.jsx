import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import ActionSheet from "react-native-actions-sheet";
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {getHp} from '../Apis/Dimensions'
import Icon from 'react-native-vector-icons/FontAwesome5';

const AudioSheet = ({actionSheetRef}) => {
  const audioRecorderPlayer = new AudioRecorderPlayer();


  return (
    
    <ActionSheet ref={actionSheetRef}>
      <View style={{height: getHp(0.3), justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity>
          <Icon name="microphone" size={50} color="#64748b"/>
          <Text style={{color: "#64748b", marginTop: 5}}>R E C</Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  )
}

export default AudioSheet