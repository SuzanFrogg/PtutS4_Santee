import express from "express";
const router = express.Router();
import weightController from "../controllers/weight.controller.js";

router.get("/",weightController.getWeight);
router.post("/",weightController.createWeight);
router.put("/:weightId",weightController.updateWeight);
router.put("/",weightController.addWeight);
router.delete("/:weightId",weightController.deleteWeight);

export default router;