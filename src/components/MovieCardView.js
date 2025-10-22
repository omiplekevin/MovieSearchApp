import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import { useMovie } from '../provider/MovieProvider';
import { styles } from '../styles/styles';


export default function MovieCardView({ movie }) {

    const { favorites, toggleFavorite } = useMovie();
    const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

    return (
        <View>
            <Image
                source={{ uri: movie.Poster }}
                style={styles.poster}
                resizeMode="cover" />

            <TouchableOpacity
                style={styles.heartContainer}
                onPress={() => toggleFavorite(movie)}
            >
                <Icon
                    name={isFavorite ? 'heart' : 'heart-outline'}
                    size={24}
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
                    style={styles.card_title}>{movie.Title}</Text>
            </LinearGradient>
        </View>
    );
}