'use client' 

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
	
  const [movieList, setMovieList] = useState([]);
  const [movieSearch, setMovieSearch] = useState('');

  const URL_IMAGE = 'https://image.tmdb.org/t/p/original';
  const type = movieSearch ? 'search' : 'discover';
  const filter = movieSearch ? `query=${movieSearch}` : 'sort_by=popularity.desc';

  const params = useSearchParams()
  const searchUrl = params.get('search');
  console.log(params);
  console.log(searchUrl);

  const getMovies = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzU4YzAyZTAwZGZkZThhZjI0MWFmMTAyODMxYjJkOSIsInN1YiI6IjY1NTAzM2QwMmI5MzIwMDlmYmNiYTYwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dAScOFyYK45j9nSDDx0NVE2qwncLJ2AGgg8sXA2BnDk'
      }
    };
    
    fetch(`https://api.themoviedb.org/3/${type}/movie?${filter}`, options)
      .then(response => response.json())
      .then(response => setMovieList(response.results))
      .catch(err => console.error(err));
  }

  useEffect( () => {
    getMovies();
  }, []);

  const handleSearchMovies = () => {
    getMovies()
  };
  
  console.log(movieList);

	return (
    <>
      <div className="max-w-screen-2xl m-auto px-6 md:px-10">
        <form className="flex flex-col sm:flex-row justify-center items-end gap-2 lg:gap-6 py-10 w-full">
          <div className="flex flex-col gap-1 text-black w-full sm:w-1/2">
            <label htmlFor='title' className="font-semibold hidden sm:flex">
              Search movie title:
            </label>
            <input 
              className="py-2 px-3 outline-none rounded-md border-2 border-solid shadow-[#0d253f] shadow-md"
              type='text' 
              id='title'  
              placeholder='Movie name' 
              onChange={(e) => setMovieSearch(e.target.value)}
              value={movieSearch} 
            />
          </div>
          <button 
            className="bg-[#01b4e4] hover:bg-[#078fb4] rounded-md px-4 py-2 font-semibold w-full sm:w-48"
            type='button' 
            onClick={handleSearchMovies}
          >
            Search
          </button>
        </form>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 max-w-screen-2xl m-auto px-2 md:px-10 shadow-2xl shadow-zinc-600 pb-4 sm:pb-10">
        {
          movieList.map( (movie) => (            
            <div key={movie.id} className="p-3 cursor-pointer flex flex-col justify-between items-center">
              <Link href={`/details/${movie.id}`}>
                <Image src={`${URL_IMAGE + movie.poster_path}`} alt={movie.original_title} width={300} height={300} />
                <h2 className="text-gray-900 font-semibold text-center">{movie.original_title} </h2>
                <p className='text-gray-900 text-center'>{movie.release_date}</p>
              </Link>
            </div>
          ))
        }
      </div>
    </>
  )
}
