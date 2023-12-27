'use client';

import { createContext, useContext, useState } from 'react';

//esta función retorna un objeto.
export const MovieContext = createContext();

//Para evitar el useContext en c/página a mostrar se crea un useHoooks único para que se ejecute.
export const useMovies = () => {
	return useContext(MovieContext);
};

//Este provider devuelve una especie de comp que contendrá a otros.
export const MovieProvider = ({ children }) => {
	const [moviesFavorites, setMoviesFavorites] = useState([]);
	console.log(moviesFavorites);

	return <MovieContext.Provider value={{ moviesFavorites, setMoviesFavorites }}>{children}</MovieContext.Provider>;
};
