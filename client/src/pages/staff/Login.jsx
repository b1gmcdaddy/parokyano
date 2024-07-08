import React, { useState } from 'react';
import StaffAppBar from '../../components/StaffAppBar';
import { Box, Paper, TextField, Button, Typography } from '@mui/material';
import logo from '../../assets/logo.png';

const Login = () => {
  
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setLoginData({...loginData, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);
  }

  return (
    <div>
      <StaffAppBar />
      <Box className="bg-neutral-50" sx={{ width: "100%", height: "93vh", display: "flex", justifyContent: "center", 
        alignItems: "center", position: 'relative' }}>
        <Box sx={{ position: 'absolute', top: '8%', display: 'flex', justifyContent: 'center' }}>
          <img src={logo} alt="Logo" style={{ width: '220px', height: '200px' }} />
        </Box>
        <Paper elevation={2} sx={{ padding: {md: 6, xs: 6}, display: "flex", flexDirection: "column", gap: 2, width: "100%",
           maxWidth: "600px", marginTop: '50px' }} >
          <Typography sx={{fontWeight: "bold", fontSize: {md: '1.55em', xs: '1.25em'}, textAlign: 'center'}}>Gethsemane Parish Church</Typography>
          <Typography sx={{textAlign: 'center', marginBottom: {md: '1.55em'}, fontSize: {md: '14px', xs: '10px'} }}>Please login to your account</Typography>
          <form onSubmit={handleSubmit}>
              <TextField label="Username" name='username' variant="outlined" fullWidth onChange={handleChange} sx={{ marginBottom: '12px '}}/>
              <TextField label="Password" name='password' type="password" variant="outlined" fullWidth onChange={handleChange}/>
              <Button variant="contained" fullWidth sx={{backgroundColor: "#355173", marginTop: '12px'}} type='submit'>
                Login
              </Button>
          </form>
          <Typography sx={{textAlign: "center", marginTop: "16px"}}>Forgot Password?</Typography>
        </Paper>
      </Box>
    </div>
  )
}

export default Login;
