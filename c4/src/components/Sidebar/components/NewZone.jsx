import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {setDrawingZone} from '../../../redux/reducers/viewSlice'
import {setTempZone, saveZone} from '../../../redux/reducers/dataSlice'
import { SliderPicker } from 'react-color';
import FormControl from '@mui/material/FormControl';
import useNewZone from '../hooks/useNewZone';

const NewZone = () => {
  const {dispatch,drawingZone,tempZone, handleCancelCreateZone, handleSaveZone} = useNewZone()


  if(!drawingZone) return (
    <Button size='large' onClick={() => {dispatch(setDrawingZone(true))}}>
      Crear Nueva Zona
    </Button>
  )

  return (
    <FormControl className='flex flex-col gap-2 items-center justify-center' sx={{ m: 1, width: 250 }}>
      <TextField id="filled-basic" label="Nombre" variant="filled" value={tempZone.name} className="w-full"
        onChange={e => dispatch(setTempZone({...tempZone, name: e.target.value}))}
        error={tempZone.name.length == 0}
      />
      <div className='flex flex-col gap-2 w-full'>
        <p>Selecciona un Color</p>
        <SliderPicker color={tempZone.color} onChangeComplete={(color) => {dispatch(setTempZone({...tempZone, color: color.hex}))}} />
      </div>
      <div>
        <p className='text-slate-400 text-sm text-center'>Procede a dar clicks con la forma de el área deseada, cuando termines da click en GUARDAR ZONA</p>
      </div>
      <div className='flex flex-row items-center justify-center'>
        <Button size='large' onClick={() => handleCancelCreateZone()}>
          Cancelar
        </Button>
        <Button size='large' onClick={handleSaveZone}>
          Guardar Zona
        </Button>
      </div>            
    </FormControl>
  )
}

export default NewZone