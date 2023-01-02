import {store} from '../redux/store'
import {setIncidencias, setZones, setFilteredIncidencias} from '../redux/reducers/dataSlice'


export const socket = (data) => {
  const state = store.getState();
  const {incidencias} = state.data
  switch (data.action) {
      case "NEW_REPORT":
        store.dispatch(setIncidencias([...incidencias, data.payload]))
        break;
      case "UPDATE_REPORT":
        const obj = incidencias.map((item,i) => {return item.id == data.payload.id ? data.payload : item})
        store.dispatch(setIncidencias(obj))
        break;
      default:
        break;
    }
}