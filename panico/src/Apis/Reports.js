import { Alert, Vibration } from 'react-native';
import { getCoords } from './Geolocation';
import { genId, VIBRATION_PATTERN } from './utils';
import { createReport } from './axios';
import {store} from '../redux/store'
import {setSendingReport} from '../redux/reducers/mainSlice'

import * as RootNavigation from '../navigation/RootNavigation';

export const generateReport = async (user) => {
  console.log("generateReport")
  const coords = await getCoords()
  console.log("coords", coords)
  const id = genId()
  try {
    let newReport = {
      ...coords,
      ...user,
      id
    }
    store.dispatch(setSendingReport(true))
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
    store.dispatch(setSendingReport(false))
    RootNavigation.navigate("Details",{id})
  } catch (error) {
    store.dispatch(setSendingReport(false))
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