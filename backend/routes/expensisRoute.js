import express from "express";
import authen from "../middleware/authen.js";
import { addExpensis,getExpensis ,delExpensis ,updateExpensis} from "../controllers/expensisController.js";

const router=express.Router();

router.post("/",authen,addExpensis);
router.get("/:userId",authen,getExpensis);
router.delete("/:userId/:id",authen,delExpensis);
router.put("/:userId/:id",authen,updateExpensis)

export  default router;