import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')){
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req;
})
export const fetchData = () => API.get(`/report/getReports`)
export const fetchZones = () => API.get('/zones/getZones')
export const postNewZone = (zone) => API.post("/zones/createZone", {zone})
export const updateIncidencia = (id, incidencia) => API.patch(`/report/setReportStatus/${id}`, incidencia)

// export const getAddress = (lat, lng) =>  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyD_CXv8QVNnm1xS5vyLUiwOWeljsH7oIyM`)


export const signIn = (user) => API.post('/user/signin', user);