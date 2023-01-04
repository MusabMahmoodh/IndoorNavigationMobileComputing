export function getDestination() {
  return new Promise((resolve, reject) => {
    // Show a prompt to get the destination from the user
    Alert.prompt(
      "Enter Destination",
      "Enter the name or address of the destination:",
      [
        {
          text: "Cancel",
          onPress: () => reject("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: (destination) => {
            // Set the destination and resolve the Promise
            const dest = {
              latitude: 37.484847,
              longitude: -122.148386,
            };
            resolve(dest);
          },
        },
      ],
      "plain-text",
      ""
    );
  });
}

// Call the getDestination function and set
