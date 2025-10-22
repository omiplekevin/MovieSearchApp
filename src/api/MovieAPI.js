import axios from 'axios';
import { OMDB_API_KEY } from '@env'; // Import from .env

const BASE_URL = 'https://www.omdbapi.com/';

const omdbApi = axios.create({
    baseURL: BASE_URL,
    params: {
        apikey: OMDB_API_KEY,
    },
});
export const searchMovies = async (title, currentPage = 1) => {
    try {
        const response = await omdbApi.get('/', {
            params: {
                s: title,
                page: currentPage,
                type: 'movie',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
}

export const getMovieDetails = async (movieId) => {
    try {
        const detailResponse = await omdbApi.get('/', {
            params: {
                i: movieId,
                plot: 'full'
            }
        });
        return detailResponse.data;
    } catch (error) {
        console.error('Error getting movie detail', error);
        throw error;
    }
}