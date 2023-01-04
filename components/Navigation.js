import React from "react";
import { View, Text } from "react-native";
import { getDestination } from "../services/destinationService";
import determineLocation from "../services/locationService";

function Navigation() {
  // Determine user's current location
  const location = determineLocation();

  // Determine desired destination
  let destination;
  getDestination()
    .then((destination) => {
      destination = destination;
    })
    .catch((error) => {
      console.error(error);
    });

  // Calculate distance and time to destination
  const distance = calculateDistance(location, destination);
  const time = calculateTime(location, destination);

  return (
    <View>
      <Button
        title="Change Destination"
        onPress={() => {
          getDestination()
            .then((destination) => {
              destination = destination;
            })
            .catch((error) => {
              console.error(error);
            });
        }}
      />
      <Text>Distance to destination: {distance}</Text>
      <Text>Estimated time: {time}</Text>
      <Text>Turn-by-turn directions:</Text>
      <Text>1. Head north for 100 meters</Text>
      <Text>2. Turn left and go up the stairs</Text>
      <Text>3. Turn right at the top of the stairs</Text>
      <Text>4. Continue straight until you reach your destination</Text>
    </View>
  );
}

export default Navigation;
