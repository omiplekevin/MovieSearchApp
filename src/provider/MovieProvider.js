import React, { createContext, useContext, useState, useEffect } from 'react'
import { loadFavorites, saveToFavorites } from '../storage/favorites'

const MovieContext = createContext();

/**
 * Context provider component. This component shares global select states.
 * @param {any} param0
 * @returns 
 */
export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [favorites, setFavorites] = useState([])

    // on app load, setup saved favorites
    useEffect(() => {
        (async () => {
            const storedFavorites = await loadFavorites();
            setFavorites(storedFavorites);
        })();
    }, []);

    //update favorites every change
    useEffect(() => {
        saveToFavorites(favorites);
    }, [favorites]);

    // Toggle favorite logic
    const toggleFavorite = (movie) => {
        setFavorites((prev) => {
            const exists = prev.find((m) => m.imdbID === movie.imdbID);
            if (exists) {
                return prev.filter((m) => m.imdbID !== movie.imdbID);
            } else {
                return [...prev, movie];
            }
        });
    };

    return (
        <MovieContext.Provider value={{
            movies, setMovies,
            selectedMovie, setSelectedMovie,
            favorites, toggleFavorite
        }}>
            {children}
        </MovieContext.Provider>
    );
};

export const useMovie = () => useContext(MovieContext);