import mongoose from "mongoose";

const zonaSchema = mongoose.Schema({
  idZone: {type: String, required: true},
  name: {type: String, required: true},
  coords: [{lat: Number, lng: Number}],
  color: String
})

export default mongoose.model('Zonas', zonaSchema)