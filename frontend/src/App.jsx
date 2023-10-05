import Signin from "./components/Signin";
import Signup from "./components/Signup";
import ForgotPassword from "./components/forgot-password";
import Home from "./components/Home";
import {BrowserRouter ,Route,Routes} from "react-router-dom";
import ResetPassword from "./components/Reset_Password";
import Report from "./components/Report";
import Leaderborad from "./components/Leaderboard";
import NotFoundPage from "./components/NotFound";


const App=()=>{
  const token=localStorage.getItem("token");
  const isPremium=JSON.parse(localStorage.getItem("isPremium"));

  return (
    <>
    <BrowserRouter>
    <Routes>
 
    <Route path="/" element={token ? <Home /> : <Signup />} />
 
<Route path="/signin" element={<Signin/>}  />
<Route path="/forget-password" element={<ForgotPassword/>} />
<Route path="/reset-password/:id/:token" element={<ResetPassword/>} />
<Route path="/report" element={isPremium?<Report/>:<NotFoundPage/>} />
<Route path="/leaderboard" element={isPremium?<Leaderborad/>:<NotFoundPage/>} />
<Route  element={<NotFoundPage/>} />

    </Routes>
    
    
    </BrowserRouter>
     
    </>
  )
}

export default App;