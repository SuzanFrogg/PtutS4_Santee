import express from "express";
const router = express.Router();
import successController from "../controllers/success.controller.js";

router.get("/", successController.getAllSuccess); //READ


export default router;