import axios from 'axios'

const API = axios.create({baseURL: 'https://alpha-colon-b486ce862e2a.herokuapp.com'})
// const API = axios.create({baseURL: 'http://10.15.19.234:5000'})

export const createReport = (incidencia) => API.post("/report/createReport", {incidencia})
export const postFile = (file, id) => API.patch(`/report/setReportFile/${id}`, file)
export const postComment = (comment, id) => API.patch(`/report/setReportDetails/${id}`, {comment})