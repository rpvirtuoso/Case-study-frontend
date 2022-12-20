import React, { useEffect, useState } from 'react'
import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StoreIcon from '@mui/icons-material/Store';
import axios from 'axios';

const Admin = () => {
    const navigate = useNavigate();
    const [isAdmin,setIsAdmin]=useState(false);
    useEffect(() => {
        const token=localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Token ${token}` }
        };
        axios.get(`http://127.0.0.1:8000/api/account/checkAdmin`,config).then(response=>{
            console.log(response);
            if (response.status===200)
            {
                setIsAdmin(true);
            }
            // if
        })
        
    }, [])
    
    const handleModify=()=>{
        navigate('/modifyproduct')
    }
    const handleAdd=()=>{
        navigate('/addproduct')
    }
  return (
    <div>
        {isAdmin ?(<AppBar position='static'>
                <Toolbar>
                    <IconButton onClick={() => {  navigate("/"); }} size='large' edge='start' color="inherit" aria-label="logo">
                        <StoreIcon/>
                    </IconButton>
                    <Typography variant="h6" component='div' sx={{flexGrow:1}}>
                        Shopping App
                    </Typography>
                    <Button onClick={handleModify} color="inherit" sx={{textTransform: "none"}}>Modify product</Button>
                    <Button onClick={handleAdd} color="inherit" sx={{textTransform: "none"}}>Add Product</Button>
                </Toolbar>
        </AppBar>)
        :
        (<>

         <AppBar position='static'>
                <Toolbar>
                    <IconButton onClick={() => {  navigate("/"); }} size='large' edge='start' color="inherit" aria-label="logo">
                        <StoreIcon/>
                    </IconButton>
                    <Typography variant="h6" component='div' sx={{flexGrow:1}}>
                        Shopping App
                    </Typography>
                </Toolbar>
        </AppBar>
        <Typography sx={{textTransform: "none",justifyContent:'center'}} >You dont have authorisation for this page</Typography>
        </>
        )


        }
       

    </div>
  )
}

export default Admin
