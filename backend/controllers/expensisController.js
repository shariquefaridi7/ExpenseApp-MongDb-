import { expensis } from "../models/expensisModel.js";
import { userData } from "../models/userModel.js";

export const addExpensis=async(req,res)=>{

    const {category,description,amount,userId,date,month} =req.body;

      await expensis.create({category,description,amount,date,userId,month});
      res.send("success")

}

export const getExpensis=async(req,res)=>{

 const {userId} =req.params;
 const page=parseInt(req.query.page)||1;
 const limit=parseInt(req.query.limit)||10;

 const offset=(page-1)*limit;



 const resp=await expensis.findAll({where:{userId},offset,limit });
 const count=await expensis.count({where:{userId}});


 res.status(200).send({resp,count});

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

export const dayExpense=async(req,res)=>{

  const {userId,date} = req.params;
  console.log(userId,date)
  const resp=await expensis.findAll({where:{userId,date}});

  res.status(200).send(resp)

}

export const monthlyExpense=async(req,res)=>{
    const {userId,date} = req.params;
   const month=date;
    const resp=await expensis.findAll({where:{userId,month}});
   
    res.status(200).send(resp)

}

export const leaderBoard=async(req,res)=>{
    try {
       
        const resp = await userData.findAll({
          attributes: ['id', 'username'],
          include: [
            {
              model: expensis, // Corrected model name
              attributes: ['amount'],
            },
          ],
        });
    
      
        const formattedData = resp.map((user) => {
            const formattedUser = user.toJSON(); // Convert the Sequelize object to a plain JavaScript object
      
            // Calculate total expenses for the user
        
            formattedUser.totalExpenses = user.expensisLists.reduce(
              (total, expensisLists) => total + expensisLists.amount,
              0
            );
      
            // Remove the 'Expenses' property
            delete formattedUser.expensisLists;
      
            return formattedUser;
          });
   
        res.send(formattedData);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
}