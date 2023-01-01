import mongoose from "mongoose";
import ZoneModel from '../models/zonas.js'

export const createZone = async (req, res) => {
  const {zone} = req.body
  try {
    let idZone = "id" + Math.random().toString(16).slice(2)
    const newZone = new ZoneModel({...zone, idZone})
    await newZone.save()
    res.status(201).json(zone);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
}

export const getZones = async (req, res) => {
  try {
    const  zonas = await ZoneModel.find()
    res.status(201).json(zonas);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}