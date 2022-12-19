import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  key: {type: String, required: true},
  id: {type:String}
})

export default mongoose.model('User', userSchema)