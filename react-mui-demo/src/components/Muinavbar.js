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
import { Link } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    gridItem: {
        '&:hover': {
          backgroundColor: '#eee',
        },
      },
    productCard: {
      padding: theme.spacing(2),
    },
    productImage: {
      width:128,
      height:128,
      
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
    const cat1='Books and Education';
    const cat2='Electronics';
    const cat3='Fashion and Beauty';
    const cat4='Gaming';
    const cat5='Home,Furniture and Appliances';
    const cat6='Office and Personal';
    const cat7='Sports,Outdoor and Travel';

    const navigate = useNavigate();
    const [dropdown, setDropdown] = useState(null);
    const [products, setProducts] = useState([]);
    const classes = useStyles();
    const [IsLoggedIn,setIsLoggedIn]=useState(false);
    const [categories,setCategories]=useState(null);

  useEffect(() => {
    // Fetch the data from the API
    fetch('http://127.0.0.1:8000/api/products/')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      });
      if (typeof localStorage.getItem('token') !="undefined"){
        setIsLoggedIn(true);
        console.log(setIsLoggedIn);
    }


  }, []);

//   useEffect(()=>{
//     if (typeof localStorage.getItem('token') !="undefined"){
//         setIsLoggedIn(true)
//         console.log(setIsLoggedIn)
//     }
//   },[IsLoggedIn]);


    // const checkStatus=()=>{
    //     if (typeof localStorage.getItem('token') !="undefined"){
    //         setIsLoggedIn(true)
    //     }
    // }`
    const handleLogout=()=>{

        const id=localStorage.getItem('user_id');
        console.log('clicked logout');
        const bodyParameters = {
            id: id,
         };
         const token=localStorage.getItem('token')
         const config = {
                 headers: { Authorization: `Token ${token}` }
             };
        axios.post("http://127.0.0.1:8000/api/account/logout",bodyParameters,config);
        setIsLoggedIn(false);
        console.log(IsLoggedIn);
        localStorage.removeItem("user_id");
        localStorage.removeItem("email");
        localStorage.removeItem("token");

    };

    const handleClick = (event) => {
      setDropdown(event.currentTarget);
    };
  
    const handleClose = () => {
      setDropdown(null);
    };
    const handlefilterbyCategory=()=>{

    }
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
                        <MenuItem onClick={() => handlefilterbyCategory(cat1)}>Books and Education</MenuItem>
                        <MenuItem onClick={() => handlefilterbyCategory(cat2)}>Electronics</MenuItem>
                        <MenuItem onClick={() => handlefilterbyCategory(cat3)}>Fashion and Beauty</MenuItem>
                        <MenuItem onClick={() => handlefilterbyCategory(cat4)}>Gaming</MenuItem>
                        <MenuItem onClick={() => handlefilterbyCategory(cat5)}>Home,Furniture and Appliances</MenuItem>
                        <MenuItem onClick={() => handlefilterbyCategory(cat6)}>Office and Personal</MenuItem>
                        <MenuItem onClick={() => handlefilterbyCategory(cat7)}>Sports,Outdoor and Travel</MenuItem>




                    </Menu>
      {IsLoggedIn ? (
        <Button onClick={handleLogout} color="inherit" sx={{textTransform: "none"}}>Logout</Button>
      ) : (
        <Button onClick={() => {  navigate("/login"); }} color="inherit" sx={{textTransform: "none"}}>Login</Button>
      )}




                    {/* <Button onClick={() => {  
                        navigate("/login"); }} color="inherit" sx={{textTransform: "none"}}>Login</Button> */}
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
      { <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id} className={classes.gridItem}>
            <div className={classes.productCard}>
              <img src={'http://127.0.0.1:8000'+product.image} alt={product.name} className={classes.productImage} />
              <Link to={`/products/${product.id}`}>
                <Typography variant="body1" className={classes.productName}>
                {product.name}
                </Typography>
              </Link>
              
              <Typography variant="body2" className={classes.productPrice}>
                {'₹'+product.price}
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid> 
      
      }
    </div>
    </Box>
    
  )
}

export default Muinavbar
