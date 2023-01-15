import {useState} from 'react'
import { useDispatch } from 'react-redux'
import {updateIncidencia} from '../../../APIs'
import {removeIncidencia} from '../../../redux/reducers/dataSlice'
import {setIncidenciaActive} from '../../../redux/reducers/dataSlice'

const useItemReport = (item) => {
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

  return {handleClickItem, onMouseEnter, onMouseLeave, onResolve, isActive}
}

export default useItemReport