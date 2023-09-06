import Geolocation from '@react-native-community/geolocation';

export const getCoords = async () => {
  try {
    const options = {enableHighAccuracy: false}
    console.log("getCoords")
    Geolocation.getCurrentPosition(info => {
      console.log("INFO", info)
      return info.coords
    },
    (error) => console.error(error),
    // {enableHighAccuracy: false,maximumAge: 10000}
    );
  } catch (error) {
    console.error(error)
  }
}