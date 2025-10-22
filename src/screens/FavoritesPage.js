import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { useMovie } from '../provider/MovieProvider';
import MovieCard from '../components/MovieCardView';

import { styles } from '../styles/styles';

export default function FavoritesPage() {
    const { favorites, setSelectedMovie } = useMovie();
    const navigation = useNavigation();

    if (favorites.length === 0) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: 'gray', fontSize: 36 }}>So lonely here... 🤷🏻‍♂️</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
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
                            navigation.navigate('Details');
                        }}
                    >
                        <MovieCard movie={item} />
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}
