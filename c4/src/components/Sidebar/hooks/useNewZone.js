import { useSelector, useDispatch } from 'react-redux'
import {setDrawingZone} from '../../../redux/reducers/viewSlice'
import {setTempZone, saveZone} from '../../../redux/reducers/dataSlice'
import { toast } from 'react-toastify';

const useNewZone = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const { drawingZone } = state.view
  const {tempZone} = state.data


  const handleCancelCreateZone = () => {
    dispatch(setDrawingZone(false))
    dispatch(setTempZone({name: "", coords: [], color: ""}))
  }


  const handleSaveZone = () => {
    if(tempZone.name.length == 0) {
      toast.error('Necesitas asignar un nombre', {
        position: "top-right",
        autoClose: 2500,
        theme: "light",
      });
      return false
    }
    dispatch(saveZone(tempZone))
    dispatch(setDrawingZone(false))
    dispatch(setTempZone({name: "", coords: [], color: ""}))
  }


  return {dispatch,drawingZone,tempZone, handleCancelCreateZone, handleSaveZone}

}

export default useNewZone