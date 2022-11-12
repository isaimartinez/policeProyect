import mongoose from "mongoose";

const zonaSchema = mongoose.Schema({
  idZone: String,
  coords: [{lat: String, lng: String}]
})

export default mongoose.model('Zona', zonaSchema)