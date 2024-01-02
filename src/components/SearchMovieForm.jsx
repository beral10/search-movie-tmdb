'use client'
import React, { useEffect, useState } from 'react'

const SearchMovieForm = (props) => {
  const [movie, setMovie] = useState('');
  
  useEffect(() => {
    if(props.resetMovie){
      setMovie('');
      props.setResetMovie(false)
    }
  }, [props.resetMovie])
  

  return (
    <form className='flex flex-col sm:flex-row justify-center items-end gap-2 lg:gap-6 py-10 w-full'>
    <div className='flex flex-col gap-1 text-black w-full sm:w-1/2'>
      <label htmlFor='title' className='font-semibold hidden sm:flex'>
        Search movie title:
      </label>
      <input className='py-2 px-3 outline-none rounded-md border-2 border-solid shadow-[#0d253f] shadow-md' type='text' id='title' placeholder='Movie name' onChange={(e) => setMovie(e.target.value)} value={movie} />
    </div>
    <button className='bg-[#01b4e4] hover:bg-[#078fb4] rounded-md px-4 py-2 font-semibold w-full sm:w-48' type='button' onClick={() => props.movieData(movie)}>
      Search
    </button>
  </form>
  )
}

export default SearchMovieForm