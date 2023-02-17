import {View, Text} from 'react-native';
import React from 'react';

import {
  ActivityIndicator,
  Button,
  DataTable,
  TextInput,
} from 'react-native-paper';

import DataCollector from './components/DataCollector';
import {saveDataToDatabase} from './recordDataService';

export default function DataCollectionScreen({route, navigation}) {
  const [dataCollected, setDataCollected] = React.useState([]);
  const [grid, setGrid] = React.useState(null);
  const [isStarted, setIsStarted] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const startRecordings = () => {
    setIsStarted(pre => true);
  };

  const stopRecording = () => {
    console.log('Stopping recording');
    setIsStarted(pre => false);
  };
  const saveRecordings = async () => {
    console.log('Saving recording');
    setIsSaving(pre => true);
    await saveDataToDatabase(grid, dataCollected);
    setIsSaving(pre => false);
    setDataCollected(pre => []);

    console.log('Recordings saved');
  };

  return (
    <View>
      <View>
        <Text>Navigation</Text>
      </View>
      <View>
        <TextInput
          mode="outlined"
          label="Grid number"
          placeholder="Add grid number"
          value={grid}
          onChangeText={text => setGrid(text)}
          right={<TextInput.Icon icon="eye" />}
        />
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
              {dataCollected.length > 0 && grid !== null && (
                <Button
                  icon="content-save"
                  mode="outlined"
                  style={{
                    borderColor: 'tomato',
                    marginLeft: 10,
                  }}
                  onPress={saveRecordings}>
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
        {isStarted ? (
          <Text>Reading...</Text>
        ) : isSaving ? (
          <Text>Saving...</Text>
        ) : (
          <Text>Waiting to start...</Text>
        )}
        {isSaving && (
          <View>
            <ActivityIndicator size="small" color="green" />
          </View>
        )}
        {isStarted ? (
          <DataCollector setDataCollected={setDataCollected} />
        ) : null}
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>
              <Text style={{color: '#fff'}}>Point</Text>
            </DataTable.Title>
            <DataTable.Title numeric>
              <Text style={{color: '#fff'}}>WiFi</Text>
            </DataTable.Title>
            <DataTable.Title numeric>
              <Text style={{color: '#fff'}}>Lat</Text>
            </DataTable.Title>
            <DataTable.Title numeric>
              <Text style={{color: '#fff'}}>Long</Text>
            </DataTable.Title>
          </DataTable.Header>
          {dataCollected?.reverse().map((reading, idx) => (
            <DataTable.Row key={idx}>
              <DataTable.Cell>
                <Text style={{color: '#fff'}}>{idx}</Text>
              </DataTable.Cell>

              <DataTable.Cell numeric>
                <Text style={{color: '#fff'}}>
                  {' '}
                  {JSON.stringify(reading?.signalStrengths)}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={{color: '#fff'}}>{reading?.loc?.latitude}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={{color: '#fff'}}>{reading?.loc?.longitude}</Text>
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
