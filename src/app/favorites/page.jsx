'use client';

import { useMovies } from '@/context/movieContext'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

const Favorites = () => {

  const {moviesFavorites, setMoviesFavorites} = useMovies();
  const {push} = useRouter();
  console.log(moviesFavorites);

  const URL_IMAGE = 'https://image.tmdb.org/t/p/original';

  const handleMovieRemove = (id) => {
    const deleteMovie = moviesFavorites.filter((movie) => movie.id !== id);
		setMoviesFavorites(deleteMovie);
  };

  return (
    <div className='text-black max-w-screen-2xl m-auto pt-6 md:pt-14 px-3 sm:px-6 md:p-10 shadow-2xl shadow-zinc-600'>
      {
        moviesFavorites.length === 0 ? (
          <div className='flex justify-center items-center'>
            <h2 className='lg:text-2xl font-semibold contour-title-favorites'>No movies added yet</h2>
          </div>
        ) : (
          <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5`}>
            {
              moviesFavorites.map( movie => (
                <div key={movie.id} className={`max-w-sm bg-[#90cea1] gap-2 flex flex-col justify-between items-center px-2 py-4`}>
                  <Image className='rounded-md shadow-xl shadow-cyan-100' src={`${URL_IMAGE}${movie.poster_path}`} alt={movie.original_title} width={200} height={300} />
                  <h3 className='font-semibold text-[#0d253f] text-center text-base'>{movie.title}</h3>
                  <p>Release date: {movie.release_date}</p>
                  <div className='w-full flex gap-2 justify-between'>
                    <button className='w-1/2 text-white py-1 rounded-md font-semibold bg-[#01b4e4] hover:bg-[#3ec1e6]' onClick={() => push(`/favorites/view/${movie.id}?name=${movie.original_title}`)}>Details</button>
                    <button className='w-1/2 text-white py-1 rounded-md font-semibold bg-red-600 hover:bg-red-500' onClick={() => handleMovieRemove(movie.id)}>Remove</button>
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default Favorites