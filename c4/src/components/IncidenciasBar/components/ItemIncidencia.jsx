import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setIncidenciaActive} from '../../../redux/reducers/dataSlice'
import Button from '@mui/material/Button';
import {updateIncidencia} from '../../../APIs'
import {removeIncidencia} from '../../../redux/reducers/dataSlice'
import {FaComment} from 'react-icons/fa'
import { getFileIcon } from '../../../APIs/helpers';
import {RenderFileReport} from './'

const Icons = ({url, comment}) => {
  return (
    <div className='flex flex-row absolute gap-1 right-2 top-1'>
      {comment && <FaComment color='#94A3B8' className='' />}
      {url && getFileIcon(url)}
    </div>
  )
}

const ItemIncidencia = ({item}) => {
  const state = useSelector((state) => state)
  const {incidencias} = state.data

  const dispatch = useDispatch()
  const [isActive, setIsActive] = useState(false)

  const handleClickItem = (id) => {
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
    <div className='flex relative flex-col shadow-lg hover:shadow-xl w-[500px] p-2 bg-white opacity-60 hover:opacity-100 rounded cursor-pointer'
      onClick={() => handleClickItem(item.id)}
      key={item.id}
      onMouseEnter={() => {onMouseEnter()}}
      onMouseLeave={() => {onMouseLeave()}}
    >
      <Icons url={item?.url} comment={item?.comment}/>
      <p>Nombre: <span>{item.name}</span></p>
      <p>Número: <span>{item.phoneNumber}</span></p>
      <p>Dirección: <span>{item.address}</span></p>
      {
        isActive && (
          <>
            {item?.url && (
              <>
                <RenderFileReport url={item?.url} public_id={item?.public_id}/>
              </>
              )}
            {item?.comment && (<p>Detalles: <span>{item?.comment}</span></p>)}
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