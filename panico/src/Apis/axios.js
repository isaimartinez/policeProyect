import axios from 'axios'

const API = axios.create({baseURL: 'http://10.18.17.243:5000'})

export const createReport = (incidencia) => API.post("/report/createReport", {incidencia})
export const postFile = (file, id) => API.patch(`/report/setReportFile/${id}`, file)
export const postComment = (comment, id) => API.patch(`/report/setReportDetails/${id}`, {comment})