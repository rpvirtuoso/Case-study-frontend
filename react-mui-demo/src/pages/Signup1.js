import { type } from "@testing-library/user-event/dist/type";
import { useState } from "react";
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
import { useNavigate } from "react-router-dom";



function Signup1() {
    let navigate=useNavigate()
    // const[token,setToken]=useState(null)
    // const[id,setID]=useState(null)

        
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [message, setMessage] = useState("");


  let handleSubmit = async (event) => {

    event.preventDefault();
    try {
      console.log(event)
      const data = new FormData(event.currentTarget);
      const first_name=data.get('firstName')
      const email=data.get('email')
      const password=data.get('password')

      const last_name=data.get('lastName')
      const name=first_name+" "+last_name
      let res = await fetch("http://127.0.0.1:8000/api/account/signup", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      let resJson = await res.json();
      console.log(resJson)
      if (res.status === 201) {
        
        const token=resJson.token
        const id=resJson.id
        console.log(token)

        localStorage.setItem(email, token)
        localStorage.setItem('ID',id)
        console.log("Just  before redirect")
        const token2=localStorage.getItem(email)
        console.log(token2)
        navigate("/login");
        
        
      } 
      // else {
      //   // if(typeof resJson.email!="undefined"){
      //   //   setMessage(resJson.email);
      //   // }
      //   // else if(typeof resJson.name !="undefined")
      //   // {
      //   //   setMessage(resJson.name)
      //   // }

          
      }
     catch (err) {
      console.log(err);
    }
  };

  return (
    // <div className="Signup">
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       value={name}
    //       placeholder="Name"
    //       onChange={(e) => setName(e.target.value)}
    //     />
    //     <input
    //       type="text"
    //       value={email}
    //       placeholder="Email"
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       value={password}
    //       placeholder="Password"
    //       onChange={(e) => setPassword(e.target.value)}
    //     />

    //     <button type="submit">Signup</button>

    //     <div className="message">{message ? <p>{message}</p> : null}<br></br></div>
    //   </form>
    // </div>
    // <ThemeProvider theme={theme}>
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
    // </ThemeProvider>
  );
}

export default Signup1
