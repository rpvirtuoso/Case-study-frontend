import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, InputAdornment } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { AppBar,Toolbar,Stack, Typography,Box } from '@mui/material';
import TextField from '@material-ui/core/TextField';
import StoreIcon from '@mui/icons-material/Store';
import { useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  column: {
    padding: theme.spacing(2),
  },
  image:{
    maxWidth:'100%',
    maxHeight:'70%',
  },
  input: {
    objectFit: 'contain',
  },
}));

const Products = () => {
  const navigate=useNavigate();
  const {productId}= useParams();
  const [isAdmin,setIsAdmin]=useState(false);

  const [product,setProduct]=useState([]);
  const classes = useStyles();
  const [quantity, setQuantity] = React.useState(0);
  const userId= localStorage.getItem('user_id');
  useEffect(() => {
    // Fetch the data from the API
    const token=localStorage.getItem('token');

    const config = {
      headers: { Authorization: `Token ${token}` }
  };
    axios.get(`http://127.0.0.1:8000/api/products/getById/${productId}`).then(function (response) {
      setProduct(response.data);
    });
    axios.get(`http://127.0.0.1:8000/api/account/checkAdmin`,config).then(response=>{
        console.log(response);
        if (response.status===200)
        {
            setIsAdmin(true);
        }
        // if
    })
},[])
const handleModifyProduct=()=>{
  console.log(product.id);
  navigate('/modifyproduct',{ state: { id: product.id } })
}
const handleChange = (event) => {
  setQuantity(parseInt(event.target.value));
};

const handleIncrement = () => {
  setQuantity(quantity + 1);
};

const handleDecrement = () => {
  if (quantity >1) {
    setQuantity(quantity - 1);
  }
};

const handleAddToCart=()=> {
  console.log(`product id : ${productId}`)
  const bodyParameters = {
    quantity: quantity,
 };
 const token=localStorage.getItem('token')
 const config = {
         headers: { Authorization: `Token ${token}` }
     };
axios.post(`http://127.0.0.1:8000/api/cart/${userId}/changeQuantity/${productId}`,bodyParameters,config).then(response => {
      // handle success
      console.log(response);
    }).catch(error => {
      // handle error
      console.log(error);
    });
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
        <IconButton onClick={() => {  navigate("/cart"); }}size="large" aria-label="show cart items" color="inherit">
          <Badge badgeContent={0} color="error">
              <ShoppingCartIcon />
          </Badge>
        </IconButton>
        </Toolbar>
    </AppBar>
    <div className={classes.root}>
    <Grid container style={{height: '50%'}}>
      <Grid item xs={6} className={classes.column}>
        <img alt={product.name} className={classes.image} src={'http://127.0.0.1:8000'+product.image}></img>
      </Grid>
      <Grid item xs={6} className={classes.column}>
        <Stack direction="column">
            <h2>{product.name}</h2>
            <Typography variant='body1'>
                {product.description}
            </Typography>
            {/* <TextField className={classes.input}
                        type="number"
                        value={quantity}
                        onChange={handleChange}
                        InputProps={{endAdornment: (
                                                      <InputAdornment position="end">
                                                        <IconButton onClick={handleIncrement}>
                                                          <AddIcon />
                                                        </IconButton>
                                                        <IconButton onClick={handleDecrement}>
                                                          <RemoveIcon />
                                                        </IconButton>
                                                      </InputAdornment>
                                                    ),
      }}
    />  */}
    {isAdmin ? (<Button onClick={handleModifyProduct} color="red" sx={{textTransform: "none"}}>Modify</Button>) 
              :  (<>

              <TextField className={classes.input}
                        type="number"
                        value={quantity}
                        onChange={handleChange}
                        InputProps={{endAdornment: (
                                                      <InputAdornment position="end">
                                                        <IconButton onClick={handleIncrement}>
                                                          <AddIcon />
                                                        </IconButton>
                                                        <IconButton onClick={handleDecrement}>
                                                          <RemoveIcon />
                                                        </IconButton>
                                                      </InputAdornment>
                                                    ),
      }}
    /> 
                <Button variant="contained" color="primary" onClick={handleAddToCart}>Add to Cart</Button>
                </>)}
        </Stack>
      </Grid>
    </Grid>
  </div>
  </Box>
  );
}

export default Products;
