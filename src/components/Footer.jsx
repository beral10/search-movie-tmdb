import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
	return (
		<div className='max-w-screen-2xl m-auto px-10 flex justify-between items-center gap-3'>
			<div className='flex justify-between items-starts py-6'>
				<Link href={'/'}>
					<Image src='/logos/logo_footer.svg' alt='footer_image' width={100} height={100} />
				</Link>
			</div>
			<div className='block md:hidden'>
				<h3 className='flex flex-col gap-1 text-sm'>
					Produced by: <span className='font-semibold'>Yeferson Bernal</span>
				</h3>
			</div>
		</div>
	);
};

export default Footer;
