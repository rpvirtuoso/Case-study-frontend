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
import { redirect } from 'react-router-dom';
import { useState } from 'react';



const theme = createTheme();

export default function SignUp() {
  const[token,setToken]=useState(null)

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
      const email=data.get('email')

      const password=data.get('password')
      const first_name=data.get('firstName')

      const last_name=data.get('lastName')
      const name=first_name+" "+last_name
     
      
  };
  // POST request using fetch with set headers
// const element = document.querySelector('#post-request-set-headers .article-id');
// const requestOptions = {
//     method: 'POST',
//     headers: { 
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer my-token',
//         'My-Custom-Header': 'foobar'
//     },
//     body: JSON.stringify({ title: 'Fetch POST Request Example',name:first_name+" "+last_name,email:email,password:password })
// };
// fetch('http://127.0.0.1:8000/api/account/signup', requestOptions)
//     .then(response => response.json())
//     .then(data => element.innerHTML = data.id);

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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {/* <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                                      This is an error alert — <strong>check it out!</strong>
                        </Alert>
              </Stack> */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                    {/* <Stack direction="row" spacing={2}>
                        <Button variant="contained">Contained</Button>
                        <Button variant="contained" disabled>Disabled</Button>
                        <Button variant="contained" href="#contained-buttons">Link</Button>
                    </Stack> */}
                <Link href="http://localhost:3000/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}