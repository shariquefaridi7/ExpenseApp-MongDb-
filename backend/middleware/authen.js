import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();


const authen = async (req, res, next) => {
   try {
         
     let token = req.headers.authentication.split(" ")[1];
     let isCustomAuth = token.length < 500;
 
     let decodedData;
 
     if (token && isCustomAuth) {      
       decodedData = jwt.verify(token, process.env.SECRET);
 
       req.userId = decodedData?.id;
     } else {
       decodedData = jwt.decode(token);
 
       req.userId = decodedData?.sub;
     }    
 
     next();
   } catch (error) {
    
     res.send({message:"invalid request..."})
   }
 };
 
 export default authen;