import {store} from '../redux/store'
import {auth} from '../redux/reducers/authSlice'
import {setIncidencias, setZones, setFilteredIncidencias} from '../redux/reducers/dataSlice'
import {fetchData, fetchZones} from '.'

export async function onLoad()  {
  let user = JSON.parse(localStorage.getItem('profile'))
  if(user) {
    store.dispatch(auth(user))
  }
  let {data} = await fetchData()
  let zones = await fetchZones()
  store.dispatch(setIncidencias(data.data))
  store.dispatch(setZones(zones.data))
  // store.dispatch(setSelectedZones(zones.data))
}

export function filterIncidencias(incidencias, selectedZones) {
  let obj = []
  for (let i = 0; i < incidencias.length; i++) {
    const item = incidencias[i];
    for (let j = 0; j < selectedZones.length; j++) {
      const z = selectedZones[j];
      if(item.zoneName == z){
        obj.push(item);
      }
    }
    if(item.zoneName == "Out Of Range") {obj.push(item)}
    
  }
  store.dispatch(setFilteredIncidencias(obj))
}