import mongoose from "mongoose";

const incidenciaSchema = mongoose.Schema({
  altitude: String,
  altitudeAccuracy: String,
  latitude: String,
  accuracy: String,
  longitude: String,
  heading: String,
  speed: String,
  phoneNumber: String,
  name: String,
  id: String,
  zone: String,
  status: String,
  createdAt: {
    type: Date,
    default: new Date()
  },
});

const IncidenciaMessage = mongoose.model('IncidenciaMessage', incidenciaSchema);

export default IncidenciaMessage;
