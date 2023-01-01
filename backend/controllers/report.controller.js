import mongoose from "mongoose";
import {getAddress, getZone} from '../APIs/index.js'
import { uploadFile } from "../APIs/cloudinary.js";
import ReportModel from '../models/report.js'
import sub from 'date-fns/sub/index.js'
import fs from 'fs-extra'

export const createReport = async (req, res) => {
  const { incidencia} = req.body
  console.log(incidencia)
  try {
    let address = await getAddress(incidencia.latitude, incidencia.longitude)
    let zone = await getZone(incidencia.latitude, incidencia.longitude)
    console.log(zone)
    const newIncidencia = new ReportModel({...incidencia, address: address.data.results[1].formatted_address, idZone: zone.idZone, zoneName: zone.zoneName, color: zone.color ? zone.color : "red", status: 0, createdAt: new Date().toISOString()});
    await newIncidencia.save();
    req.app.locals.ws.send(JSON.stringify(newIncidencia))
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
    console.log("file",req.files.file)
    console.log("id", id)
    if(req.files?.file){
      // upload
      console.log("path", req.files.file.tempFilePath)
      const uploaded = await uploadFile(req.files.file.tempFilePath)
      console.log("uploaded", uploaded)
      const url = uploaded.secure_url
      const report = await ReportModel.findOne({id: id})
      const updated = await ReportModel.findByIdAndUpdate(report._id.toString(), {...report._doc, url}, {new: true})
      res.json(updated);
      await fs.unlink(req.files.image.tempFilePath)
    }
  } catch (error) {
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
    res.json(updated);
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
