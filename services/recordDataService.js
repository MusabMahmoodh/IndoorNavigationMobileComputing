import WifiReborn from 'react-native-wifi-reborn';
// import * as Permissions from "expo-permissions";
import {PermissionsAndroid} from 'react-native';
import determineLocation from './locationService';

async function recordData() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission is required for WiFi connections',
        message:
          'This app needs location permission as this is required  ' +
          'to scan for wifi networks.',
        buttonNegative: 'DENY',
        buttonPositive: 'ALLOW',
      },
    );
    // const grantedLoc = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.LO, {
    //   title: "Location permission is required for WiFi connections",
    //   message: "This app needs location permission as this is required  " + "to scan for wifi networks.",
    //   buttonNegative: "DENY",
    //   buttonPositive: "ALLOW",
    // });

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // Get the current WiFi signal strength
      const wifiList = await WifiReborn?.loadWifiList();
      const signalStrengths = wifiList?.map(wifi => {
        console.log('Strength:', wifi.SSID, ' -> ', wifi.level);
        return wifi.level;
      });

      // Get the current location
      const location = await determineLocation();
      console.log(`Latitude: ${location}`);
      console.log(`Longitude: ${location}`);

      // Save data to database
      // await saveDataToDatabase(strength, location);
    } else {
      // Permission denied
    }
  } catch (error) {
    console.error(error);
  }
}

export default recordData;

// Function to save data to database
async function saveDataToDatabase(strength, location) {
  try {
    // Connect to database
    // const db = await connectToDatabase();

    // // Insert data into database
    // await db.execute(
    //   'INSERT INTO wifi_data (strength, location) VALUES (?, ?)',
    //   [strength, location]
    // );
    cnsole.log('Data saved to database', strength, location);
  } catch (error) {
    console.error(error);
  }
}
