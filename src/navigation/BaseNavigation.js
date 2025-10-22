import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import MovieListPage from '../screens/MovieListPage';
import FavoritesPage from '../screens/FavoritesPage';
import MovieDetailsPage from '../screens/MovieDetailsPage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack for Movies (so it can navigate to Details)
function MovieStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MoviesHome"
                component={MovieListPage}
                options={{ title: 'Movies' }}
            />
            <Stack.Screen
                name="Details"
                component={MovieDetailsPage}
                options={{ title: 'Movie Details' }}
            />
        </Stack.Navigator>
    );
}

export default function BaseNavigation() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false, // hide stack headers in tabs
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Movies') {
                        iconName = focused ? 'film' : 'film-outline';
                    } else if (route.name === 'Favorites') {
                        iconName = focused ? 'heart' : 'heart-outline';
                    }

                    return <Icon
                        name={iconName}
                        size={24}
                        color={color} />
                },
                tabBarActiveTintColor: '#e50914',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Movies" component={MovieStack} />
            <Tab.Screen name="Favorites" component={FavoritesPage} />
        </Tab.Navigator>
    );
}
