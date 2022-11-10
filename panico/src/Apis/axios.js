import axios from 'axios'

const API = axios.create({baseURL: 'http://10.18.19.110:5000'})

export const fetchOnLoad = () => API.get(`/c4/`)
export const sendData = (user) => API.post('/c4/postData', {user})
