import React from 'react'
import { fetchData, getAddress } from '../APIs/index'
import {Item} from '../components/'
import { useSelector, useDispatch } from 'react-redux'

const Main = () => {
  const {incidencias} = useSelector((state) => state.data)


  return (
    <div className='flex flex-col h-full m-2 '>
      <div className='flex flex-col gap-2 p-3'>
        {
          incidencias.map((item, i) => (
            <Item item={item} i={i} key={i}/>
          ))
        }
      </div>
    </div>
  )
}

export default Main