import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid'

export const genId = () => {
  return uuidv4()
}

export const INTERVAL = 200;

export const VIBRATION_PATTERN = [
  1 * INTERVAL,
  2 * INTERVAL,
  3 * INTERVAL,
  4 * INTERVAL,
  5 * INTERVAL
];

export const getKindOfFile = (url) => {
  const ext = url?.split('.').pop().toLowerCase()
  let kindOfFile
  if(ext == "png" || ext == "jpeg" || ext == "jpg"){
    kindOfFile = "pic"
  } else if(ext == "mp4" || ext == "mov"){
    kindOfFile = "video"
  } else if(ext == "mp3" || ext == "ogg"){
    kindOfFile = "audio"
  }
  return kindOfFile
}

export const cameraImageOptions = {
  mediaType: "photo",
  videoQuality: "low",
  durationLimit: 15,
  quality: 0
}

export const cameraVideoOptions = {
  mediaType: "video",
  videoQuality: "low",
  durationLimit: 15,
  quality: 0
}

export const libraryOptions = {
  mediaType: "mixed",
  videoQuality: "low",
  durationLimit: 15,
  quality: 0
}