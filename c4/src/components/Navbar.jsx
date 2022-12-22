import React,{useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {FaCog, FaTimes, FaBars} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { setActiveMenu } from '../redux/reducers/viewSlice'
import jwt_decode from "jwt-decode";
import {logout} from '../redux/reducers/authSlice'

const NavButton = ({title, customFunc, icon, color}) => (
  <button type='button' onClick={customFunc} style={{color}}
    className='relative flex flex-row items-center bg-white shadow text-xl rounded-full p-3 hover:bg-light-gray '
  >
    {icon} {title}
  </button>
)



const NavBar = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const state = useSelector((state) => state)
  const {activeMenu} = state.view

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  useEffect(() => {
    const token = user?.token;

    if(token){
      const decodedToken = jwt_decode(token)

      if(decodedToken.exp * 1000 < new Date().getTime()){
        dispatch(logout())
        setUser(null)
        navigate("/")
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])
  


  return (
    <div className='flex z-10 fixed top-0 left-0 w-full bg-transparent justify-between p-3'>
      <div className='flex flex-row gap-5'>
        <NavButton color={"black"} icon={!activeMenu ? <FaBars/> : <FaTimes />}
          customFunc={() => dispatch(setActiveMenu(!activeMenu))}
        />

      </div>
      {/* <NavButton color={"black"} icon={<FaCog/>}/> */}
    </div>
  )
}

export default NavBar