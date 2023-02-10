import {useState, useRef} from 'react'
import { Platform } from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {cameraImageOptions, cameraVideoOptions, libraryOptions} from '../../Apis/utils'
import {postFile, postComment} from '../../Apis/axios'
import { Alert, Vibration } from 'react-native';


export const useDetails = (route, navigation) => {
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

      Alert.alert(
        "Tu emergencia ha sido recibida",
        "Estamos trabajando en ello.",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );

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

  return {actionSheetRef, file, setFile, subiendo, setSubiendo, selectedBtn, setSelectedBtn, comment, setComment, handlePostData,
    onLaunchCameraImage, onLaunchCameraVideo, onLaunchLibrary, onStoreAudio, showAudioSheet, isFileBtnSelected
  }


}