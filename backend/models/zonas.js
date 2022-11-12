import mongoose from "mongoose";

const zonaSchema = mongoose.Schema({
  idZone: {type: Number, required: true},
  name: {type: String, required: true},
  coords: [{lat: Number, lng: Number}]
})

export default mongoose.model('Zonas', zonaSchema)