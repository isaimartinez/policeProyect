import mongoose from "mongoose";
import {getAddress, getZone} from '../APIs/index.js'
import { uploadFile } from "../APIs/cloudinary.js";
import ReportModel from '../models/report.js'
import sub from 'date-fns/sub/index.js'
import fs from 'fs-extra'

export const createReport = async (req, res) => {
  const { incidencia} = req.body
  console.log("entra", incidencia)
  try {
    let address = await getAddress(incidencia.latitude, incidencia.longitude)
    let zone = await getZone(incidencia.latitude, incidencia.longitude)
    const newIncidencia = new ReportModel({...incidencia, address: address.data.results[1].formatted_address, idZone: zone.idZone, zoneName: zone.zoneName, color: zone.color ? zone.color : "red", status: 0, createdAt: new Date().toISOString()});
    await newIncidencia.save();
    const data = JSON.stringify({action: "NEW_REPORT", payload: newIncidencia})
    req.app.locals?.ws?.send(data)
    res.status(201).json("OK");
  } catch (error) {
    res.status(501).json({ message: error.message });
    console.log(error.message)
  }
}

export const setReportStatus = async (req, res) => {
  const {id: _id} = req.params
  const incidencia = req.body
  if(!mongoose.Types.ObjectId.isValid(_id)) {return res.status(484).send('No id')}
  const updated = await ReportModel.findByIdAndUpdate(_id, incidencia, {new: true})
  res.json(updated);
}

export const setReportFile = async (req, res) => {
  try {
    const {id} = req.params
    if(req.files?.file){
      // upload
      console.log("file", req.files.file)
      const uploaded = await uploadFile(req.files.file.tempFilePath, req.files.file.mimetype)
      console.log("uploaded", uploaded)
      const url = uploaded.secure_url
      const public_id = uploaded.public_id
      const report = await ReportModel.findOne({id: id})
      const updated = await ReportModel.findByIdAndUpdate(report._id.toString(), {...report._doc, url, public_id}, {new: true})
      await fs.unlink(req.files.file.tempFilePath)
      res.status(201).json("OK");
      const data = JSON.stringify({action: "UPDATE_REPORT", payload: updated})
      req.app.locals?.ws?.send(data)
    }
  } catch (error) {
    console.log
    if (req.files?.image) {
      await fs.unlink(req.files.image.tempFilePath)
    }
    res.status(404).json({ message: error.message });
  }

}

export const setReportDetails = async (req, res) => {
  try {
    const {id} = req.params
    const {comment} = req.body
    if(id == "") {return res.status(484).send('No id')}
    const report = await ReportModel.findOne({id: id})
    const updated = await ReportModel.findByIdAndUpdate(report._id.toString(), {...report._doc, comment}, {new: true})
    res.status(201).json("OK");
    const data = JSON.stringify({action: "UPDATE_REPORT", payload: updated})
    req.app.locals?.ws?.send(data)
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getReports = async (req, res) => {
  try {
    const data = await ReportModel.find({
      createdAt: {
        $gte: sub(new Date(), {hours: 2}),
        $lte: new Date()
      },
      status: "0"
    })
    res.status(201).json({ data });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
