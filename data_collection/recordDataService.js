import WifiReborn from 'react-native-wifi-reborn';
import {PermissionsAndroid} from 'react-native';
import determineLocation from '../services/locationService';

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

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // Get the current WiFi signal strength
      const wifiList = await WifiReborn?.loadWifiList();
      const signalStrengths = wifiList?.map(wifi => {
        return {[wifi.SSID]: wifi.level};
      });

      // Get the current location
      const loc = await determineLocation();

      //TODO:Get IMU data

      // Save data to database
      await saveDataToDatabase(signalStrengths, loc);
      return {signalStrengths, loc};
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
    console.log('Data saved to database', strength, location);
  } catch (error) {
    console.error(error);
  }
}
