import { Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { genId } from './utils';
import { sendData } from './axios';

export const SOS = (user) => {
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