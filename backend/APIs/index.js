import axios from 'axios'
import mongoose from "mongoose";
import {PolyUtil} from "node-geometry-library";
import zonasModel from '../models/zonas.js'

export const getAddress = (lat, lng) =>  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyD_CXv8QVNnm1xS5vyLUiwOWeljsH7oIyM`)

export const getZone = async (lat, lng) => {
  const  zonas = await zonasModel.find()
  for (let i = 0; i < zonas.length; i++) {
    const z = zonas[i];
    let response =  PolyUtil.containsLocation({lat: lat, lng: lng},z.coords);
    if(response){
      return { idZone: z.idZone, zoneName: z.name, color: z.color}
    }
  }
  return {idZone: "0", zoneName: "Out Of Range"}
}

export const getKindOfFile = (mimetype) => {
  let kindOfFile
  if(mimetype.includes("video")){
    kindOfFile = "video"
  } else if(mimetype.includes("image")) {
    kindOfFile = "image"
  } else if(mimetype.includes("audio")) {
    kindOfFile = "video"
  }
  return kindOfFile
}