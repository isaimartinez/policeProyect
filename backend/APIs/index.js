import axios from 'axios'
import mongoose from "mongoose";
import {PolyUtil} from "node-geometry-library";
import zonasModel from '../models/zonas.js'

export const getAddress = (lat, lng) =>  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyD_CXv8QVNnm1xS5vyLUiwOWeljsH7oIyM`)

export const getZone = async (lat, lng) => {
  const  zonas = await zonasModel.find()
  for (let i = 0; i < zonas.length; i++) {
    const z = zonas[i];
    console.log("coords")
    let response =  PolyUtil.containsLocation(
      {lat: lat, lng: lng}, // point object {lat, lng}
      z.coords
    );
    console.log("response ", response)
  }
}
