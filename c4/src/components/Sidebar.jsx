import React from 'react'
import {FaSignOutAlt} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import {logout} from '../redux/reducers/authSlice'

import {NewZone, Filters} from './'

const Sidebar = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  const {activeMenu} = state.view
  const {} = state.data


  const handleLogout = () => {
    dispatch(logout())
  }


  return (
    <div className='flex z-10 bg-white fixed top-0 shadow left-0 h-screen overflow-auto'>
      {
        activeMenu && ( <>
          <div className='flex flex-col w-72 justify-between mt-20 mb-10'>
            <div className='flex flex-col items-center'>
                <Filters />
              {/* <LocalizationProvider  dateAdapter={AdapterDayjs}>
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
              <FormControl className='bg-white' sx={{ m: 1, width: 250 }}>
                <FormControlLabel className='bg-white mx-1' control={<Checkbox checked={showZones} onChange	={(e) => {dispatch(setShowZones(!showZones))}} />} label="Mostrar Zonas" />
                <FormControlLabel className='bg-white' control={<Checkbox checked={showTraffic} onChange	={(e) => {dispatch(setShowTraffic(!showTraffic))}} />} label="Mostrar Tráfico" />
              </FormControl> */}
              <NewZone />
            </div>
            <div className='flex flex-row justify-center items-center cursor-pointer gap-2 hover:bg-slate-100 rounded m-2 p-1'
              onClick={handleLogout}
            >
                <FaSignOutAlt />
                <p>Cerrar Sesión</p>      
            </div>
          </div>
        </>)
      }
    </div>
  )
}

export default Sidebar