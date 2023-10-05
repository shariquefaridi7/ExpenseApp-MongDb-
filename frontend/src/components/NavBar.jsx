import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import {Link,useNavigate} from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import {toast} from 'react-toastify'



function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate=useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    console.log(anchorElNav)
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const isPremium=JSON.parse(localStorage.getItem("isPremium"));
 const handleLeader =()=>{
     if(isPremium){
       navigate("/leaderboard")
     }else{
      alert("Please First Buy Premium Membership")
     }
 }

 const handleReport =()=>{
  if(isPremium){
    navigate("/report")
  }else{
   alert("Please First Buy Premium Membership")
  }
}



const handleSubmit=async()=>{

  const token = localStorage.getItem("token");
  const userId = JSON.parse(localStorage.getItem("userId")); 
 

if(!isPremium){
  try {
    const response = await axios.post('https://expensebackend-xksx.onrender.com/premium/',{userId},{ headers: { authentication: `Bearer ${token}` } });
      const res = response.data;
       
 
       if (res.success) {
        
         const options = {
           key: `${res.key_id}`,
           amount: `${res.amount}`,
           currency: 'INR',
           name: `${res.product_name}`,
          
           image: 'https://dummyimage.com/600x400/000/fff',
           order_id: `${res.order_id}`,
           handler: async function (response) {
         
             toast("Payment Successfully....");
              localStorage.setItem("isValid","yes");
              try {
                alert("Congrats Now You are a Premium Member");
                
                 const resp = await axios.put(`https://expensebackend-xksx.onrender.com/user/${userId}`);
                   console.log(resp)
                   localStorage.setItem("isPremium",JSON.stringify(true));
                
                
              } catch (error) {
                 console.log(error)
              }
           
          
           },
           prefill: {
             contact: `${res.contact}`,
             name: `${res.name}`,
             email: `${res.email}`,
           },
        
           theme: {
             color: '#2300a3',
           },
         };
         const razorpayObject = new window.Razorpay(options);
           razorpayObject.on('payment.failed', function (response) {
           toast("Failed...");
         });
         razorpayObject.open();
       } else {
         toast("Payment Successfully....");
        
       }
       
     } catch (error) {
       console.error('Error:', error.message);
     }
    }else{
      alert(" You Takken Premium MemeberShip ")
    }
   


}


  return (
    <AppBar position="static"  style={{  border: "2px solid #22A699", borderRadius: "7px", backgroundColor: "#22A699" ,padding:"3px"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
     
       
            <Avatar src='https://icon-library.com/images/expenses-icon/expenses-icon-20.jpg'  sx={{ width: 52 ,height: 52 ,marginRight:"10px"}} />
         <Link to={"/"} style={{ display: {md: 'flex' },
              fontFamily: 'monospace',
             fontSize:"25px",
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',}}>Expense</Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
             
                <MenuItem >
                <Link to={"/"} style={{color:"black",marginLeft:"10px",textDecoration:"none"}} >Home</Link>
                </MenuItem>
                <MenuItem>
                <Button style={{color:"black",}} onClick={handleReport}>Report</Button>
                </MenuItem>
                <MenuItem>
                <Button style={{color:"black",}} onClick={handleLeader}>Leaderboard</Button>
             </MenuItem>
            
             <Button style={{color:"black",marginLeft:"15px"}} onClick={handleSubmit}>Premium</Button>
             <MenuItem>
             <Link to={"/signin"} style={{color:"black",marginLeft:"9px",textDecoration:"none"}} onClick={()=>localStorage.removeItem("token")}>LogOut</Link>
                 
             </MenuItem>
            </Menu>
          </Box>
        
         
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
           
              <Button
               
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to={"/"} style={{color:"white",marginRight:"50px",marginLeft:"20px",textDecoration:"none"}} >Home</Link>
                <Button style={{color:"white",marginRight:"50px",marginLeft:"20px"}} onClick={handleReport}>Report</Button>
                <Button style={{color:"white",marginRight:"50px",marginLeft:"20px"}} onClick={handleLeader}>Leaderboard</Button>
                   <Link to={"/signin"} style={{color:"white",marginLeft:"300px",textDecoration:"none"}} onClick={()=>localStorage.removeItem("token")}>LogOut</Link>
            
                     </Button>
              <Button style={{color:"white",marginLeft:"30px"}} onClick={handleSubmit}>Premium</Button>
              
          </Box>

      
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;