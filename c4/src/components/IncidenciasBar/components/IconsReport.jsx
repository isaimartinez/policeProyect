import React from 'react'
import {FaComment} from 'react-icons/fa'
import { getFileIcon } from '../../../APIs/helpers';

const IconsReport = ({url, comment}) => {
  return (
    <div className='flex flex-row absolute gap-1 right-2 top-1'>
      {comment && <FaComment color='#94A3B8' className='' />}
      {url && getFileIcon(url)}
    </div>
  )
}

export default IconsReport