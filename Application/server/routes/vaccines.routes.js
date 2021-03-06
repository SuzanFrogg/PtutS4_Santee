import express from "express";
const router = express.Router();
import vaccinesController from "../controllers/vaccines.controller.js";

router.get("/", vaccinesController.getVaccines); //READ
router.post('/', vaccinesController.createVaccines); //CREATE
router.put("/:id", vaccinesController.updateVaccines); //UPDATE
router.delete("/:id", vaccinesController.deleteVaccines); //DELETE

export default router;