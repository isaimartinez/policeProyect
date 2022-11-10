import {getAddress} from '../APIs/index.js'
// let data = [{
//   user: {name:"name", phoneNumber: "123"},
//   coords: {latitude: 20.65497066082328, longitude: -100.09922948136055, speed: -1, accuracy: 5}
// }]
let data = []


export const onLoad = async (req, res) => {
  try {
    console.log("Success")
    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const onPostData = async (req, res) => {
  const { user} = req.body
  console.log(user)
  let finish = false
  try {
    let timer = setTimeout(() => {
      console.log("ADDRESS NOT WORKING")
      data.push(user)
      req.app.locals.ws.send(JSON.stringify(user))
      res.status(200).json("OK");
      finish = true
      return false
    }, 3000);

    let address = await getAddress(user.latitude, user.longitude)
    // let address = await wait()
    clearTimeout(timer)
    console.log(address.data.results[1].formatted_address)
    const obj = {...user, address: address.data.results[1].formatted_address}
    data.push(obj)
    req.app.locals.ws.send(JSON.stringify(obj))
    res.status(200).json("OK");
    finish = true
  } catch (error) {
    console.log(error.message)
    if(!finish) {
      res.status(404).json({ message: error.message });
    }
  }
}

export const getData = async (req, res) => {
  try {
    // req.app.locals.ws.send(JSON.stringify(data))
    res.status(200).json({data});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}


const wait = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, 5000);
    })
}