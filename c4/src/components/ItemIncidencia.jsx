import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setIncidenciaActive} from '../redux/reducers/dataSlice'
import Button from '@mui/material/Button';
import {updateIncidencia} from '../APIs/'
import {removeIncidencia} from '../redux/reducers/dataSlice'

const ItemIncidencia = ({item}) => {
  const state = useSelector((state) => state)
  const {incidencias} = state.data

  const dispatch = useDispatch()
  const [isActive, setIsActive] = useState(false)

  const handleClickItem = (id) => {
    // dispatch(setIncidenciaActive(id))
    setIsActive(!isActive)
  }

  const onMouseEnter = () => {
    dispatch(setIncidenciaActive(item.id))
  }

  const onMouseLeave = () => {
    dispatch(setIncidenciaActive(""))
  }

  const onResolve = async () => {
    const newItem = {...item, status: "1", resolvedAt: new Date()}
    await updateIncidencia(item._id, newItem)
    dispatch(removeIncidencia(item.id))
  }

  return (
    <div className='flex flex-col shadow-lg hover:shadow-xl p-2 bg-white hover:bg-slate-100 rounded cursor-pointer'
      onClick={() => handleClickItem(item.id)}
      key={item.id}
      onMouseEnter={() => {onMouseEnter()}}
      onMouseLeave={() => {onMouseLeave()}}
    >
      <p>Nombre: <span>{item.name}</span></p>
      <p>Número: <span>{item.phoneNumber}</span></p>
      <p>Dirección: <span>{item.address}</span></p>
      {
        isActive && (
          <>
            {/* <p>Coordenadas: <span>{item.latitude},{item.longitude}</span></p> */}
            <div className='flex mt-1 flex-col items-center justify-center'>
              <Button variant="outlined" size='large'
                onClick={onResolve}
              >
                Resuelto
              </Button>
            </div>
          </>
        )
      }
    </div>
  )
}

export default ItemIncidencia