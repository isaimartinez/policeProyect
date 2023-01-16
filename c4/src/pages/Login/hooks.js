import React,{useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {fetchLogin} from '../../redux/reducers/authSlice'


export const useLogin = () => {
  // const [id, setId] = useState("848b1a03-d950-4978-82ae-3a3dcfedf943")
  // const [key, setKey] = useState("71e9862a-c1de-455a-8f1d-71d5f998e6a8")

  const [id, setId] = useState("")
  const [key, setKey] = useState("")
  const [isDisabledBtn, setIsDisabledBtn] = useState(false)

  useEffect(() => {
    if(id.length == 0 || key.length == 0){
      setIsDisabledBtn(true)
    } else{
      setIsDisabledBtn(false)
    }
  }, [id, key])
  

  // const [id, setId] = useState("")
  // const [key, setKey] = useState("")
  const dispatch = useDispatch()


  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(fetchLogin({id, key}))
  }

  return {id, setId, key, setKey, handleLogin,  isDisabledBtn}
}