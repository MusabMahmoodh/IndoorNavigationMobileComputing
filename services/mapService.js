import { distance, duration } from "geolib";

function calculateDistance(location1, location2) {
  const distanceInMeters = distance(location1, location2);
  const distanceInKilometers = distanceInMeters / 1000;
  return `${distanceInKilometers.toFixed(2)} km`;
}

function calculateTime(location1, location2) {
  const timeInSeconds = duration(location1, location2);
  const timeInMinutes = timeInSeconds / 60;
  return `${timeInMinutes.toFixed(0)} minutes`;
}

export { calculateDistance, calculateTime };
