import Geolocation from '@react-native-community/geolocation';

async function determineLocation() {
  try {
    const location = await Geolocation.getCurrentPosition(
      (position) => {
        return {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

    return location;
  } catch (error) {
    console.error(error);
  }
}

export default determineLocation;
