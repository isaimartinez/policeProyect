import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid'

export const genId = () => {
  return uuidv4()
}

export const ONE_SECOND_IN_MS = 1000;

export const VIBRATION_PATTERN = [
  1 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
  3 * ONE_SECOND_IN_MS
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