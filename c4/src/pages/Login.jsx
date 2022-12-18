import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = () => {
  return (
    <div className='flex w-full h-screen m-auto justify-center items-center'>
      <div className='flex flex-col gap-5 w-80'>
        <TextField id="filled-basic" label="Id" variant="filled" />
        <TextField id="filled-basic" label="Password" variant="filled" />

        <Button variant="outlined" size='large'>Iniciar Sesión</Button>
      </div>
    </div>
  )
}

export default Login