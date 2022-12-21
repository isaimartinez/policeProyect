import jwt from 'jsonwebtoken'


const auth = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1]
    if(!token){
      return res.status(404).json({message: 'Invalid Credendials'})
    }
    let decodedData = jwt.verify(token, 'secret')
    req.userId= decodedData.id
    req.userKey = decodedData.key
    next()

  } catch (error) {
    console.log(error)
  }
}

export default auth