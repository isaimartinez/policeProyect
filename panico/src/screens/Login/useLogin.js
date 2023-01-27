import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { saveData } from '../../redux/reducers/mainSlice'

export const useLogin = () => {
  const dispatch = useDispatch()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [name, setName] = useState("")


  const storeInfo = () => {
    console.log("phone ", phoneNumber)
    console.log("name ", name)
    // Verificar if empty

    let data = {phoneNumber, name}
    dispatch(saveData({data, key:"userInfo"}))
  }

  return {phoneNumber, setPhoneNumber, name, setName, storeInfo}

}