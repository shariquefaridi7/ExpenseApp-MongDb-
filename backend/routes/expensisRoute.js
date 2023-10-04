import express from "express";
import authen from "../middleware/authen.js";
import { addExpensis,getExpensis ,delExpensis ,updateExpensis,dayExpense,monthlyExpense,leaderBoard} from "../controllers/expensisController.js";

const router=express.Router();

router.post("/",authen,addExpensis);
router.get("/:userId",authen,getExpensis);
router.delete("/:userId/:id",authen,delExpensis);
router.put("/:userId/:id",authen,updateExpensis);
router.get("/dayExpense/:userId/:date",authen,dayExpense);
router.get("/monthlyExpense/:userId/:date",authen,monthlyExpense);


export  default router;