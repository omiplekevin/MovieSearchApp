import React, { useCallback, useEffect, useState } from 'react';
import { Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { searchMovies } from '../api/MovieAPI';
import { useMovie } from '../provider/MovieProvider';

import MovieCardView from '../components/MovieCardView';

import { styles } from '../styles/styles';

/**
 * This page is show to the user upon app load. 
 * This screen lets the user search for movies and interact with the results.
 * This page queries for the movie details via OMDb API
 * @returns 
*/
export default function MovieListPage() {
    //GLOBAL STATE
    const { movies, setMovies, setSelectedMovie } = useMovie();

    //LOCAL STATE
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasMorePage, setHasMorePage] = useState(true);
    const [page, setPage] = useState(1);

    const navigation = useNavigation();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 500);

        return () => clearTimeout(handler);
    },
        [searchQuery]
    );

    const getPaginatedMovieList = useCallback(
        async (targetPage) => {
            if (loading || !debouncedQuery.trim()) return;

            setLoading(true);
            console.log(`Fetching page ${targetPage} for query "${debouncedQuery}"`);

            const response = await searchMovies(debouncedQuery, targetPage);
            console.log('API response:', response);

            if (response.Response === 'True') {
                setError(null);
                setMovies((oldList) =>
                    targetPage > 1 ? [...oldList, ...response.Search] : response.Search
                );

                const totalPages = Math.ceil(response.totalResults / 10);
                setHasMorePage(targetPage < totalPages);
            } else {
                if (targetPage === 1) setMovies([]);
                setHasMorePage(false);
                setError(response.Error);
            }

            setLoading(false);
        },
        [debouncedQuery]
    );

    const loadMorePage = () => {
        if (!loading && hasMorePage) {
            const nextPage = page + 1;
            setPage(nextPage);
            getPaginatedMovieList(nextPage);
        }
    };

    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setMovies([]);
            return;
        }
        setPage(1);
        getPaginatedMovieList(1);
    },
        [debouncedQuery, getPaginatedMovieList]
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.pageHeader}>Movies</Text>
            <TextInput
                style={styles.input}
                placeholder="Search OMDb..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            {!searchQuery ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>What interests you now?</Text>
                </View>
            ) : (
                <FlatList
                    data={movies}
                    keyExtractor={(item) => item.imdbID}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.gridContainer}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.gridItem}
                            onPress={() => {
                                setSelectedMovie(item)
                                navigation.navigate('Details');
                            }}>
                            <MovieCardView movie={item} />
                        </TouchableOpacity>
                    )}
                    onEndReached={loadMorePage}
                    onEndReachedThreshold={0.6} // trigger when 20% close to bottom
                    ListFooterComponent={
                        loading ? (
                            <ActivityIndicator size="large" color="#000" style={{ margin: 16 }} />
                        ) : null
                    }
                />
            )}
        </SafeAreaView>
    );
}