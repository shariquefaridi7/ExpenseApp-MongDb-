import express from 'express';
import authen from "../middleware/authen.js";
import {leaderBoard} from "../controllers/expensisController.js"
const router=express.Router();

router.get("/",authen,leaderBoard);

export default router;