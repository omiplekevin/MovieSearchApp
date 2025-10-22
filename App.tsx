import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MovieProvider } from './src/provider/MovieProvider';

import BaseNavigation from './src/navigation/BaseNavigation';
import MovieListPage from './src/screens/MovieListPage';
import MovieDetailsPage from './src/screens/MovieDetailsPage';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <MovieProvider>
      <NavigationContainer>
        <BaseNavigation />
      </NavigationContainer>
    </MovieProvider>
  );
}