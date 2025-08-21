import Location from "../models/Location.js";

/**
 * Haversine Formula: Get distance between two coordinates (in meters)
 */
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Radius of Earth in meters
  const toRad = (x) => (x * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // distance in meters
}

/**
 * Check if user is inside any active location
 * @param {Number} userLat
 * @param {Number} userLon
 * @returns {Object|null} Active location object or null
 */
export async function checkUserWithinLocation(userLat, userLon) {
  const activeLocations = await Location.find({isActive: true});

  for (const loc of activeLocations) {
    const [lon, lat] = loc.coordinates.coordinates;
    const distance = getDistance(userLat, userLon, lat, lon);
    if (distance <= loc.radius) {
      return loc; // user is inside this location
    }
  }

  return null; // user not inside any location
}
