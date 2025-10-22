import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { getMovieDetails } from '../api/MovieAPI';
import { useMovie } from '../provider/MovieProvider';

import { styles } from '../styles/styles';

/**
 * Displays the details of a movie selected by the user.
 * This page queries for the movie details via OMDb API.
 * @returns 
 */
export default function MovieDetailsPage() {

    const navigation = useNavigation();

    const { selectedMovie, favorites, toggleFavorite } = useMovie();
    const [movieDetails, setMovieDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const isFavorite = favorites.some((fav) => fav.imdbID === selectedMovie.imdbID);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            setIsLoading(true);
            const data = await getMovieDetails(selectedMovie?.imdbID);
            if (data.Response === 'True') {
                console.log(data)
                setMovieDetails(data);
                setError(null);
            } else {
                setMovieDetails([]);
                setError(data.Error);
            }
            setIsLoading(false);
        }
        fetchMovieDetails();
    }, [selectedMovie?.imdbID]);

    useLayoutEffect(() => {
        if (selectedMovie) {
            navigation.setOptions({ title: selectedMovie?.Title })
        }
    })

    function convertToReadableTime(runtimeStr) {
        if (!runtimeStr) return '--:--';

        // Extract the number of minutes (e.g. "134 min" → 134)
        const minutes = parseInt(runtimeStr, 10);
        if (isNaN(minutes)) return '--:--';

        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        // Format with leading zero for minutes
        return `${hours}h:${mins.toString().padStart(2, '0')}m`;
    }

    return (
        <View style={{ flex: 1 }}>
            {!isLoading ? (
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View>
                        <Image
                            source={{ uri: movieDetails.Poster }}
                            style={styles.posterHeader} />

                        <TouchableOpacity
                            style={{ position: 'absolute', top: 64, left: 32 }}
                            onPress={() => navigation.goBack()}
                        >
                            <Icon
                                name={'chevron-back-outline'}
                                size={32}
                                color={'white'}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.heartContainer, { top: 64, right: 32 }]}
                            onPress={() => toggleFavorite(selectedMovie)}
                        >
                            <Icon
                                name={isFavorite ? 'heart' : 'heart-outline'}
                                size={32}
                                color={isFavorite ? 'red' : 'white'}
                            />
                        </TouchableOpacity>

                        <LinearGradient
                            colors={['rgba(0,0,0,1)', 'transparent']}
                            start={{ x: 0.5, y: 0.8 }}
                            end={{ x: 0.5, y: 0 }}
                            style={styles.gradient}
                        >
                            <Text
                                numberOfLines={1}
                                ellipsizeMode='tail'
                                style={[styles.detailTitle, styles.h2, { color: '#fefefe' }]}>{movieDetails.Title}</Text>
                            <Text style={[styles.detailTextNormal, styles.h4, { color: '#fefefe' }]}>{movieDetails.Year}</Text>
                        </LinearGradient>

                    </View>
                    <View style={[styles.detailContainer, { gap: 32 }]}>

                        <View style={[styles.detailRow, { alignItems: 'center' }]}>
                            <Text style={[styles.detailTextNormal, styles.h5, styles.roundedBackground, { color: '#fefefe' }]}>{movieDetails.Rated}</Text>
                            <Text style={[styles.detailTextNormal, styles.h5]}>{convertToReadableTime(movieDetails.Runtime)}</Text>
                            <View style={{ width: 50 }} />
                        </View>

                        <Text style={[styles.detailTextNormal, styles.h4]}>
                            {movieDetails.Plot}
                        </Text>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.center, styles.h5]}>IMDB</Text>
                                <Text style={[styles.center, styles.detailTextSemiHeavy, styles.h2]}>{movieDetails?.Ratings?.[0]?.Value || '--'}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.center, styles.h5]}>Rotten Tomatoes</Text>
                                <Text style={[styles.center, styles.detailTextSemiHeavy, styles.h2]}>{movieDetails?.Ratings?.[1]?.Value || '--'}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.center, styles.h5]}>Metacritic</Text>
                                <Text style={[styles.center, styles.detailTextSemiHeavy, styles.h2]}>{movieDetails?.Ratings?.[2]?.Value || '--'}</Text>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.detailTextLight}>Cast: {movieDetails.Actors}</Text>
                            <Text style={styles.detailTextLight}>Director: {movieDetails.Director}</Text>
                            <Text style={styles.detailTextLight}>Genre: {movieDetails.Genre}</Text>
                        </View>

                    </View>
                </ScrollView>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#000" style={{ margin: 16 }} />
                </View>
            )
            }
        </View>
    );
}