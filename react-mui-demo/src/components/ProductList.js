import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@mui/material/Typography';

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

function ProductList({ category }) {
  const classes = useStyles();

  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: '$10.99',
      image: 'https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80',
    },
    {
      id: 2,
      name: 'Product 2',
      price: '$9.99',
      image: '/product2.jpg',
    },
    {
      id: 3,
      name: 'Product 3',
      price: '$8.99',
      image: '/product3.jpg',
    },
    // ... more products here
  ];

  return (
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
  );
}

export default ProductList;
