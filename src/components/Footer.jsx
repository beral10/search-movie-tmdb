import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
	return (
		<div className='max-w-screen-2xl m-auto px-10 flex gap-3'>
			<div className='md:flex justify-between items-starts py-6 hidden'>
				<Link href={'/'}>
					<Image src='/logos/logo_footer.svg' alt='footer_image' width={100} height={100} />
				</Link>
			</div>
			<div className='flex gap-2 flex-1 py-10 md:pt-7'>
				<span className='bg-slate-400 w-full h-1 rounded-full hidden md:flex'></span>
				<div className=''>
					<h3 className='flex flex-col gap-1 text-sm'>Produced by: <span>Yeferson Bernal</span></h3>
				</div>
				<span className='bg-slate-400 w-full h-1 rounded-full hidden md:flex'></span>
			</div>
		</div>
	);
};

export default Footer;
