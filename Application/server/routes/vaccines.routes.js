import express from "express";
const router = express.Router();
import vaccinesController from "../controllers/vaccines.controller.js";

router.get("/", vaccinesController.getVaccines); //READ
router.post("/", vaccinesController.createVaccines); //CREATE
router.put("/all", vaccinesController.updateAllVaccines); //UPDATE
router.put("/:vaccinesId", vaccinesController.updateVaccines); //UPDATE
router.put("/", vaccinesController.addVaccines); //UPDATE
router.delete("/:vaccinesId", vaccinesController.deleteVaccines); //DELETE

export default router;