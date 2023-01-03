import React,{useState} from 'react'
import { View, Text, TouchableOpacity, Platform, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import {Button} from '../components'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {SH, SW} from '../Apis/Dimensions'
import {postFile} from '../Apis/axios'
import {cameraImageOptions, cameraVideoOptions, libraryOptions} from '../Apis/utils'
import {styles} from '../styles/'

const Details = ({route}) => {
  const {user} = useSelector((state) => state.main)
  const dispatch = useDispatch()
  const { id} = route.params;
  const [file, setFile] = useState(null)
  const [subiendo, setSubiendo] = useState(false)
  const [selectedBtn, setSelectedBtn] = useState("cameraImage")

  const handleEnviar = async () => {
    setSubiendo(true)
    let formData = new FormData()
    formData.append("file", {...file,
      uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
      name: `file-report`,
      type:file.type,
    });
    console.log("id", id)
    await postFile(formData, id)
    setSubiendo(false)

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
    <View style={{flex: 1, flexDirection: "column", justifyContent: 'center', backgroundColor: "#F8FAFC", padding: 5}}>
      <View style={{flex: 0.2, alignItems: 'center', justifyContent: 'center',}}>
        <Text style={{ textAlign: 'center', color: "#475569"}}>Puedes grabar un Video/Audio Max 15 Secs de el reporte, o tomar una foto</Text>
      </View>
      <View style={{flex: 2, flexDirection: 'column',}}>
        <View style={{flex: 4, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center',}}>
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
            <TouchableOpacity style={[styles.fileBtn, isFileBtnSelected("audio")]}>
              <Icon name="microphone" size={30} color="#64748b"/>
              <Text style={{color: "#64748b"}}>Audio</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flex: 1,}}>
          <Text>Commentario</Text>
        </View>

      </View>
      <View style={{flex: 0.3, justifyContent: 'center'}}>
          <Button label={"Enviar"} onPress={handleEnviar}
            styleBtn={{backgroundColor:"#102952", borderRadius: 5, height: 50, alignItems: 'center', justifyContent: 'center'}}
            styleTxt={{color: "white", fontWeight: "500", fontSize: 20}}
          />
      </View>
    </View>
  )
}

export default Details