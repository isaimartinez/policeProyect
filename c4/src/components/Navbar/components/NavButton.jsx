import React from 'react'

const NavButton = ({title, customFunc, icon, color}) => (
  <button type='button' onClick={customFunc} style={{color}}
    className='relative flex flex-row items-center bg-white shadow text-xl rounded-full p-3 hover:bg-light-gray '
  >
    {icon} {title}
  </button>
)

export default NavButton