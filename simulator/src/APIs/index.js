import axios from 'axios'
const API = axios.create({baseURL: 'http://localhost:5000'})


export const postIncidencia = (incidencia) => API.post("c4/postData", {incidencia})
