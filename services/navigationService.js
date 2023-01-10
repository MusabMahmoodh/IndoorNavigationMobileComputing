import { getBearing } from "geolib";
import { calculateDistance } from "./mapService";

function getDirection(location1, location2) {
  const bearing = getBearing(location1, location2);
  if (bearing > 337.5 || bearing <= 22.5) {
    return "north";
  } else if (bearing > 22.5 && bearing <= 67.5) {
    return "northeast";
  } else if (bearing > 67.5 && bearing <= 112.5) {
    return "east";
  } else if (bearing > 112.5 && bearing <= 157.5) {
    return "southeast";
  } else if (bearing > 157.5 && bearing <= 202.5) {
    return "south";
  } else if (bearing > 202.5 && bearing <= 247.5) {
    return "southwest";
  } else if (bearing > 247.5 && bearing <= 292.5) {
    return "west";
  } else if (bearing > 292.5 && bearing <= 337.5) {
    return "northwest";
  }
}

function getTurnByTurnDirections(location, destination) {
  const distance = calculateDistance(location, destination);
  const direction = getDirection(location, destination);
  return `Head ${direction} for ${distance}`;
}

export { getTurnByTurnDirections };
