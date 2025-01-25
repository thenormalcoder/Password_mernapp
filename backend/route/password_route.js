import express from 'express'
import { deletepass, getpasswords, passwords, updatepass } from '../controller/password_controller.js';
import { authenticate } from '../middleware/authorize.js';
const router=express.Router();
router.post("/password",authenticate,passwords)
router.get("/gpass",authenticate,getpasswords)
router.put("/update/:id",authenticate,updatepass)
router.delete("/delete/:id",authenticate,deletepass)
export default router;