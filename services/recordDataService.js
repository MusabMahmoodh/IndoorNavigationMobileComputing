import WifiReborn from "react-native-wifi-reborn";
// import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { PermissionsAndroid } from "react-native";

async function recordData() {
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
      title: "Location permission is required for WiFi connections",
      message: "This app needs location permission as this is required  " + "to scan for wifi networks.",
      buttonNegative: "DENY",
      buttonPositive: "ALLOW",
    });
    const grantedLoc = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.LO, {
      title: "Location permission is required for WiFi connections",
      message: "This app needs location permission as this is required  " + "to scan for wifi networks.",
      buttonNegative: "DENY",
      buttonPositive: "ALLOW",
    });

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // Get the current WiFi signal strength
      const wifiList = await WifiReborn?.loadWifiList();
      const signalStrengths = wifiList?.map((wifi) => wifi.level);
      console.log(signalStrengths);

      // Get the current location
      const location = await Location.getCurrentPositionAsync({});
      console.log(`Latitude: ${location.coords.latitude}`);
      console.log(`Longitude: ${location.coords.longitude}`);

      // Store the WiFi signal strength and location in a database or file
      // You can use a library such as expo-sqlite or the Expo.FileSystem API to store the data
    } else {
      // Permission denied
    }
  } catch (error) {
    console.error(error);
  }
}

export default recordData;
