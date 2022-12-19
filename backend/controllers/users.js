import UserModel from '../models/user.js'
import jwt from 'jsonwebtoken'

export const signin = async (req, res) => {
  const { id, key} = req.body
  console.log("id ", id, " key ", key)
  try {
    const existingUser = await UserModel.findOne({id});

    console.log("Exist", existingUser)

    if(!existingUser) return res.status(404).json({message: 'Invalid Credendials'})

    const isKeyCorrect = key == existingUser.key

    if(!isKeyCorrect) return res.status(404).json({message: "Invalid Credendials"})

    const token = jwt.sign({id: existingUser.id, key: existingUser.key}, 'secret', {expiresIn: "1h"})
    
    res.status(200).json({result: existingUser, token})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: "Someting went wrong"})
  }
}