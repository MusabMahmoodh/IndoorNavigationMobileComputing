import React from "react";
import { Button, StyleSheet, View } from "react-native";
import recordData from "../services/recordDataService";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button style={styles.button} title="Record Data" onPress={recordData} />
      <View style={styles.buttonGap}></View>
      <Button style={styles.button} title="Start Navigation" onPress={() => navigation.navigate("Navigation")} />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 50,
  },
  buttonGap: {
    marginTop: 20,
  },
});
