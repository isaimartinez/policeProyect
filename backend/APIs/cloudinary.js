import {v2 as cloudinary} from 'cloudinary'

export const cloudConfig = () => {
  cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_SECRET,
    secure: true
  });
}

export const uploadFile = async (path) => {
  try {
    console.log("key", process.env.CLOUD_KEY)
    console.log("path", path)
    return await cloudinary.uploader.upload(path, {
      folder: 'files'
    })
  } catch (error) {
    console.log("error", error)
  }
}