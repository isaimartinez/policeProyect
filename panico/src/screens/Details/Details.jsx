import React,{useState, useRef} from 'react'
import { View, Text, TouchableOpacity, Platform, ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSelector, useDispatch } from 'react-redux'
import {Button, TextField, AudioSheet} from '../../components'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getHp} from '../../Apis/Dimensions'
import {postFile, postComment} from '../../Apis/axios'
import {cameraImageOptions, cameraVideoOptions, libraryOptions} from '../../Apis/utils'
import {styles} from '../../styles'

const Details = ({route, navigation}) => {
  const {user} = useSelector((state) => state.main)
  const dispatch = useDispatch()
  const { id} = route.params;
  const actionSheetRef = useRef(null);
  const [file, setFile] = useState(null)
  const [subiendo, setSubiendo] = useState(false)
  const [selectedBtn, setSelectedBtn] = useState("")
  const [comment, setComment] = useState("")

  const handlePostData = async () => {
    try {
      setSubiendo(true)
      if(comment.length > 0) {
        await postComment(comment, id)
      }
      if(file){
        let formData = new FormData()
        formData.append("file", {...file,
          uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
          name: `file-report`,
          type:file.type,
        });
        console.log("id", id)
        await postFile(formData, id)
      }
      setSubiendo(false)
      navigation.goBack()
    } catch (error) {
      console.log("error", error)
    }

  }

  const onLaunchCameraImage = async () => {
    try {
      const result = await launchCamera(cameraImageOptions);
      if(result?.didCancel)return false
      setFile(result.assets[0])
      setSelectedBtn("cameraImage")
    } catch (error) {
      console.log("error", error)
    }
  }

  const onLaunchCameraVideo = async () => {
    try {
      const result = await launchCamera(cameraVideoOptions);
      if(result?.didCancel)return false
      setFile(result?.assets[0])
      setSelectedBtn("cameraVideo")
    } catch (error) {
      console.log("error", error)
    }
  }

  const onLaunchLibrary = async () => {
    try {
      const result = await launchImageLibrary(libraryOptions);
      if(result?.didCancel)return false
      setFile(result.assets[0])
      setSelectedBtn("library")
    } catch (error) {
      console.log("error", error)
    }
  }

  const onStoreAudio = (audio) => {
    setFile({uri:audio, type: "video/mp4",})
    setSelectedBtn("audio")
    actionSheetRef.current?.hide();
  }

  const showAudioSheet = () => {
    actionSheetRef.current?.show();

  }

  const isFileBtnSelected = (btn) => {
    return btn == selectedBtn ? {backgroundColor: "#93c5fd"} : {backgroundColor: "#e2e8f0"}
  }

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