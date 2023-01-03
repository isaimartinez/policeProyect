import Geolocation from '@react-native-community/geolocation';

export const getCoords = async () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(info => {
      resolve(info.coords)
    });
  })
}