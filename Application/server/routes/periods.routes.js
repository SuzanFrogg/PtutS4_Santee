import express from "express";
const router = express.Router();
import periodsController from "../controllers/periods.controller.js";

router.get("/", periodsController.getPeriods); //READ
router.post("/findDate", periodsController.getPeriodsDate); //READ
router.post('/', periodsController.createPeriods); //CREATE
router.put("/:periodsId", periodsController.updatePeriods); //UPDATE
router.put("/", periodsController.addPeriods); //UPDATE
router.delete("/:periodsId", periodsController.deletePeriods); //DELETE

export default router;