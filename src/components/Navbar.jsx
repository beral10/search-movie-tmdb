import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Navbar = () => {
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
    <div className='max-w-screen-2xl m-auto px-10'>
        <div className='flex justify-between items-center py-6'>
            <Link href={'/'}>
                <Image src='/logos/logo_navbar.svg' alt='logo' width={200} height={100} />
            </Link >
            <ul className='flex justify-between items-center gap-4'>
                {
                    links.map( link => (
                        <li key={link.name}>
                            <Link href={link.link}>
                                {
                                    link.name
                                }
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>
  )
}

export default Navbar