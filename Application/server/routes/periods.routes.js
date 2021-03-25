import express from "express";
const router = express.Router();
import periodsController from "../controllers/periods.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

router.get("/", periodsController.getPeriods); //READ
router.post("/findDate", authMiddleware.checkUser, periodsController.getPeriodsDate); //READ
router.post('/', periodsController.createPeriods); //CREATE
router.put("/:periodsId", periodsController.updatePeriods); //UPDATE
router.put("/", periodsController.addPeriods); //UPDATE
router.delete("/:periodsId", periodsController.deletePeriods); //DELETE

export default router;