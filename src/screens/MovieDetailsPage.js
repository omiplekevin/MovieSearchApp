import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getMovieDetails } from '../api/MovieAPI';
import { useMovie } from '../provider/MovieProvider';

import { styles } from '../styles/styles';

export default function MovieDetailsPage() {

    const { selectedMovie } = useMovie();
    const navigation = useNavigation();

    const [movieDetails, setMovieDetails] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
            const fetchMovieDetails = async () => {
                const data = await getMovieDetails(selectedMovie?.imdbID);
                if (data.Response === 'True') {
                    console.log(data)
                    setMovieDetails(data);
                    setError(null);
                } else {
                    setMovieDetails([]);
                    setError(data.Error);
                }
            }
            fetchMovieDetails();
        }, [selectedMovie?.imdbID]);

        useLayoutEffect(() => {
            if (selectedMovie) {
                navigation.setOptions({title: selectedMovie?.Title})
            }
        })

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{selectedMovie?.Title}</Text>
            <Text>Year: {selectedMovie?.Year}</Text>
            <Text>Type: {selectedMovie?.Type}</Text>
            <Text>IMDB ID: {selectedMovie?.imdbID}</Text>
            <Text>Details: {movieDetails.Plot}</Text>
        </View>
    );
}