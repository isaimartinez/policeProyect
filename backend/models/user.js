import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  password: {type: String, required: true},
  id: {type:String}
})

export default mongoose.model('User', userSchema)