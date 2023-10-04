import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userData } from "../models/userModel.js";
import  nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();



export const signupData=async(req,res)=>{

   const {username,email,password}=req.body;
   
    // check user is exist or not.

    const userCheck= await userData.findOne({where:{email}});

    if(userCheck){
        return res.json({message:"User Already Exist"});
    }else{

    // hash the password for safety.

    const hashPassword=await bcrypt.hash(password,12);

    // generate token for authentication

    const token=jwt.sign({email},process.env.SECRET,{expiresIn:"7d"});

    const resp=await userData.create({username,password:hashPassword,email,isPremium:false});

    res.status(200).send({resp,token});
    }

}

export const signinData=async(req,res)=>{

    const {email,password} =req.body;
    const resp=await userData.findOne({where:{email}});
    const hashPassword=resp.dataValues.password;
    const checkPassword=await bcrypt.compare(password,hashPassword);
    const userId=resp.dataValues.id;
    const userName=resp.dataValues.username;
    const isPremium=resp.dataValues.isPremium;
    if(checkPassword){
      
    // generate token for authentication

      const token=jwt.sign({email},process.env.SECRET,{expiresIn:"7d"});

      res.status(200).send({token,userId,userName,isPremium})

 
    }else{
        return res.json({message:"Email or Password are not matched"});
    }


}


export const ForgotPass=async(req,res)=>{
  
     const {email}=req.body;

     const resp=await userData.findOne({where:{email}});
     const userId=resp.dataValues.id;
     if(!resp){
        return res.json({message:"There is no email like this"});
     }

     const token=jwt.sign({email},process.env.SECRET,{expiresIn:"7d"});

     var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER,
          pass: process.env.PASSWORD
        }
      });
      
      var mailOptions = {
        from: process.env.USER,
        to: email,
        subject: 'Reset Password',
        text: `http://127.0.0.1:5173/reset-password/${userId}/${token}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
         res.send({message:"success"})
        }
      });
      


}

export const ResetPass=async(req,res)=>{

    const {id}=req.params;
    const {password} =req.body;

    const hashPassword=await bcrypt.hash(password,12);

    const resp=await userData.update({password:hashPassword},{where:{id}});
    res.send({message:"Success"})
   

}

export const updateUser=async(req,res)=>{

  const id =req.params.userId;

  const resp =await userData.update({isPremium:true},{where:{id}});

   res.status(200).send("update");



}