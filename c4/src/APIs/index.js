import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')){
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req;
})
export const fetchData = () => API.get(`/c4/getData`)
export const fetchZones = () => API.get('c4/getZones')
export const postNewZone = (zone) => API.post("c4/createZone", {zone})
export const updateIncidencia = (id, incidencia) => API.patch(`/c4/${id}`, incidencia)

// export const getAddress = (lat, lng) =>  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyD_CXv8QVNnm1xS5vyLUiwOWeljsH7oIyM`)


export const signIn = (user) => API.post('/user/signin', user);