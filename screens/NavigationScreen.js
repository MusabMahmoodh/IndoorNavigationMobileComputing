import React from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { View } from "react-native";
import determineLocation from "../services/locationService";
import { getDestination } from "../services/destinationService";

function NavigationScreen() {
  // Determine user's current location
  const location = determineLocation();

  // Determine desired destination
  const destination = getDestination()
    .then((destination) => {
      const dest = destination;
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
        <Marker
          coordinate={{
            latitude: destination.latitude,
            longitude: destination.longitude,
          }}
        />
        <Polyline
          coordinates={[
            { latitude: location.latitude, longitude: location.longitude },
            { latitude: destination.latitude, longitude: destination.longitude },
          ]}
        />
      </MapView>
    </View>
  );
}

export default NavigationScreen;
