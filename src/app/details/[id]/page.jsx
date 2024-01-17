'use client';

import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { clsx } from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMovies } from '@/context/movieContext';

const Details = ({ params }) => {
	const {moviesFavorites, setMoviesFavorites} = useMovies();
	const { id } = params;
	const { push } = useRouter();
	const searchParams = useSearchParams();
  const name = searchParams.get('name');

	const URL_IMAGE = 'https://image.tmdb.org/t/p/original';

	//Variables de estado
	const [movie, setMovie] = useState([]);
	const [trailer, setTrailer] = useState(null);
	const [playing, setPlaying] = useState(false);

	// console.log(movie);
	// console.log(trailer);

	const getMovie = () => {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzU4YzAyZTAwZGZkZThhZjI0MWFmMTAyODMxYjJkOSIsInN1YiI6IjY1NTAzM2QwMmI5MzIwMDlmYmNiYTYwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dAScOFyYK45j9nSDDx0NVE2qwncLJ2AGgg8sXA2BnDk',
			},
		};

		fetch(`https://api.themoviedb.org/3/movie/${id}?&append_to_response=videos&language=en-US`, options)
			.then((response) => response.json())
			.then((response) => {
				setMovie(response);
				if (response.videos && response.videos.results) {
					const trailer = response.videos.results.find((vid) => vid.name === 'Official Trailer');
					setTrailer(trailer ? trailer : response.videos.results[0]);
				}
			})
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		getMovie();
	}, []);

	const handleAddFavorite = (movieSelect) => {
		if(!name){
			const filtered = moviesFavorites.find(item => item.id === movieSelect.id);
			if(filtered){
				console.warn('Película ya exite');
			} else {
				setMoviesFavorites((prevMovie) => [...prevMovie, movieSelect]);
				//console.log('Película agregada con éxito.');
			}
		} else {
			const removeMovie = moviesFavorites.filter( (movie) => movie.id !== movieSelect.id);
			setMoviesFavorites(removeMovie);
			push('/favorites');
		}		
	};

	const handleNavigationReturn = () => {
		if(!name) {
			push('/');
		} else {
			push('/favorites');
		}
	};

	return (
		<div className={`text-black max-w-screen-2xl m-auto py-10`}>
			{movie ? (
				<div className={clsx(playing ? '' : `p-2 sm:p-5 md:p-10`)} style={{ backgroundImage: `url("${URL_IMAGE}${movie.backdrop_path}")`, backgroundSize: 'cover', backgroundPosition: 'center', height: '650px' }}>
					<div className='text-white flex flex-col items-center justify-between h-full w-full pt-10 lg:px-20 relative'>
						<h2 className='text-4xl font-bold mb-5 contour'>{movie.original_title}</h2>
						{playing ? (
							<div className='absolute left-0 top-0 right-0 bottom-0 backdrop-blur-lg flex flex-col justify-center items-center'>
								<ReactPlayer url={`https://www.youtube.com/watch?v=${trailer.key}`} width='100%' height='500px' playing={true} controls={true} />
								<button className='bg-red-600 hover:bg-red-500 px-6 py-1 rounded-md mt-5' onClick={() => setPlaying(false)}>
									Close
								</button>
							</div>
						) : null}
						<div>
							<div className='flex flex-col sm:flex-row justify-between gap-3 mb-3'>
								<div className='bg-black border hover:bg-gray-700 border-white max-w-[150px] text-center py-2 px-4 cursor-pointer' onClick={() => setPlaying(true)}>
									Play trailer
								</div>
								<div className='flex gap-5'>
									<button className={clsx(`py-2 px-4 rounded-md`, {'bg-[#01b4e4] hover:bg-[#3ec1e6]' : !name, 'bg-red-600 hover:bg-red-500': name})} onClick={() => handleAddFavorite(movie)}> {!name ? 'Add to favorites' : 'Remove'}</button>
									<button className='py-2 px-6 bg-[#90cea1] hover:bg-[#7cb18a] rounded-md' onClick={() => handleNavigationReturn()}>
										Return
									</button>
								</div>
							</div>
							<div className='flex flex-col gap-2 text-slate-200 contour'>
								<p className='text-justify'>{movie.overview}</p>
								<p className='flex gap-3'>
									<span>Genres: </span>
									{movie?.genres?.map((genre) => (
										<li className='list-none' key={genre.id}>
											{genre.name}
										</li>
									))}
								</p>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default Details;
