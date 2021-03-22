import express from "express";
const router = express.Router();
import allergyController from "../controllers/allergy.controller.js";

router.get("/", allergyController.getAllergies); //READ
router.post("/", allergyController.createAllergies); //CREATE
router.put("/all", allergyController.updateAllAllergies); //UPDATE
router.put("/:allergyId", allergyController.updateAllergies); //UPDATE
router.put("/", allergyController.addAllergies); //UPDATE
router.delete("/:allergyId", allergyController.deleteAllergies); //DELETE

export default router;