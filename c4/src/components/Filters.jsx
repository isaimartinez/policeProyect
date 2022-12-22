import React from 'react'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

import { MenuProps, getStyles } from '../utils'

import { useSelector, useDispatch } from 'react-redux'
import {setDate, setSelectedZones} from '../redux/reducers/dataSlice'
import {setShowZones, setShowTraffic} from '../redux/reducers/viewSlice'

const Filters = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const {zones, selectedZones, date} = state.data
  const {drawingZone, showZones, showTraffic} = state.view
  const theme = useTheme();


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    dispatch(setSelectedZones(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    ));
  };

  return (
    <>
      <LocalizationProvider  dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          className='bg-white flex w-[250px] '
          style={{width: 250}}
          inputFormat="MM/DD/YYYY"
          value={date}
          onChange={newDate =>dispatch(setDate(newDate))}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <FormControl className='bg-white' sx={{ m: 1, width: 250 }}>
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
    </>
  )
}

export default Filters