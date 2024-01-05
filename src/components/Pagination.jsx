import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationRounded = ({ totalPages, setCurrentPage }) => {

	const handleChange = (event, value) => {
		setCurrentPage(value);
	};

	return (
		<Stack>
			<Pagination count={totalPages} defaultPage={1} onChange={handleChange} shape='rounded' />
		</Stack>
	);
};

export default PaginationRounded;
