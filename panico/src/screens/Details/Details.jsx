import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Button, TextField, AudioSheet} from '../../components'
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getHp} from '../../Apis/Dimensions'
import {styles} from '../../styles'
import { useDetails } from './useDetails'

const Details = ({route, navigation}) => {

  const {actionSheetRef, file, setFile, subiendo, setSubiendo, selectedBtn, setSelectedBtn, comment, setComment, handlePostData,
    onLaunchCameraImage, onLaunchCameraVideo, onLaunchLibrary, onStoreAudio, showAudioSheet, isFileBtnSelected
  } = useDetails(route, navigation)

  if(subiendo) {
    return(
      <View style={{flex: 1, flexDirection: "column", justifyContent: 'center', backgroundColor: "#F8FAFC", padding: 5}}>
        <ActivityIndicator size={"large"}/>
      </View>
    )
  }

  return (
    <KeyboardAwareScrollView style={{flex: 1}}>
      <AudioSheet actionSheetRef={actionSheetRef} onStoreAudio={onStoreAudio}/>
      <View style={{ flex: 1, height: getHp(0.9),flexDirection: "column", backgroundColor: "#F8FAFC", padding: 5}}>
        <View style={{ height: getHp(0.09),alignItems: 'center', justifyContent: 'center',}}>
          <Text style={{ textAlign: 'center', color: "#475569"}}>Puedes grabar un Video/Audio Max 15 Secs de el reporte, o tomar una foto</Text>
        </View>
        <View style={{height: getHp(0.7), flexDirection: 'column'}}>
          <View style={{flex: 3, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center',}}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={[styles.fileBtn, isFileBtnSelected("cameraImage")]}
                onPress={onLaunchCameraImage}
              >
                <Icon name="camera" size={30} color="#64748b"/>
                <Text style={{color: "#64748b"}}>Cámara</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.fileBtn, isFileBtnSelected("cameraVideo")]}
                onPress={onLaunchCameraVideo}
              >
                <Icon name="video" size={30} color="#64748b"/>
                <Text style={{color: "#64748b"}}>Video</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={[styles.fileBtn, isFileBtnSelected("library")]}
                onPress={onLaunchLibrary}
              >
                <Icon name="images" size={30} color="#64748b"/>
                <Text style={{color: "#64748b"}}>Galería</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.fileBtn, isFileBtnSelected("audio")]}
                onPress={showAudioSheet}
              >
                <Icon name="microphone" size={30} color="#64748b"/>
                <Text style={{color: "#64748b"}}>Audio</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flex: 1, justifyContent: 'center'}}>
            <TextField placeholder={"Escribe tu descripcion de los hechos"} label={"Comentario"} value={comment} onChange={(t) => {setComment(t)}}/>
          </View>

        </View>
        <View style={{height: getHp(0.15), justifyContent: 'center'}}>
            <Button label={"Enviar"} onPress={handlePostData}
              styleBtn={{backgroundColor:"#102952", borderRadius: 5, height: 50, alignItems: 'center', justifyContent: 'center'}}
              styleTxt={{color: "white", fontWeight: "500", fontSize: 20}}
            />
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default Details