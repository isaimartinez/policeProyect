import Geolocation from '@react-native-community/geolocation';

export const getCoords = async () => {
  try {
    console.log("getCoords");
    
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        info => {
          console.log("INFO", info.coords);
          resolve(info.coords);
        },
        (error) => {
          console.error(error);
          reject(error);
        }
        // {enableHighAccuracy: false, maximumAge: 10000}
      );
    });
  } catch (error) {
    console.error(error);
    throw error; // This will allow the calling function to handle the error as well
  }
}