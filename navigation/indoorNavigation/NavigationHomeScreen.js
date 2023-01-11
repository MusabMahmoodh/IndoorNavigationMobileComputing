import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {List, Surface, useTheme} from 'react-native-paper';

export default function NavigationHomeScreen({route, navigation}) {
  const theme = useTheme();
  const ListItem = {
    Location: {
      title: 'Location estimation',
      icon: 'map-marker-radius-outline',
    },
    LocationSelect: {
      title: 'Find a path',
      icon: 'walk',
    },
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <List.Section style={styles.list}>
          <List.Subheader>Choose a mode</List.Subheader>
          {Object.entries(ListItem).map(([rootName, params], idx) => (
            <Surface key={idx} style={{marginBottom: 8, elevation: 2}}>
              <List.Item
                title={params.title}
                left={() => <List.Icon icon={params.icon} />}
                right={() => (
                  <List.Icon
                    icon="chevron-right"
                    color={theme.colors.primary}
                  />
                )}
                onPress={() => {
                  navigation.navigate(rootName);
                }}
              />
            </Surface>
          ))}
        </List.Section>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  list: {
    padding: 8,
    width: Dimensions.get('window').width,
  },
});
