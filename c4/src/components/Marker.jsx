import React from 'react'
import {FaMapMarker} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'

const Marker = ({color, id}) => {
  const state = useSelector((state) => state)
  const {incidenciaActive} = state.data
  return (
  <div>
    <FaMapMarker
      className={`${id == incidenciaActive ? 'animate-pulse' : null}`}
      color={color}
      size={id == incidenciaActive ? 38:30} 
    />
  </div>
  )
}

export default Marker