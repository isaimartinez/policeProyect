import {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {logout} from '../../../redux/reducers/authSlice'
import jwt_decode from "jwt-decode";


const useNavbar = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

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
  
}

export default useNavbar