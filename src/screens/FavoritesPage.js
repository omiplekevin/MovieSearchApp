import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { useMovie } from '../provider/MovieProvider';
import MovieCard from '../components/MovieCardView';

import { styles } from '../styles/styles';

/**
 * This page lists the movies marked as favorite by the user.
 * These favorite items are persisted localy and available when offline.
 * @returns 
 */
export default function FavoritesPage() {
    const { favorites, setSelectedMovie } = useMovie();

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.pageHeader}>Favorites</Text>

            {favorites.length === 0 ? (
                <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                    <Text style={{ color: 'gray', fontSize: 36 }}>So lonely here... 🤷🏻‍♂️</Text>
                </View>
            ) : (
                <FlatList
                    data={favorites}
                    numColumns={2}
                    keyExtractor={(item) => item.imdbID}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.gridContainer}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.gridItem}
                            onPress={() => {
                                setSelectedMovie(item);
                                navigation.navigate('Movies', {
                                    screen: 'Details'
                                });
                            }}
                        >
                            <MovieCard movie={item} />
                        </TouchableOpacity>
                    )}
                />
            )}
        </SafeAreaView>
    );
}
