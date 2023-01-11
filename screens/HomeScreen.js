import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';

import {screenNames} from '../constants';
import recordData from '../services/recordDataService';

export default function HomeScreen({route, navigation}) {
  return (
    <View style={styles.container}>
      <Button icon="camera" mode="contained" onPress={recordData}>
        Record Data
      </Button>
      <View style={styles.buttonGap}></View>
      <Button
        icon="chevron-right"
        mode="contained"
        onPress={() => navigation.navigate(screenNames.NAVIGATION_HOME_SCREEN)}>
        Go to Navigation
      </Button>
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
    backgroundColor: 'tomato',
  },
  buttonGap: {
    marginTop: 20,
  },
});
