import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import {StackNavigator} from './stack';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            primary: 'tomato',
            secondary: 'yellow',
          },
        }}>
        <StackNavigator />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
