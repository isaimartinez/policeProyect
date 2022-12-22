import React from 'react'
import {GrClose} from 'react-icons/gr'

const HeaderModal = ({title, closeModal}) => {
  return (
    <div className='flex justify-between bg-white p-3 rounded-md basis-1/12 items-center'>
      <p className='text-slate-900 text-2xl font-extrabold'>{title}</p>
      <button type='button'
        onClick={closeModal}
        className='text-2xl hover:drop-shadow-xl hover:bg-light-gray'
      >
        <GrClose />
      </button>
    </div>
  )
}

export default HeaderModal