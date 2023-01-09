import React,{useState, useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux'
import {fetchLogin} from '../redux/reducers/authSlice'
import {onLoad} from '../APIs/helpers'

const Login = () => {
  const [id, setId] = useState("848b1a03-d950-4978-82ae-3a3dcfedf943")
  const [key, setKey] = useState("71e9862a-c1de-455a-8f1d-71d5f998e6a8")
  const dispatch = useDispatch()
  
  

  const handleLogin = (e) => {
    e.preventDefault()
    try {
      dispatch(fetchLogin({id, key}))
      setTimeout(async () => {
        onLoad()
      }, 2000);
    } catch (error) {
      console.log("error", error)
    }
  }

  return (
    <div className='flex w-full h-screen m-auto justify-center items-center'>
      <form className='flex flex-col gap-5 w-96' onSubmit={handleLogin}>
        <TextField id="filled-basic" label="Id" variant="filled" value={id} onChange={e => setId(e.target.value)}/>
        <TextField id="filled-basic" label="Password" variant="filled" value={key} onChange={e => setKey(e.target.value)}/>

        <Button type='submit' variant="outlined" size='large'>Iniciar Sesión</Button>
      </form>
    </div>
  )
}

export default Login