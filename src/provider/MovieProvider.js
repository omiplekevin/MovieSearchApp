import React, {createContext, useContext, useState} from 'react'

const MovieContext = createContext();

export const MovieProvider = ({children}) => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    return (
        <MovieContext.Provider value={{movies, setMovies, selectedMovie, setSelectedMovie}}>
            {children}
        </MovieContext.Provider>
    );
};

export const useMovie = () => useContext(MovieContext);