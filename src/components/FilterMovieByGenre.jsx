'use client';
import React, { useState } from 'react';

const FilterMovieByGenre = ({ setFilterGenre }) => {
	const [selectValue, setSelectValue] = useState('');

	const genres = [
		{
			id: 28,
			name: 'Action',
		},
		{
			id: 12,
			name: 'Adventure',
		},
		{
			id: 16,
			name: 'Animation',
		},
		{
			id: 35,
			name: 'Comedy',
		},
		{
			id: 80,
			name: 'Crime',
		},
		{
			id: 99,
			name: 'Documentary',
		},
		{
			id: 18,
			name: 'Drama',
		},
		{
			id: 10751,
			name: 'Family',
		},
		{
			id: 14,
			name: 'Fantasy',
		},
		{
			id: 36,
			name: 'History',
		},
		{
			id: 27,
			name: 'Horror',
		},
		{
			id: 10402,
			name: 'Music',
		},
		{
			id: 9648,
			name: 'Mystery',
		},
		{
			id: 10749,
			name: 'Romance',
		},
		{
			id: 878,
			name: 'Science Fiction',
		},
		{
			id: 10770,
			name: 'TV Movie',
		},
		{
			id: 53,
			name: 'Thriller',
		},
		{
			id: 10752,
			name: 'War',
		},
		{
			id: 37,
			name: 'Western',
		},
		{
			id: null,
			name: 'All',
		},
	];

	const handleFilterGenres = (genreId) => {
		setFilterGenre(genreId);
	};

	const handleSelectChange = (event) => {
		const selectedOption = event.target.selectedOptions[0];
		const valueId = Number(selectedOption.getAttribute('valueid'));
		setSelectValue(event.target.value);
		setFilterGenre(valueId);
	};

	return (
		<div className='flex flex-col gap-3'>
			<h3 className='font-semibold text-lg md:text-xl'>Discover your movies by genre:</h3>
			<div className='boxParentGenre'>
				{genres.map((genre) => (
					<div key={genre.id} className='border-2 border-slate-600 rounded-md px-2 py-1 cursor-pointer hover:bg-slate-400' onClick={() => handleFilterGenres(genre.id)}>
						{genre.name}
					</div>
				))}
			</div>
			<div className='flex justify-between md:hidden pb-4'>
				<label htmlFor='selectOption'>Select an option:</label>
				<select id='selectOption' value={selectValue} onChange={handleSelectChange} className='text-black w-40'>
					<option value=''>Choose...</option>
					{genres.map((genre) => (
						<option key={genre.id} value={genre.name} valueid={genre.id}>
							{genre.name}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default FilterMovieByGenre;
