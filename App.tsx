import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MovieProvider } from './src/provider/MovieProvider'

import MovieListPage from './src/screens/MovieListPage';
import MovieDetailsPage from './src/screens/MovieDetailsPage';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <MovieProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: true,
          }}>
          <Stack.Screen
            name="Home"
            component={MovieListPage}
            options={{ title: 'Movie Search' }}
          />
          <Stack.Screen
            name="Details"
            component={MovieDetailsPage}
            options={{ title: 'Movie Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MovieProvider>
  );
}