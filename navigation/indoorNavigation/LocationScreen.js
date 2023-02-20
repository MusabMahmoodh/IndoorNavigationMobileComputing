import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  accelerometer,
  gyroscope,
  magnetometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import {map, filter} from 'rxjs/operators';
import fromJSON from 'ngraph.fromjson';
import toJSON from 'ngraph.tojson';
import React, {useEffect, useMemo, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import {Circle, Image, Path} from 'react-native-svg';
import SvgPanZoom from 'react-native-svg-pan-zoom';

import floorplan from '../../assets/Floorplan.png';
import {
  useCompassHeading,
  useStepLength,
} from '../react-native-smartpdr/utils/customHooks';
import {range} from '../react-native-smartpdr/utils/sensors_utils';
import {Navigation} from '../stack';
import {graphJsonString} from '../utils/constants';
import {degreesToRadians, radiansToDegrees} from '../utils/mathUtils';
import {
  createGraphFromPathNodes,
  createNavigableNodes,
  createPathFinder,
} from '../utils/ngraphUtils';
import {describeArc} from '../utils/svgUtils';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height - 64;

const updateInterval = 50000;
const arcAngle = degreesToRadians(80 / 2); // The 'width' of the arc
const xOffset = 55;
const yOffset = 0;
const locationScale = 0.3;
const indicatorScale = 1.5;
const stepScale = 2;

/**
 *  How much the image must be rotated (in radians) to line make indicator line up with north on image
 * */
const imageNorthOffset = Math.PI + Math.PI / 16;

export default function LocationScreen({route, navigation}) {
  const theme = useTheme();

  const [accelerometerData, setAccelerometerData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [magnetometerData, setMagnetometerData] = useState({x: 0, y: 0, z: 0});
  const [gyroscopeData, setGyroscopeData] = useState({x: 0, y: 0, z: 0});

  const [location, setLocation] = useState({x: 0, y: 0});
  const headingCompas = useCompassHeading(magnetometerData, imageNorthOffset);
  const [stepLength, headingStep, heading] = useStepLength(
    accelerometerData,
    magnetometerData,
    gyroscopeData,
    stepScale,
    imageNorthOffset,
  );

  const [checkPoints, setCheckPoints] = useState();
  const [currentCheckpointIndex, setCurrentCheckpointIndex] = useState(0);

  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.accelerometer, updateInterval);
    setUpdateIntervalForType(SensorTypes.accelerometer, updateInterval);
    setUpdateIntervalForType(SensorTypes.accelerometer, updateInterval);

    const subscriptionAccelero = accelerometer.subscribe(({x, y, z}) => {
      console.log(`You moved your phone with ${x + y + z}`);
    });
    // .pipe(
    //   map(({x, y, z}) => x + y + z),
    //   filter(speed => speed > 20),
    // )
    // .subscribe({
    //   speed: console.log(`You moved your phone with ${x + y + z}`),
    //   error: () => {
    //     console.log('The sensor is not available');
    //   },
    // });
    // const subscriptionMagneto = magnetometer.subscribe(({y}) => {
    //   console.log('Magneto: ', y, '');
    // });
    // const subscriptionGyro = gyroscope.subscribe(({y}) => {
    //   console.log('Gyro: ', y, '');
    // });

    return () => {
      subscriptionAccelero.unsubscribe();
      subscriptionMagneto.unsubscribe();
      subscriptionGyro.unsubscribe();
    };
  }, [navigation]);

  useEffect(() => {
    const nx = stepLength ? stepLength * Math.sin(headingStep) * 10 : 0;
    const ny = stepLength ? stepLength * Math.cos(headingStep) * 10 : 0;
    setLocation(previous => ({x: previous.x + nx, y: previous.y - ny}));
  }, [stepLength]);

  function setLocationWithNode(node) {
    const startX = node.data.x * locationScale + xOffset;
    const startY = node.data.y * locationScale + yOffset;
    setLocation({x: startX, y: startY});
  }

  const graphJsonInput = useMemo(() => {
    const fullGraph = fromJSON(graphJsonString);
    const pathfinder = createPathFinder(fullGraph);

    if (route?.params?.startId && route?.params?.endId) {
      const startNode = fullGraph.getNode(route.params.startId);
      setLocationWithNode(startNode);

      const path = pathfinder.find(route.params.startId, route.params.endId);
      setCheckPoints(createNavigableNodes(path.reverse()));
      const pathGraph = createGraphFromPathNodes(path);
      const pathJsonStringGraph = toJSON(pathGraph);
      return JSON.parse(pathJsonStringGraph);
    } else {
      setLocation({x: windowWidth / 2, y: windowHeight / 2});
      return JSON.parse(graphJsonString);
    }
  }, [route]);

  const navVisualization = useMemo(() => {
    function createNavVisualization(graphJson) {
      function createNavVisualizationLine(key, startX, startY, endX, endY) {
        return (
          <Path
            key={key}
            stroke={theme.colors.placeholder}
            strokeWidth={4}
            strokeLinecap={'round'}
            opacity={0.9}
            d={`M ${startX * locationScale + xOffset},${
              startY * locationScale + yOffset
            } ${endX * locationScale + xOffset},${
              endY * locationScale + yOffset
            }`}
          />
        );
      }

      function findNodeData(nodeId) {
        // console.log(graphJson, nodeId);

        return graphJson?.nodes?.find(node => {
          console.log(node.id, nodeId);
          return node.id === nodeId;
        })?.data;
      }

      return graphJson.links.map((link, index) => {
        const fromNodeData = findNodeData(link.fromId);

        const toNodeData = findNodeData(link.toId);
        return createNavVisualizationLine(
          index,
          fromNodeData.x,
          fromNodeData.y,
          toNodeData.x,
          toNodeData.y,
        );
      });
    }

    return createNavVisualization(graphJsonInput);
  }, [graphJsonInput]);

  const arcPath = useMemo(() => {
    return describeArc(
      location.x,
      location.y,
      12 * indicatorScale,
      range(headingCompas - Math.PI / 2 - arcAngle, '2PI'),
      range(headingCompas - Math.PI / 2 + arcAngle, '2PI'),
    );
  }, [location, headingCompas]);

  function goToNextCheckpoint() {
    const currentCheckpoint = checkPoints[currentCheckpointIndex + 1];
    setLocationWithNode(currentCheckpoint);
    setCurrentCheckpointIndex(currentCheckpointIndex + 1);
  }

  function hasReachedFinalCheckpoint() {
    return currentCheckpointIndex === checkPoints.length - 1;
  }

  const checkpointComponent = useMemo(() => {
    if (checkPoints) {
      function renderCheckpoints() {
        if (hasReachedFinalCheckpoint()) {
          return <Text style={s.checkPointText}>Doel bereikt</Text>;
        } else {
          const currentCheckpoint = checkPoints[currentCheckpointIndex];
          const nextCheckpoint = checkPoints[currentCheckpointIndex + 1];
          return (
            <Text style={{alignContent: 'center'}}>
              <Text style={s.checkPointText}>{currentCheckpoint.id} </Text>
              <AntDesign name="arrowright" size={20} color="black" />
              <Text style={s.checkPointText}> {nextCheckpoint.id}</Text>
            </Text>
          );
        }
      }

      return (
        <View style={[s.bottomTab, s.topShadow]}>
          {renderCheckpoints()}
          <Button
            style={s.bottomBtn}
            disabled={hasReachedFinalCheckpoint()}
            onPress={goToNextCheckpoint}
            mode={'outlined'}>
            Next point
          </Button>
        </View>
      );
    }
  }, [currentCheckpointIndex, checkPoints]);

  const board = [];
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      board.push([i, j]);
    }
  }

  return (
    <View>
      {
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            width: '100%',
            marginLeft: 10,
            marginTop: 10,
            backgroundColor: 'tomato',
            padding: 10,
            borderRadius: 10,
          }}>
          <Text>
            Location| x:{location.x.toFixed(3)}, y:{location.y.toFixed(3)}
          </Text>
          <Text>
            HeadingCompass| {radiansToDegrees(headingCompas).toFixed(2)}°
          </Text>
          <Text>HeadingStep| {radiansToDegrees(headingStep ?? 0)}</Text>
        </View>
      }

      <View
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          backgroundColor: 'red',
        }}>
        <SvgPanZoom
          canvasWidth={500}
          canvasHeight={1000}
          minScale={0.75}
          maxScale={2}
          canvasStyle={{backgroundColor: 'yellow'}}
          viewStyle={{backgroundColor: 'green'}}
          initialZoom={1}>
          {/* Map */}
          <View
            width={'100%'}
            height={'100%'}
            backgroundColor={'white'}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              zIndex: 9999,
            }}>
            <Text style={{color: 'white'}}>Map</Text>
          </View>
          <Image
            href={floorplan}
            width={'100%'}
            height={'100%'}
            opacity={0.99}
          />
          {navVisualization}

          {graphJsonInput &&
            graphJsonInput.nodes.map((item, index) => {
              return (
                <Circle
                  key={index}
                  cx={(item.data.x + 1) * 50}
                  cy={(item.data.y + 1) * 50}
                  r={4}
                  strokeWidth={1}
                  fill={'black'}
                  opacity={0.25}
                />
              );
            })}

          <Circle
            cx={location.x}
            cy={location.y}
            r={12 * indicatorScale}
            strokeWidth={indicatorScale}
            fill={theme.colors.primary}
            opacity={0.25}
          />
          <Circle
            cx={1}
            cy={2}
            r={4 * indicatorScale}
            stroke={theme.colors.accent}
            strokeWidth={indicatorScale}
            fill={theme.colors.primary}
            opacity={0.45}
          />
          <Path
            stroke={theme.colors.accent}
            strokeWidth={2 * indicatorScale}
            d={arcPath}
            opacity={0.7}
          />
        </SvgPanZoom>

        {checkpointComponent}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  bottomBtn: {
    marginTop: 10,
  },
  topShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 25.0,
    elevation: 24,
  },
  bottomTab: {
    alignItems: 'center',
    paddingVertical: 7,
    zIndex: 1,
    bottom: 0,
    backgroundColor: 'white',
  },
  checkPointText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'tomato',
  },
});
