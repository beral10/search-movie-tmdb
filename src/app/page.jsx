'use client';

import FilterMovieByGenre from '@/components/FilterMovieByGenre';
import PaginationRounded from '@/components/Pagination';
import SearchMovieForm from '@/components/SearchMovieForm';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
	const [data, setData] = useState([]);
	const [movieList, setMovieList] = useState([]);
	const [movieSearch, setMovieSearch] = useState('');
	const [resetMovie, setResetMovie] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [filterGenre, setFilterGenre] = useState(null);

	const URL_IMAGE = 'https://image.tmdb.org/t/p/original';
	const type = movieSearch ? 'search' : 'discover';
	const filter = movieSearch ? `query=${movieSearch}` : filterGenre ? `with_genres=${filterGenre}`: 'sort_by=popularity.desc';
	const page = `page=${currentPage}`;
	let totalPages = data.total_pages;

	const params = useSearchParams();
	const searchUrl = params.get('search');
	console.log(params);
	console.log(searchUrl);

	const getMovies = () => {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzU4YzAyZTAwZGZkZThhZjI0MWFmMTAyODMxYjJkOSIsInN1YiI6IjY1NTAzM2QwMmI5MzIwMDlmYmNiYTYwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dAScOFyYK45j9nSDDx0NVE2qwncLJ2AGgg8sXA2BnDk',
			},
		};

		fetch(`https://api.themoviedb.org/3/${type}/movie?${filter}&include_adult=false&${page}&language=en-US`, options)
			.then((response) => response.json())
			.then((response) => {
				setData(response), setMovieList(response.results);
			})
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		getMovies();
	}, [movieSearch, currentPage, filterGenre]);

	const handleSearchMovies = (movie) => {
		setMovieSearch(movie);
		setCurrentPage(1);
		getMovies();
		setResetMovie(true);
	};

	console.log(data);
	console.log(movieList);

	return (
		<>
			<div
				className='max-w-screen-2xl h-auto m-auto pt-6 px-6 md:px-10'
				style={{ backgroundImage: `url("/bg_search/image_bg_cover_search.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center', height: 'auto', backgroundColor: 'rgba(33, 158, 188, 0.5' }}>
				<div className='flex flex-col gap-2 md:justify-center md:items-center'>
					<h1 className='text-4xl md:text-5xl font-bold'>Welcome!</h1>
					<h2 className='text-2xl md:text-3xl font-medium'>Here you can find and discover millions of movies.</h2>
					<h2 className='text-2xl md:text-3xl font-medium'>Explore now.</h2>
				</div>
				<SearchMovieForm movieData={handleSearchMovies} resetMovie={resetMovie} setResetMovie={setResetMovie} />
				<FilterMovieByGenre setMovieList={setMovieList} setFilterGenre={setFilterGenre} />
			</div>
			<div className='max-w-screen-2xl m-auto border-t-4 pt-4 mt-6 md:mt-10'>
				<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 w-full m-auto px-2 md:px-10 shadow-2xl shadow-zinc-600 pb-4 sm:pb-10'>
					{movieList.map((movie) => (
						<div key={movie.id} className='p-3 cursor-pointer flex flex-col justify-between items-center'>
							<Link href={`/details/${movie.id}`}>
								<Image src={`${URL_IMAGE + movie.poster_path}`} alt={movie.original_title} width={300} height={300} className='rounded-lg' />
								<h2 className='text-gray-900 font-semibold text-center'>{movie.original_title} </h2>
								<p className='text-gray-900 text-center'>{movie.release_date}</p>
							</Link>
						</div>
					))}
				</div>
				<PaginationRounded totalPages={totalPages} setCurrentPage={setCurrentPage} movieSearch={movieSearch} />
			</div>
		</>
	);
}
