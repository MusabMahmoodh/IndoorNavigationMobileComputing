import Geolocation from '@react-native-community/geolocation';

function determineLocation() {
  const location = new Promise(function (resolve, reject) {
    Geolocation.getCurrentPosition(
      position => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude,
          heading: position.coords.heading,
        });
      },
      error => {
        reject(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });

  return location;
}

export default determineLocation;
