import express from "express";
const router = express.Router();
import sleepController from "../controllers/sleep.controller.js";

router.get("/", sleepController.getSleep); //READ
router.post('/', sleepController.createSleep); //CREATE
router.put("/:sleepId", sleepController.updateSleep); //UPDATE
router.put("/", sleepController.addSleep); //UPDATE
router.delete("/:sleepId", sleepController.deleteSleep); //DELETE

export default router;