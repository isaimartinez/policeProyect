import React from 'react'
import {AiOutlineMenu} from 'react-icons/ai'
import {FaCog} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { setActiveMenu } from '../redux/reducers/viewSlice'
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

import { ITEM_HEIGHT, ITEM_PADDING_TOP, MenuProps, getStyles, names } from '../utils'
import {setDate, setSelectedZones} from '../redux/reducers/dataSlice'

const NavButton = ({title, customFunc, icon, color}) => (
  <button type='button' onClick={customFunc} style={{color}}
    className='relative flex flex-row items-center bg-white shadow text-xl rounded-full p-3 hover:bg-light-gray '
  >
    {icon} {title}
  </button>
)

const NavBar = () => {
  const dispatch = useDispatch()
  const theme = useTheme();

  const state = useSelector((state) => state)
  const {activeMenu} = state.view
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
    <div className='flex z-10 fixed top-0 left-0 w-full bg-transparent justify-between p-3'>
      <div className='flex flex-row gap-5'>
        <NavButton color={"black"} icon={<AiOutlineMenu/>}
          customFunc={() => dispatch(setActiveMenu(!activeMenu))}
        />
        {/* <div className='flex'>

        <FormControl className='bg-white shadow' sx={{ m: 1, width: 600 }}>
          <InputLabel id="demo-multiple-chip-label">Sectores</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
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

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            className='bg-white shadow'
            inputFormat="MM/DD/YYYY"
            value={date}
            onChange={newDate =>dispatch(setDate(newDate))}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        </div> */}

      </div>
      <NavButton color={"black"} icon={<FaCog/>}/>
    </div>
  )
}

export default NavBar