import {View, Text} from 'react-native';
import React from 'react';

import {Button, DataTable} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import DataCollector from './components/DataCollector';

export default function DataCollectionScreen({route, navigation}) {
  const [dataCollected, setDataCollected] = React.useState([]);
  const [isStarted, setIsStarted] = React.useState(false);
  const startRecordings = () => {
    setIsStarted(pre => true);
  };

  const stopRecording = () => {
    console.log('Stopping recording');
    setIsStarted(pre => false);
  };

  return (
    <View>
      <View>
        <Text>Navigation</Text>
      </View>
      <View
        style={{
          display: 'flex',

          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        {/* <ScrollView horizontal> */}
        <Text>
          Number of Data collected: {JSON.stringify(dataCollected.length)}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
          }}>
          {!isStarted ? (
            <>
              <Button icon="camera" mode="contained" onPress={startRecordings}>
                Start
              </Button>
              {dataCollected.length > 0 && (
                <Button
                  icon="content-save"
                  mode="outlined"
                  style={{
                    borderColor: 'tomato',
                    marginLeft: 10,
                  }}
                  onPress={startRecordings}>
                  Save
                </Button>
              )}
            </>
          ) : (
            <Button
              icon="chevron-right"
              mode="contained"
              onPress={stopRecording}>
              Stop
            </Button>
          )}
        </View>
        {isStarted ? <Text>Reading...</Text> : <Text>Waiting to start...</Text>}
        {isStarted ? (
          <DataCollector setDataCollected={setDataCollected} />
        ) : null}
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Point</DataTable.Title>
            <DataTable.Title numeric>Lat</DataTable.Title>
            <DataTable.Title numeric>Long</DataTable.Title>
            <DataTable.Title numeric>WiFi strngth</DataTable.Title>
          </DataTable.Header>
          {dataCollected?.reverse().map((reading, idx) => (
            <DataTable.Row key={idx}>
              <DataTable.Cell>{idx}</DataTable.Cell>
              <DataTable.Cell numeric>{reading?.loc?.latitude}</DataTable.Cell>
              <DataTable.Cell numeric>{reading?.loc?.longitude}</DataTable.Cell>
              <DataTable.Cell numeric>
                {JSON.stringify(reading?.signalStrengths)}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
        {/* </ScrollView> */}

        {/* {data.map((reading, idx) => (
          <Text >{reading}</Text>
        ))} */}
      </View>
    </View>
  );
}
