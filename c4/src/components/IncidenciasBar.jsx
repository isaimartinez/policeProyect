import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setIncidenciaActive} from '../redux/reducers/dataSlice'
import {setIsModalIncidencia} from '../redux/reducers/viewSlice'
import {ItemIncidencia} from './'

const IncidenciasBar = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const {incidencias} = state.data



  return (
    <div className='flex flex-col gap-2 z-10 bg-transparent fixed top-0 right-0 mt-5 mb-5 pb-10 mr-3 overflow-auto h-screen'>
      {incidencias?.slice(0).reverse().map((item, i) => (
        <ItemIncidencia item={item} key={item.id}/>
      ))}
    </div>
  )
}

export default IncidenciasBar