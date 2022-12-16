import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { useEffect } from 'react';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

function ProfilePage() {
  const classes = useStyles();
  const token=localStorage.getItem('token');
  const user_id=localStorage.getItem('user_id');
  const [profile,setProfile]=useState([])
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
  
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {profile.name}
        </Typography>
        <Typography color="textSecondary">
          Email: {profile.email}
        </Typography>
        <Typography color="textSecondary">
          Phone: {profile.phone}
        </Typography>
        <Typography color="textSecondary">
          Address: {profile.address}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProfilePage;
