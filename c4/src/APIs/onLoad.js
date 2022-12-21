import {store} from '../redux/store'
import {auth} from '../redux/reducers/authSlice'
import {setIncidencias, setZones} from '../redux/reducers/dataSlice'
import {fetchData, fetchZones} from './'

export async function onLoad()  {
  let user = JSON.parse(localStorage.getItem('profile'))
  if(user) {
    store.dispatch(auth(user))
  }
  let {data} = await fetchData()
  let zones = await fetchZones()
  console.log("zones", zones.data)
  store.dispatch(setIncidencias(data.data))
  store.dispatch(setZones(zones.data))
}