import React,{useState, useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux'

import {fetchLogin} from '../redux/reducers/authSlice'


const Login = () => {
  const [id, setId] = useState("848b1a03-d950-4978-82ae-3a3dcfedf943")
  const [key, setKey] = useState("71e9862a-c1de-455a-8f1d-71d5f998e6a8")
  const dispatch = useDispatch()
  
  

  const handleLogin = () => {
    dispatch(fetchLogin({id, key}))
    setTimeout(() => {
      
    }, 2000);
  }

  return (
    <div className='flex w-full h-screen m-auto justify-center items-center'>
      <div className='flex flex-col gap-5 w-80'>
        <TextField id="filled-basic" label="Id" variant="filled" value={id} onChange={e => setId(e.target.value)}/>
        <TextField id="filled-basic" label="Password" variant="filled" value={key} onChange={e => setKey(e.target.value)}/>

        <Button variant="outlined" size='large'
          onClick={handleLogin}
        >Iniciar Sesión</Button>
      </div>
    </div>
  )
}

export default Login