import { useSelector, useDispatch } from 'react-redux'
import {setSelectedZones} from '../../../redux/reducers/dataSlice'

const useFilters = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const {zones, selectedZones, date} = state.data
  const {drawingZone, showZones, showTraffic} = state.view

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    dispatch(setSelectedZones(
      typeof value === 'string' ? value.split(',') : value,
    ));
  };

  const handleSelectHelper = () => {
    if(selectedZones.length < zones.length) {
      let obj = []
      for (let i = 0; i < zones.length; i++) {
        const z = zones[i];
        const {name} = z
        obj.push(name)
      }
      dispatch(setSelectedZones(obj))
    } else {
      dispatch(setSelectedZones([]))
    }
  }

  return {handleChange, handleSelectHelper, zones, selectedZones, showZones, showTraffic, dispatch}

}

export default useFilters