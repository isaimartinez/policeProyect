import mongoose from "mongoose";

const incidenciaSchema = mongoose.Schema({
  altitude: Number,
  altitudeAccuracy: Number,
  latitude: Number,
  accuracy: Number,
  longitude: Number,
  heading: Number,
  speed: Number,
  address: String,
  phoneNumber: String,
  name: String,
  id: String,
  zoneName: String,
  idZone: String,
  color: String,
  status: String,
  createdAt: {
    type: Date,
    default: new Date()
  },
});

const IncidenciaMessage = mongoose.model('IncidenciaMessage', incidenciaSchema);

export default IncidenciaMessage;
