
import clsx from 'clsx';
import React from 'react';

const MenuNavbar = ({ setToggleMenu, toggleMenu }) => {
	return (
		<div className='flex flex-col gap-1 sm:hidden cursor-pointer' onClick={() => setToggleMenu(!toggleMenu)}>
			<span className={clsx('w-7 h-1 bg-slate-400', { 'rotate-45 translate-y-2 duration-200': toggleMenu })}></span>
			<span className={clsx('w-7 h-1 bg-slate-400', { 'opacity-0 duration-200': toggleMenu })}></span>
			<span className={clsx('w-7 h-1 bg-slate-400', { '-rotate-45 -translate-y-2 duration-200': toggleMenu })}></span>
		</div>
	);
};

export default MenuNavbar;


