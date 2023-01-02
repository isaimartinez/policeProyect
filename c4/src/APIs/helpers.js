import {store} from '../redux/store'
import {auth} from '../redux/reducers/authSlice'
import {setIncidencias, setZones, setFilteredIncidencias} from '../redux/reducers/dataSlice'
import {fetchData, fetchZones} from '.'
import {FaImage, FaVideo, FaPlay} from 'react-icons/fa'

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

export const getKindOfFile = (url) => {
  const ext = url?.split('.').pop().toLowerCase()
  let kindOfFile
  if(ext == "png" || ext == "jpeg" || ext == "jpg"){
    kindOfFile = "pic"
  } else if(ext == "mp4" || ext == "mov"){
    kindOfFile = "video"
  } else if(ext == "mp3" || ext == "ogg"){
    kindOfFile = "audio"
  }
  return kindOfFile
}

export const getFileIcon = (url) => {
  const kindOfFile = getKindOfFile(url)
  switch (kindOfFile) {
    case "pic":
      return <FaImage color='#94A3B8'/>
    case "video":
      return <FaVideo color='#94A3B8'/>
    case "audio":
      return <FaPlay color='#94A3B8'/>
    default:
      break;
  }
}