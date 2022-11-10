import React from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import { useSelector, useDispatch } from 'react-redux'
import {genId} from '../Apis/utils'
import {fetchOnLoad, sendData} from '../Apis/axios'

const Main = () => {
  const {user} = useSelector((state) => state.main)
  const dispatch = useDispatch()
  
  const handleSos = async () => {
    Geolocation.getCurrentPosition(info => {
      let d = new Date()
      let userData = {
        ...info.coords,
        ...user,
        date: d.toString(),
        id: genId()
      }
      sendData(userData)
      Alert.alert(
        "Alerta Enviada",
        "Alerta enviada con Éxito",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    });

  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
      <TouchableOpacity style={{minHeight: 200, minWidth: 200,backgroundColor: 'rgb(37, 99, 235)', alignItems: 'center', justifyContent: 'center', borderRadius: 100, shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 3,}}
        onPress={handleSos}
      >
        <Text style={{color: "white", fontSize: 40}}>S O S</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Main