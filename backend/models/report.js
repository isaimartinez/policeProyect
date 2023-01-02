import mongoose from "mongoose";

const reportSchema = mongoose.Schema({
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
  comment: String,
  url: String,
  createdAt: {
    type: Date,
    default: new Date()
  },
  resolvedAt: Date
});

const Report = mongoose.model('Report', reportSchema);

export default Report;
