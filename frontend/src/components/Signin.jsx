import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link} from "react-router-dom"
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


const Signin =()=>{

const navigate=useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        const res = await axios.post("https://expensebackend-xksx.onrender.com/user/signin", formData);
        if (res.data.message) {
          alert(res.data.message)
        } else {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", JSON.stringify(res.data.userId));
          localStorage.setItem("isPremium",JSON.stringify(res.data.isPremium));
          alert(`Welcome back ${res.data.userName}`);
          navigate("/");
    
        }
    
  
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
            backgroundImage:'url(https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?w=740&t=st=1696162124~exp=1696162724~hmac=1f238f379ad27754dc4d912c8eb18276e3c0dfa94f7af3217ae3a6a52d4c0602)' , 
             backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{  border: "2px solid #22A699", borderRadius: "7px", backgroundColor: "#ECF8F9" }}>  
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
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} >
              <TextField
                margin="normal"
                required
                fullWidth
                type='email'
                label="Email Address"
                name="email"
                value={formData.email}
               onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={formData.password}
                label="Password"
                type="password"
                onChange={handleChange}
               
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
                  <Link to={"/forget-password"}  style={{color:"black",marginRight:"10px",textDecoration:"none",marginBottom:"10px"}} variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to={"/"} variant="body2"  style={{color:"black",marginRight:"10px",textDecoration:"none" ,marginBottom:"10px"}}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  
    </>
)

}
export default Signin;