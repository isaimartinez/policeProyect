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

import { useSelector, useDispatch } from 'react-redux'
import { setActiveMenu} from '../redux/reducers/viewSlice'

import { MenuProps, getStyles } from '../utils'
import {setDate, setSelectedZones} from '../redux/reducers/dataSlice'

const Sidebar = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const theme = useTheme();

  const {activeMenu } = state.view
  const {date, selectedZones, zones} = state.data

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
    <div className='flex z-10 bg-white fixed top-0 shadow left-0 h-screen overflow-auto'>
      {
        activeMenu && ( <>
          <div className='flex flex-col mt-20 p-2 w-72 items-center'>
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
                <InputLabel id="chipLabel">Zonas</InputLabel>
                <Select
                  labelId="chipLabel"
                  id="demo-multiple-chip"
                  multiple
                  value={selectedZones}
                  onChange={handleChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {zones.map(({name}) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, selectedZones, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
          </div>
        </>)
      }
    </div>
  )
}

export default Sidebar