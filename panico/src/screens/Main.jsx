import React from 'react'
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import { useSelector, useDispatch } from 'react-redux'
import {genId} from '../Apis/utils'
import {fetchOnLoad, sendData} from '../Apis/axios'
import nueveOnce from '../assets/911.png'
import footer from '../assets/footer.jpeg'

const Main = () => {
  const {user} = useSelector((state) => state.main)
  const dispatch = useDispatch()
  
  const handleSos = async () => {
    Geolocation.getCurrentPosition(info => {
      // let d = new Date()
      let userData = {
        ...info.coords,
        ...user,
        // date: d.toString(),
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
      <View style={{flex: 1}}>
        <Image source={nueveOnce} resizeMode="stretch" style={{width: 170, height: 120, borderRadius: 10,  marginTop: 25}}/>

      </View>
      <View style={{flex: 1}}>
        <TouchableOpacity style={{ minHeight: 200, minWidth: 200,backgroundColor: 'rgb(37, 99, 235)', alignItems: 'center', justifyContent: 'center', borderRadius: 100, shadowColor: '#171717',
          shadowOffset: {width: -2, height: 4},
          shadowOpacity: 0.8,
          shadowRadius: 3,}}
          onPress={handleSos}
        >
          <Text style={{color: "white", fontSize: 40}}>S O S</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end',}}>
        <Image source={footer} style={{width: 135, height: 135, borderRadius: 20}}
          resizeMode="contain"/>
      </View>
    </View>
  )
}

export default Main