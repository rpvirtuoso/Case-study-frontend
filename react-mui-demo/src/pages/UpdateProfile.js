import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import  { useState } from 'react';
import { AppBar,  IconButton, Stack, Toolbar, Typography } from "@mui/material";
import {Menu,MenuItem} from "@mui/material";
import StoreIcon from '@mui/icons-material/Store';
import axios from 'axios';
import { useEffect } from 'react';
const UpdateProfile = () => {
    const [profiledropdown, setProfileDropdown] = useState(null);
    const user_id=localStorage.getItem('user_id');
    const [profile,setProfile]=useState([])
    const [name,setName]=useState([])
    const [phone,setPhone]=useState([])
    const [address,setAdress]=useState([])

    const token=localStorage.getItem('token');
  
    const config = {  headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
      }
  };
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/account/getprofile/${user_id}`,config).then(response=>{
        console.log(response.data);
        setProfile(response.data);

    })
  
  }, [])
    const navigate=useNavigate();
    const handleProfileClick=(event)=>{
        console.log('Clicked Profile')
        setProfileDropdown(event.currentTarget);
    
        };
      const handleProfileClose = () => {
        setProfileDropdown(null);
        };
    const handleUpdate=async (event)=>{
        event.preventDefault();

    
        const body = {
          name,
          phone,
          address,
          id: user_id
        };
      
        // Send a POST request to the API endpoint with the form data and user_id
        const response = await axios.post('http://127.0.0.1:8000/api/account/updateprofile',  body,config);
        // Process the response from the API
        console.log(response.data);
        }

  return (
    <div>
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
                <div>
    <Form>
    <Form.Group className="mb-3" controlId="formname">
      <Form.Label>Name</Form.Label>
      <Form.Control onChange={(e)=>setName(e.target.value)} placeholder="Enter your name" />
    </Form.Group>
    <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control readOnly type="email" placeholder={profile.email} />
        
      </Form.Group>

      <Form.Group as={Col} controlId="formGridPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control  type="password" placeholder={profile.password} />
      </Form.Group>
    </Row>

    <Form.Group className="mb-3" controlId="formPhonenumber">
      <Form.Label>Phone number</Form.Label>
      <Form.Control onChange={(e)=>setPhone(e.target.value)}  placeholder={profile.phone} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formGridAddress1">
      <Form.Label>Address</Form.Label>
      <Form.Control onChange={(e)=>setAdress(e.target.value)} placeholder={profile.address} />
    </Form.Group>



    
{/* 
    <Form.Group className="mb-3" id="formGridCheckbox">
      <Form.Check type="checkbox" label="Check me out" />
    </Form.Group> */}

    <Button onClick={handleUpdate} variant="primary" type="submit">
      Update
    </Button>
  </Form>
  </div>

    </div>
  )
}

export default UpdateProfile
