import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow ,AccordionDetails, Accordion, AccordionSummary} from '@material-ui/core';
import { AppBar,  IconButton, Stack, Toolbar, Typography } from "@mui/material";
import StoreIcon from '@mui/icons-material/Store';
import { useNavigate } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {Menu,MenuItem} from "@mui/material";



function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [profiledropdown, setProfileDropdown] = useState(null);
  const navigate=useNavigate();
  const user_id=localStorage.getItem('user_id')
  const token=localStorage.getItem('token')
  const handleProfileClick=(event)=>{
    console.log('Clicked Profile')
    setProfileDropdown(event.currentTarget);

};
const handleProfileClose = () => {
    setProfileDropdown(null);
};
  useEffect(() => {
    const token=localStorage.getItem('token');
              console.log(token)
              if(token===null)
              {
                navigate('/login')
              }
    async function fetchOrders() {
      const response = await fetch(`http://127.0.0.1:8000/api/order/${user_id}/getOrders`,{
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      const data = await response.json();
      console.log(data);

      setOrders(data);
    }

    fetchOrders();
  }, []);

  return (
    <>
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
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Order ID</TableCell>
          <TableCell>Date</TableCell>
          {/* <TableCell>Status</TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map(order => (
            <React.Fragment key={order.id}>
          <TableRow>
            <TableCell>{order.orderId}</TableCell>
            <TableCell>{order.date}</TableCell>
            {/* <TableCell>{order.status}</TableCell> */}
          </TableRow>
          <TableRow>
              <TableCell colSpan={3}>
                <Accordion>
                  <AccordionSummary>
                    Order Items
                  </AccordionSummary>
                  <AccordionDetails>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell>Quantity</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>Order Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order.products.map(orderitem => (
                          <TableRow key={orderitem.id}>
                            <TableCell>
                                <h1>{orderitem.product.name}</h1>
                                <img style={{ width: '100px', height: '100px' }} src={'http://127.0.0.1:8000'+orderitem.product.image} alt={orderitem.product.name} />
                                <p>{orderitem.product.description}</p>
                            </TableCell>
                            <TableCell>{orderitem.quantity}</TableCell>
                            <TableCell>₹{orderitem.product.price}</TableCell>
                            <TableCell>{orderitem.status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionDetails>
                </Accordion>
              </TableCell>
            </TableRow>
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
    </>
  );
}

export default OrderHistory;
