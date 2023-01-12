import {View, Text} from 'react-native';
import React, {useEffect, useRef} from 'react';
import recordData from './recordDataService';
import {Button, DataTable} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {reverse} from '@tensorflow/tfjs';

export default function DataCollectionScreen({route, navigation}) {
  const recorderRef = useRef(null);

  const [dataCollected, setDataCollected] = React.useState([]);
  const [isStarted, setIsStarted] = React.useState(false);
  const saveRecordings = () => {
    console.log('Started recording readings');
    setIsStarted(pre => true);
  };

  const stopRecording = () => {
    console.log('Stopped recording readings');
    setIsStarted(pre => false);
  };
  useEffect(() => {
    //effect
    console.log('Started recording readings');
    recorderRef.current = setInterval(async () => {
      const recordedData = await recordData();
      console.log('Recorded data', recordedData);
      let readings = [...dataCollected, recordedData];
      setDataCollected(pre => [...pre, recordedData]);

      console.log('Data', readings);
    }, 20000);
    return () => {
      clearInterval(recorderRef.current);
    };
  }, []);
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
            <Button icon="camera" mode="contained" onPress={saveRecordings}>
              Save
            </Button>
          ) : (
            <Button
              icon="chevron-right"
              mode="contained"
              onPress={stopRecording}>
              Stop
            </Button>
          )}
        </View>
        {isStarted ? <Text>Reading...</Text> : <Text>.</Text>}
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
