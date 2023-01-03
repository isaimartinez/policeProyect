import { Alert, Vibration } from 'react-native';
import { getCoords } from './Geolocation';
import { genId, VIBRATION_PATTERN } from './utils';
import { createReport } from './axios';

import * as RootNavigation from '../navigation/RootNavigation';


export const generateReport = async (user) => {
  const coords = await getCoords()
  const id = genId()
  console.log("hey", coords)
  try {
    let newReport = {
      ...coords,
      ...user,
      id
    }
    const res = await createReport(newReport)
    console.log("res", res.data)
    Vibration.vibrate(VIBRATION_PATTERN)
    Alert.alert(
      "Reporte exitoso",
      "Puedes añadir una foto o video/audio(max 15 segundos) como evidencia.",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
    RootNavigation.navigate("Details",{id})
  } catch (error) {
    console.log("error", error)
    Alert.alert(
      "Lo sentimos",
      "Ocurrió un error, intente más tarde.",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }
}