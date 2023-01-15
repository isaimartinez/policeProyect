import React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { MenuProps } from '../../../utils'
import {setShowZones, setShowTraffic} from '../../../redux/reducers/viewSlice'
import useFilters from '../hooks/userFilters';

const Filters = () => {
  const {handleChange, handleSelectHelper, zones, selectedZones, showZones, showTraffic, dispatch} = useFilters()

  return (
    <>
      <p className='text-left text-lg font-semibold ml-5 mb-1'>Filtros</p>
      <div className='flex flex-col items-center'>
        <FormControl className='bg-white relative' sx={{ m: 1, width: 250 }}>
          <div className='flex absolute -top-5 right-0 z-10 cursor-pointer' onClick={handleSelectHelper}>
            <p className='text-blue-500 text-sm'>
              {selectedZones.length < zones.length ? "Seleccionar Todo" : "Limpiar"}
            </p>
          </div>
          <InputLabel id="demo-multiple-checkbox-label">Zonas</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedZones}
            onChange={handleChange}
            input={<OutlinedInput label="Zonas" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {zones.map(({name}) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={selectedZones.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className='bg-white' sx={{ m: 1, width: 250 }}>
          <FormControlLabel className='bg-white mx-1' control={<Checkbox checked={showZones} onChange	={(e) => {dispatch(setShowZones(!showZones))}} />} label="Mostrar Zonas" />
          <FormControlLabel className='bg-white' control={<Checkbox checked={showTraffic} onChange	={(e) => {dispatch(setShowTraffic(!showTraffic))}} />} label="Mostrar Tráfico" />
        </FormControl>
      </div>
    </>
  )
}

export default Filters