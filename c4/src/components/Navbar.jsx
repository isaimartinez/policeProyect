import React, {useEffect} from 'react'
import {AiOutlineMenu} from 'react-icons/ai'

import { useSelector, useDispatch } from 'react-redux'
import { setActiveMenu, setScreenSize } from '../redux/reducers/viewSlice'
import logo from '../assets/logoColon.jpeg'

const NavButton = ({title, customFunc, icon, color, dotColor}) => (
  <button type='button' onClick={customFunc} style={{color}}
    className='relative text-xl rounded-full p-3 hover:bg-light-gray '
  >
    <span style={{background: dotColor}}
      className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2'
    />
    {icon}
  </button>
)

const NavBar = () => {
  const dispatch = useDispatch()

  const state = useSelector((state) => state)
  const {  screenSize, activeMenu} = state.view
  useEffect(() => {
    const handleResize = () => dispatch(setScreenSize(window.innerWidth))

    window.addEventListener('resize', handleResize)

    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if(screenSize <= 900){
      dispatch(setActiveMenu(false))
    } else {
      dispatch(setActiveMenu(true))
    }
    
    return () => {
      
    }
  }, [screenSize])

  return (
    <div className='flex justify-between items-center p-2 md:mx-6 relative'>
      <NavButton title="Menu" color={"black"} icon={<AiOutlineMenu/>}
        customFunc={() => dispatch(setActiveMenu(!activeMenu))}
      />
      <div>
        <p className='font-bold text-xl'>C4</p>
      </div>
      <img src={logo} className="w-24 h-24 rounded"/>
    </div>
  )
}

export default NavBar