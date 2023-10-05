import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import {useNavigate} from "react-router-dom"

import { createTheme, ThemeProvider } from '@mui/material/styles';

const ForgotPassword =()=>{


    const navigate=useNavigate();
    const [formData, setFormData] = useState('')
     
    
      const handleChange = (e) => {
          setFormData(e.target.value)
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formData);

        const res=await axios.post("https://expensebackend-xksx.onrender.com/user/forgot-password",{email:formData});
        console.log(res);
       alert("Check You Gmail...")


      };
    const defaultTheme = createTheme();
return(
    <>
    
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:'url(https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg?w=740&t=st=1696162221~exp=1696162821~hmac=4eb5f1c0cbc85f45789b6b4d60d623c5a03716c9c5a74797e7452125f739d109)' , 
             backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ border: "2px solid #22A699", borderRadius: "7px", backgroundColor: "#ECF8F9" }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      </Avatar>
            <Typography component="h1" variant="h5">
           Forgot Password
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                type='email'
                label="Email Address"
                name="email"
                value={formData}
               onChange={handleChange}
              />
         
        
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
               Send
              </Button>
            
            
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  
    </>
)

}
export default ForgotPassword;