import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import PlaceDetails from './screens/PlaceDetails';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors'
import Map from './screens/Map';
import { useEffect, useState } from 'react';
import { init } from './util/database';

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialize, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      }).catch(err => {
      });
  }, []);

  if (!dbInitialize) {
    return <AppLoading />
  }

  return (<>
    <StatusBar style="auto" />
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: Colors.gray700,
        contentStyle: { backgroundColor: Colors.gray700 }
      }}>
        <Stack.Screen name="AllPlaces"
          component={AllPlaces}
          options={({ navigation }) => ({
            headerRight: ({ tintColor }) => <IconButton icon="add" size={24} color={tintColor} onPress={() => navigation.navigate('AddPlace')} />
          })
          } />
        <Stack.Screen name="AddPlace" component={AddPlace} options={{ title: 'Add a new Place' }} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="PlaceDetails" component={PlaceDetails} options={{ title: 'Loading Place...' }} />
      </Stack.Navigator>
    </NavigationContainer>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
