import axios from 'axios'
const API = axios.create({baseURL: 'http://localhost:5000'})


export const postIncidencia = (incidencia) => API.post("/report/createReport", {incidencia})
export const postFile = (file, id) => API.patch(`/report/setReportFile/${id}`, file)
export const postComment = (comment, id) => API.patch(`/report/setReportDetails/${id}`, {comment})