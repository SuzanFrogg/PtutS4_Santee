import express from "express";
const router = express.Router();
import successController from "../controllers/success.controller.js";

router.get("/idSuccess", successController.getSuccess); //READ


export default router;