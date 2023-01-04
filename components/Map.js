import React from "react";
import MapView from "react-native-maps";
import determineLocation from "../services/locationService";

function Map() {
  // Determine user's current location
  const location = determineLocation();

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <MapView.Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
      />
    </MapView>
  );
}

export default Map;
