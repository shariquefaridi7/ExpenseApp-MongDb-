import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationComponent = ({ currentPage, totalPages, setCurrentPage }) => {
  const handleChange = (event, value) => {
    setCurrentPage(value);
   
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary" 
        variant="outlined"
    
      />
    </Stack>
  );
};

export default PaginationComponent;
