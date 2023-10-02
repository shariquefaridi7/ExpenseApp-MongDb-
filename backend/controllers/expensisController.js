import { expensis } from "../models/expensisModel.js";

export const addExpensis=async(req,res)=>{

    const {category,description,amount,userId} =req.body;

      await expensis.create({category,description,amount,userId});
      res.send("success")

}

export const getExpensis=async(req,res)=>{

 const {userId} =req.params;

 const resp=await expensis.findAll({where:{userId}});

 res.status(200).send(resp);

}

export const delExpensis=async(req,res)=>{

try {
    const {userId,id}=req.params;
   
    await expensis.destroy({where:{userId,id}});
     res.status(200).send("Delete Success")
   
} catch (error) {
    console.log(error)
}

}


export const updateExpensis=async(req,res)=>{
    try {
        const {userId,id}=req.params;
        const {amount,description,category} =req.body;
   
        await expensis.update({amount,description,category},{where:{userId,id}});
         res.status(200).send("Edit Success")
       

    } catch (err) {
        console.log(err)
    }
}