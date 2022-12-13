import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, InputAdornment } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { Stack, Typography } from '@mui/material';
import TextField from '@material-ui/core/TextField';

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
  const {productId}= useParams()
  const [product,setProduct]=useState([])
  const classes = useStyles();
  const [quantity, setQuantity] = React.useState(0);
  const userId= localStorage.getItem('ID')
  useEffect(() => {
    // Fetch the data from the API
    axios.get(`http://127.0.0.1:8000/api/products/getById/${productId}`).then(function (response) {
      setProduct(response.data);
    });
},[])

const handleChange = (event) => {
  setQuantity(parseInt(event.target.value));
};

const handleIncrement = () => {
  setQuantity(quantity + 1);
};

const handleDecrement = () => {
  if (quantity > 1) {
    setQuantity(quantity - 1);
  }
};

const handleAddToCart=()=> {
    axios.get(`http://127.0.0.1:8000/api/cart/${userId}/changeQuantity/${productId}`)
}

  return (
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
        <Button variant="contained" color="primary" onClick={handleAddToCart}>
        Add to Cart
      </Button>
        </Stack>
      </Grid>
    </Grid>
  </div>
  );
}

export default Products;
