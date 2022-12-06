import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import StoreIcon from '@mui/icons-material/Store';
import {Menu,MenuItem,Box,List,ListItem} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchAppBar from "./SearchBar";
import { useState ,useEffect} from "react";
import ProductList from "./ProductList";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    productCard: {
      padding: theme.spacing(2),
    },
    productImage: {
      width: '50%',
      
    },
    productName: {
      marginTop: theme.spacing(1),
    },
    productPrice: {
      marginTop: theme.spacing(1),
      fontWeight: 'bold',
    },
  }));


const Muinavbar = () => {
    const navigate = useNavigate();
    const [dropdown, setDropdown] = useState(null);
    const [products, setProducts] = useState([]);
    const classes = useStyles();


  useEffect(() => {
    // Fetch the data from the API
    fetch('http://127.0.0.1:8000/api/products/')
      .then(response => response.json())
      .then(data => {
        console.log(typeof(data[0].image));
        setProducts(data);
      });


  }, []);



    const handleClick = (event) => {
      setDropdown(event.currentTarget);
    };
  
    const handleClose = () => {
      setDropdown(null);
    };

  return (
    <Box>
            <AppBar position='static'>
        <Toolbar>
            <IconButton onClick={() => {  navigate("/"); }} size='large' edge='start' color="inherit" aria-label="logo">
                <StoreIcon/>
            </IconButton>
            <Typography variant="h6" component='div' sx={{flexGrow:1}}>
                Shopping App
            </Typography>
            <SearchAppBar/>
            <Stack direction='row' spacing={2}>
            <Button
            aria-controls="categories-menu"
            aria-haspopup="true"
            onClick={handleClick}
            color="inherit"
            sx={{textTransform: "none"}}
          >
            Categories
          </Button>
                <Menu
                    id="categories-menu"
                    anchorEl={dropdown}
                    keepMounted
                    open={Boolean(dropdown)}
                    onClose={handleClose}
                    >
                    <MenuItem onClick={handleClose}>Category 1</MenuItem>
                    <MenuItem onClick={handleClose}>Category 2</MenuItem>
                    <MenuItem onClick={handleClose}>Category 3</MenuItem>
                </Menu>
                <Button onClick={() => {  navigate("/login"); }} color="inherit" sx={{textTransform: "none"}}>Login</Button>
            </Stack>
        </Toolbar>
    </AppBar>
        {/* <List>
            {products.map((product) => (
            <ListItem key={product.id}>
                {product.name}
                {product.price}
                {product.category}
                {product.subcategory}
                {product.description}

            </ListItem>
            ))}
        </List> */}
        {/* <ProductList/> */}
        <div className={classes.root}>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <div className={classes.productCard}>
              <img src={product.image} alt={product.name} className={classes.productImage} />
              <Typography variant="body1" className={classes.productName}>
                {product.name}
              </Typography>
              <Typography variant="body2" className={classes.productPrice}>
                {product.price}
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
    </Box>
    
  )
}

export default Muinavbar
