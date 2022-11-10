import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:5000'})


export const fetchData = () => API.get(`/c4/getData`)
// export const getAddress = (lat, lng) =>  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyD_CXv8QVNnm1xS5vyLUiwOWeljsH7oIyM`)
