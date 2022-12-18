import React from 'react'
import {FaCog, FaTimes, FaBars} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { setActiveMenu } from '../redux/reducers/viewSlice'

const NavButton = ({title, customFunc, icon, color}) => (
  <button type='button' onClick={customFunc} style={{color}}
    className='relative flex flex-row items-center bg-white shadow text-xl rounded-full p-3 hover:bg-light-gray '
  >
    {icon} {title}
  </button>
)

const NavBar = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const {activeMenu} = state.view

  return (
    <div className='flex z-10 fixed top-0 left-0 w-full bg-transparent justify-between p-3'>
      <div className='flex flex-row gap-5'>
        <NavButton color={"black"} icon={!activeMenu ? <FaBars/> : <FaTimes />}
          customFunc={() => dispatch(setActiveMenu(!activeMenu))}
        />

      </div>
      <NavButton color={"black"} icon={<FaCog/>}/>
    </div>
  )
}

export default NavBar