'use client';
import MenuNavbar from '@/ui/menuNavbar';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
	const [toggleMenu, setToggleMenu] = useState(false);

	let links = [
		{
			name: 'About',
			link: '/about',
		},
		{
			name: 'Favorites',
			link: '/favorites',
		},
		{
			name: 'Contact',
			link: '/contact',
		},
	];

	return (
		<div className='max-w-screen-2xl m-auto px-10 relative'>
			
			{/* Desktop menu */}

			<div className='flex justify-between items-center py-6'>
				<Link href={'/'}>
					<Image src='/logos/logo_navbar.svg' alt='logo' width={150} height={100} />
				</Link>
				<MenuNavbar setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} />
				<ul className='hidden sm:flex justify-between items-center gap-4'>
					{links.map((link) => (
						<li key={link.name}>
							<Link href={link.link}>{link.name}</Link>
						</li>
					))}
				</ul>
			</div>

			{/* Mobile menu */}

			{toggleMenu && (
				<div className='fixed left-0 top-0 bg-[#0d253f] w-full h-screen flex flex-col justify-center items-center sm:hidden'>
					<div className={toggleMenu ? 'absolute right-10 top-7' : ''}>
						<MenuNavbar setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} />
					</div>
					<ul className='flex flex-col justify-between items-center gap-6'>
						{links.map((link) => (
							<li key={link.name} onClick={() => setToggleMenu(false)} className='text-xl text-[#90cea1] font-semibold'>
								<Link href={link.link}>{link.name}</Link>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Navbar;
