import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {StackNavigator} from './navigation/stack';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            primary: '#397AF9',
            accent: '#873df2',
          },
        }}>
        <StackNavigator />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
