import * as Location from "expo-location";
import { distance, duration } from "geolib";

async function calculateDistance(location1, location2) {
  try {
    const distanceInMeters = await Location.getDistanceAsync(location1, location2);
    const distanceInKilometers = distanceInMeters / 1000;
    return `${distanceInKilometers.toFixed(2)} km`;
  } catch (error) {
    console.error(error);
  }
}

function calculateTime(location1, location2) {
  const timeInSeconds = duration(location1, location2);
  const timeInMinutes = timeInSeconds / 60;
  return `${timeInMinutes.toFixed(0)} minutes`;
}

export { calculateDistance, calculateTime };
