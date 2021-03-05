import express from "express";
const router = express.Router();
import sleepController from "../controllers/sleep.controller.js";

router.get("/", sleepController.getSleep); //READ
router.post('/', sleepController.createSleep); //CREATE
router.put("/:id", sleepController.updateSleep); //UPDATE
router.delete("/:id", sleepController.deleteSleep); //DELETE

export default router;