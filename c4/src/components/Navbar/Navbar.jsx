import React from 'react'
import { FaTimes, FaBars} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { setActiveMenu } from '../../redux/reducers/viewSlice'
import NavButton from './components/NavButton'
import useNavbar from './hooks/useNavbar'

const NavBar = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const {activeMenu} = state.view

  useNavbar()

  return (
    <div className='flex z-10 fixed top-0 left-0 w-full bg-transparent justify-between p-3'>
      <div className='flex flex-row gap-5'>
        <NavButton color={"black"} icon={!activeMenu ? <FaBars/> : <FaTimes />}
          customFunc={() => dispatch(setActiveMenu(!activeMenu))}
        />
      </div>
    </div>
  )
}

export default NavBar