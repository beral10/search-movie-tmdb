import Image from 'next/image';
import imagen from '@/assets/bg_about/red_pipes.svg';
import deadpool from '@/assets/bg_about/deadpool.png';
import React from 'react';

const About = () => {
	return (
		<div className='max-w-screen-2xl h-[calc(100vh-11.8rem)] bg-black m-auto relative flex flex-col justify-center items-center'>
			<div className='flex flex-col justify-center items-center z-10'>
				<h2 className='mb-10 md:mb-20 text-4xl md:text-6xl font-serif'>Hi there!</h2>
				<Image src={deadpool} alt='deadpool' width={600} height={400} />
				<p className='px-5 md:px-32 md:text-xl mt-5'>
					The Movie Database (TMDB) is a community built movie and TV database. With this database you will be able to find as many new and upcoming movies as possible. It is very intuitive and easy to use. Keep in mind that this project is only a copy of the original database, its logos and colors
					are respected to illustrate respect and ownership.
				</p>
			</div>
			<div className='absolute inset-0 w-full h-full'>
				<Image src={imagen} alt='imgen de apoyo' fill={true} />
			</div>
		</div>
	);
};

export default About;
