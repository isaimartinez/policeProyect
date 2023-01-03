import {v2 as cloudinary} from 'cloudinary'
import { getKindOfFile } from './index.js';

export const cloudConfig = () => {
  cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_SECRET,
    secure: true
  });
}

export const uploadFile = async (path, mimetype) => {
  try {
    const resource_type = getKindOfFile(mimetype)
    console.log("resource_type", resource_type)
    return await cloudinary.uploader.upload(path, {
      folder: 'files',
      resource_type
    })
  } catch (error) {
    console.log("error", error)
  }
}