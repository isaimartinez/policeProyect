import mongoose from "mongoose";
import {getAddress, getZone} from '../APIs/index.js'
import IncidenciaMessage from '../models/incidenciaMessage.js'
import ZonasModel from '../models/zonas.js'


// let data = [{
//   user: {name:"name", phoneNumber: "123"},
//   coords: {latitude: 20.65497066082328, longitude: -100.09922948136055, speed: -1, accuracy: 5}
// }]

export const createIncidencia = async (req, res) => {
  const { incidencia} = req.body
  
  console.log(incidencia)
  try {
    let address = await getAddress(incidencia.latitude, incidencia.longitude)
    let zone = await getZone(incidencia.latitude, incidencia.longitude)
    console.log(zone)
    const newIncidencia = new IncidenciaMessage({...incidencia, address: address.data.results[1].formatted_address, ...zone, status: 0, createdAt: new Date().toISOString()});
    await newIncidencia.save();
    req.app.locals.ws.send(JSON.stringify(newIncidencia))
    res.status(201).json("OK");
  } catch (error) {
    console.log(error.message)
  }
}

export const getZones = async (req, res) => {
  try {
    const  zonas = await ZonasModel.find()
    res.status(201).json(zonas);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

}

export const getData = async (req, res) => {
  try {
    console.log("Success")
    const data = await IncidenciaMessage.find()
    console.log("data", data)
    res.status(201).json({ data });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
