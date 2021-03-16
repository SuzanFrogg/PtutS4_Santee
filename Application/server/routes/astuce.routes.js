import express from "express";
const router = express.Router();
import astuceController from "../controllers/astuce.controller.js";

router.get("/", astuceController.getAllAstuce); //READ
router.get("/idAstuce", astuceController.getRandomAstuce); //READ

export default router;