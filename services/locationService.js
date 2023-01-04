import * as Location from "expo-location";
import requestLocationPermission from "./requestLocationPermissionService";

async function determineLocation() {
  try {
    const location = await Location.getCurrentPositionAsync({});
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error(error);
  }
}

export default determineLocation;
