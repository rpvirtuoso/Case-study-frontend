import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import StoreIcon from '@mui/icons-material/Store';

import {  redirect, useNavigate } from "react-router-dom";

const Muinavbar = () => {
    const navigate = useNavigate();


  return (
    <AppBar position='static'>
        <Toolbar>
            <IconButton size='large' edge='start' color="inherit" aria-label="logo">
                <StoreIcon/>
            </IconButton>
            <Typography variant="h6" component='div' sx={{flexGrow:1}}>
                Shopping App
            </Typography>
            <Stack direction='row' spacing={2}>
                <Button onClick={() => {console.log('onclick');}} color="inherit" sx={{textTransform: "none"}}>Categories</Button>
                <Button onClick={() => {  navigate("/login"); }} color="inherit" sx={{textTransform: "none"}}>Login</Button>
            </Stack>
        </Toolbar>
    </AppBar>
  )
}

export default Muinavbar
