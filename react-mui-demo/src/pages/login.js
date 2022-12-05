import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios, * as others from 'axios';



const theme = createTheme();

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email= data.get('email');
    console.log(typeof email)
    const password= data.get('password');

    const token=localStorage.getItem(email)
    console.log(token)
    const config = {
      headers: { Authorization: `Token ${token}` }
  };
  
  const bodyParameters = {
     email: email,
     password:password
  };
  
  axios.post( 
    'http://127.0.0.1:8000/api/account/login',
    bodyParameters,
    config
  ).then(console.log).catch(console.log);
  };
  

    const [showPass,setPass]=useState(false);
    
    const handlePasswordVisibility=()=>
    {
        setPass(preValue=>!preValue)
      
    }
  


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              // required
              fullWidth
              name="password"
              label="Password"
              type={showPass?"text":"password"}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment:
                  <InputAdornment postion='end'>
                      <IconButton onClick={handlePasswordVisibility} aria-label='toggle password' edge='end'>
                            {
                              showPass?(<VisibilityOffIcon/>):(<VisibilityIcon/>)}
                      </IconButton>
                  </InputAdornment>
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="http://localhost:3000/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
