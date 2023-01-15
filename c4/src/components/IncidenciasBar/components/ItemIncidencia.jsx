import React from 'react'
import Button from '@mui/material/Button';
import {RenderFileReport} from './'
import IconsReport from './IconsReport';
import useItemReport from '../hooks/useItemReport';

const ItemReport = ({item}) => {
  const {handleClickItem, onMouseEnter, onMouseLeave, onResolve, isActive} = useItemReport(item)

  return (
    <div className='flex relative flex-col shadow-lg hover:shadow-xl w-[500px] p-2 bg-white opacity-60 hover:opacity-100 rounded cursor-pointer'
      onClick={() => handleClickItem(item.id)}
      key={item.id}
      onMouseEnter={() => {onMouseEnter()}}
      onMouseLeave={() => {onMouseLeave()}}
    >
      <IconsReport url={item?.url} comment={item?.comment}/>
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

export default ItemReport