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
            <div className='flex flex-col'>
              <Filters />
              <div className='flex justify-center'>
                <NewZone />
              </div>
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