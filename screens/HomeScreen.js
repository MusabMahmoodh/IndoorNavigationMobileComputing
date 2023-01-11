import React from 'react';
import {Button, StyleSheet, View} from 'react-native';

import {screenNames} from '../constants';
import recordData from '../services/recordDataService';

export default function HomeScreen({route, navigation}) {
  return (
    <View style={styles.container}>
      <Button style={styles.button} title="Record Data" onPress={recordData} />
      <View style={styles.buttonGap}></View>
      <Button
        style={styles.button}
        title="Start Navigation"
        onPress={() => navigation.navigate(screenNames.NAVIGATION_HOME_SCREEN)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 50,
  },
  buttonGap: {
    marginTop: 20,
  },
});
