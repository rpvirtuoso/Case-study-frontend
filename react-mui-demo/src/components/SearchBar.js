import { styled, alpha } from '@mui/material/styles';
import { useState,useEffect } from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar({products, filteredProducts, setFilteredProducts,onApiResponse }) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery.length >= 3) {
      const searchedproducts =products.filter((product) => {
        return product.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setFilteredProducts(searchedproducts);
    }
    else {
      setFilteredProducts(products);
    }
  }, [searchQuery]);
  // function handleKeyDown(event) {
  //   if (event.key === 'Enter') {
  //     const { value } = event.target;
  //   // Call the API here
  //   axios.get(`http://127.0.0.1:8000/api/products/search/${value}`)
  //     .then((response) => {
  //       // Do something with the response data
  //       onApiResponse(response);
  //     });
  // }}
  return (
   
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              // onKeyDown={handleKeyDown}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}

            />

          </Search>
  );
}