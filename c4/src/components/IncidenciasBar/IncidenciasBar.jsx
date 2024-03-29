import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {ItemIncidencia} from './components'

const IncidenciasBar = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const {incidencias, filteredIncidencias} = state.data

  return (
    <div className='flex flex-col gap-2 z-10 bg-transparent fixed top-0 right-0 mt-5 mb-5 pb-10 mr-3 overflow-y-auto overflow-x-hidden h-screen'>
      {filteredIncidencias?.slice(0).reverse().map((item, i) => (
        <ItemIncidencia item={item} key={item.id}/>
      ))}
    </div>
  )
}

export default IncidenciasBar