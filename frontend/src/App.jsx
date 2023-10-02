import Signin from "./components/Signin";
import Signup from "./components/Signup";
import ForgotPassword from "./components/forgot-password";
import Home from "./components/Home";
import {BrowserRouter ,Route,Routes} from "react-router-dom";
import ResetPassword from "./components/Reset_Password";


const App=()=>{
  return (
    <>
    <BrowserRouter>
    <Routes>
<Route path="/" element={<Signup/>}  />
<Route path="/signin" element={<Signin/>}  />
<Route path="/forget-password" element={<ForgotPassword/>} />
<Route path="/home" element={<Home/>} />
<Route path="/reset-password/:id/:token" element={<ResetPassword/>} />

    </Routes>
    
    
    </BrowserRouter>
     
    </>
  )
}

export default App;