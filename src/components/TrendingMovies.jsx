'use client';
import { ClassNames } from '@emotion/react';
import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const TrendingMovies = () => {
	const [moviesTrending, setMoviesTrending] = useState([]);
	const [trendingLists, setTrendingLists] = useState('day');

	const URL_IMAGE = 'https://image.tmdb.org/t/p/original';

	const lists = [
		{
			name: 'day',
		},
		{
			name: 'week',
		},
	];

	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzU4YzAyZTAwZGZkZThhZjI0MWFmMTAyODMxYjJkOSIsInN1YiI6IjY1NTAzM2QwMmI5MzIwMDlmYmNiYTYwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dAScOFyYK45j9nSDDx0NVE2qwncLJ2AGgg8sXA2BnDk',
		},
	};

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/trending/all/${trendingLists}?language=en-US`, options)
			.then((response) => response.json())
			.then((response) => setMoviesTrending(response.results))
			.catch((err) => console.error(err));
	}, [trendingLists]);

	const handleTrendingMovie = (name) => setTrendingLists(name);

	return (
		<div className='text-black m-auto flex flex-col max-w-screen-2xl overflow-hidden pt-1' style={{ backgroundImage: 'url(/bg_trending/bg_wave_trending.svg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
			<div className='flex justify-start items-center font-semibold mb-2 text-xs md:text-base ml-3'>
				<h3 className='mr-3'>Trendings:</h3>
				{lists.map((list) => (
					<div key={list.name} className={clsx(`py-2 px-3 cursor-pointer capitalize`, trendingLists === list.name ? 'selectedTrend' : '')} onClick={() => handleTrendingMovie(list.name)}>
						{list.name}
					</div>
				))}
			</div>
			<div className='flex overflow-x-auto overscroll-x-contain snap-x snap-proximity'>
				{moviesTrending?.map((trend) => (
					<div key={trend.id} className='relative mx-1 md:mx-3 cursor-pointer text-xs'>
						<Link href={`/details/${trend.id}`}>
							<div className='w-16 md:w-24'>
								<Image src={`${URL_IMAGE}${trend.poster_path}`} alt='imagen' width={90} height={90} className='rounded-xl' />
							</div>
							<div className='relative w-full flex flex-col items-start pt-5'>
								<div className='absolute right-1 md:right-2 -top-5 flex justify-center items-center rounded-full bg-gray-600 text-white md:text-sm w-8 md:w-10 h-8 md:h-10'>{trend.vote_average.toFixed(1)}%</div>
								<h3 className='font-semibold md:text-sm'>{trend.original_name || trend.title}</h3>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default TrendingMovies;
