import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useLogin } from './hooks';

const Login = () => {
  const {id, setId, key, setKey, handleLogin} = useLogin()

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