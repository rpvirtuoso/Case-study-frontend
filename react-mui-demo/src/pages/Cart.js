import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import {Box} from "@mui/material";
import { AppBar,  IconButton, Stack, Toolbar, Typography } from "@mui/material";
import StoreIcon from '@mui/icons-material/Store';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { useState ,useEffect} from "react";
import {Menu,MenuItem} from "@mui/material";
import axios from 'axios';
import useMediaQuery from '@mui/material/useMediaQuery';


const useStyles = makeStyles({
                                table: {
                                minWidth: 650,
                                        },
                            });
const Cart = () => {
    const classes = useStyles();
    const [profiledropdown, setProfileDropdown] = useState(null);
    const navigate=useNavigate();
    const user_id=localStorage.getItem("user_id")
    const [items, setItems] = useState([]);
    const [modifieditems, setModifiedItems] = useState([]);
    const [cartquantity,setCartQuantity]=useState(0);
    const token=localStorage.getItem('token');
    const isSmallScreen = useMediaQuery('(max-width: 600px)');
    const [totalPrice, setTotalPrice] = useState(0);

    const config = {  headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Token ${token}`
                              }
                  };
    const data = {
                    // data to be sent as the request body
                };
    useEffect(()=>{
                    axios.get(`http://127.0.0.1:8000/api/cart/${user_id}/getCart`,config).then(response => {
                    console.log(response.data.products);
                    setCartQuantity(response.data.products.length)
                    // setCartQuantity(response.data.products.length);
                    setItems(response.data.products);}).catch(error => {console.log(error);});
                    console.log(items);
                },[])
    
    useEffect(()=>{
                    axios.get(`http://127.0.0.1:8000/api/cart/${user_id}/getCart`,config).then(response => {
                    console.log(response.data.products);
                    setCartQuantity(response.data.products.length);
                    const total = response.data.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
                    setTotalPrice(total);
                    setItems(response.data.products);}).catch(error => {console.log(error);});
                    console.log(items);
                },[modifieditems])
    const handleQuantityChange = (id, newQuantity) => {
        console.log(id)
        const updatedItems = items.map((item) => {
        const config = {  headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
            }
            };
        const data = {
                    quantity:newQuantity,
                    };
        const productId=item.product.id;
        console.log(items)
        console.log(item)
        if (item.id === id) {
            axios.post(`http://127.0.0.1:8000/api/cart/${user_id}/changeQuantity/${productId}`,data,config).then(response => {
                // handle success
                console.log(response);
              })
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      setItems(updatedItems);
    };
    const handleProfileClick=(event)=>{
        console.log('Clicked Profile')
        setProfileDropdown(event.currentTarget);

    };
    const handleProfileClose = () => {
        setProfileDropdown(null);
    };
    const handleCreateOrder = () => {
      // create order logic goes here...
      console.log(cartquantity);
    if(cartquantity>0)
        {    
            const config = {  headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
                }
                };
              axios.get(`http://127.0.0.1:8000/api/order/${user_id}/createOrder`,config).then(response => {
                console.log(response);
              })
              navigate('/')
        
            };  
        }
  
     
    const handleremoveCartitem =  async (id) => {
        // remove cart item logic goes here...
        
            items.map(  async (item) => {
                const config = {  headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                        }
                        };
                const data ={
                                };
                const productId=item.product.id;
                if (item.id === id) {
                    console.log(item)

                   const response_afterremoval= await axios.get(`http://127.0.0.1:8000/api/cart/${user_id}/remove/${productId}`,config);
                    console.log(response_afterremoval)
                    setModifiedItems(response_afterremoval.data)
                    // const response=await axios.get(`http://127.0.0.1:8000/api/cart/${user_id}/getCart`,config)
                    // console.log(response.data.products);
                    // setItems(response.data.products);
                    // then(response => {
                    //     console.log(response.data.products);
                    //     setItems(response.data.products);})
                }
              });
                const response= await axios.get(`http://127.0.0.1:8000/api/cart/${user_id}/getCart`,config)
                console.log(response.data.products);
                 setItems(response.data.products);
       
    };
  
    return (
        <>
        <Box>
         <AppBar position='static'>
                    <Toolbar>
                    <IconButton onClick={() => {  navigate("/"); }} size='large' edge='start' color="inherit" aria-label="logo">
                        <StoreIcon/>
                    </IconButton>
                    <Typography variant="h6" component='div' sx={{flexGrow:1}}>
                        Shopping App
                    </Typography>
                    <Button
                            aria-controls="profile-menu"
                            aria-haspopup="true"
                            onClick={handleProfileClick}
                            color="inherit"
                            sx={{textTransform: "none"}}
                            >Profile</Button>
                    <Menu
                         id="profile-menu"
                        anchorEl={profiledropdown}
                        keepMounted
                        open={Boolean(profiledropdown)}
                        onClose={handleProfileClose}                        
                        >
                        <MenuItem onClick={() => {navigate('/profile')}}>Your Profile</MenuItem>
                        <MenuItem onClick={() => {navigate('/orderhistory')}}>Order History</MenuItem>

                    </Menu>
                    </Toolbar>
                </AppBar>
                </Box>
            {isSmallScreen ? (
        // code for small screen sizes
                            <>
                            {items.map((item) => (
                            <Box key={item.id} display="flex" flexDirection="row" alignItems="center">
                            <Box flexGrow={1}>
                                {item.product.name} - {item.quantity} x ${item.product.price}
                            </Box>
                            <Input value={item.quantity} onChange={(event) => handleQuantityChange(item.id, event.target.value)} />
                            <IconButton color="secondary" onClick={() => { handleremoveCartitem(item.id) }}>
                            <DeleteIcon />
                            </IconButton>
                            </Box>
                        ))}
        </>
      ) :( <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="cart table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right"></TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  {item.product.name}
                </TableCell>
                <TableCell align="right">₹{item.product.price}</TableCell>
                <TableCell align="right">
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(event) =>
                      handleQuantityChange(item.id, event.target.value)
                    }
                  />
                </TableCell>
                <TableCell align="right">
                ₹{(item.product.price * item.quantity)}
                </TableCell>
                <TableCell align="right">
                <IconButton onClick={() => { handleremoveCartitem(item.id) }} size='large' edge='start' color="inherit" aria-label="logo">
                        <DeleteIcon/>
                    </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableRow>
                <TableCell colSpan={3} align="right">Total</TableCell>
                 <TableCell align="right">${totalPrice.toFixed(2)}</TableCell>
        </TableRow>
        </Table>
        <Button sx={{textTransform: "none"}} style={{float: "right",backgroundColor: "Tomato"}} onClick={handleCreateOrder}>
        <Typography variant="button" display="block" gutterBottom>
            Create Order
        </Typography></Button>
      </TableContainer>)
        }
        </>
       
    );
}

export default Cart
