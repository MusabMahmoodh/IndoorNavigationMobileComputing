import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Appbar, useTheme} from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';
import {FeedScreen} from './feed';
import {LocationScreen} from './indoorNavigation/locationScreen';
import {LocationSelectScreen} from './indoorNavigation/locationSelectScreen';

function Header({scene, previous, navigation}) {
  const theme = useTheme();

  return (
    <Appbar.Header theme={{colors: {primary: theme.colors.surface}}}>
      {previous ? (
        <Appbar.BackAction
          onPress={navigation.goBack}
          color={theme.colors.primary}
        />
      ) : null}
      <Appbar.Content title={'IN: Indoor navigatie POC'} />
    </Appbar.Header>
  );
}

export function StackNavigator() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        // headerMode="screen"
        // screenOptions={{
        //   header: ({scene, previous, navigation}) => (
        //     <Header scene={scene} previous={previous} navigation={navigation} />
        //   ),
        // }}
      >
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LocationScreen" component={LocationScreen} />
        <Stack.Screen
          name="LocationSelectScreen"
          component={LocationSelectScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const StackScreen = {
  Feed: {
    component: FeedScreen,
    options: {headerTitle: 'Feed'},
  },
  Home: {
    component: HomeScreen,
    options: {headerTitle: 'HomeScreen'},
  },
  Location: {
    component: LocationScreen,
    options: {headerTitle: 'Location estimate'},
  },
  LocationSelect: {
    component: LocationSelectScreen,
    options: {headerTitle: 'Location select'},
  },
};
