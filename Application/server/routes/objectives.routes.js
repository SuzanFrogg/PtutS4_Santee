import express from "express";
const router = express.Router();
import objectivesController from "../controllers/objectives.controller.js";

router.get("/", objectivesController.getObjectivesAll); //READ
router.get("/:date", objectivesController.getObjectivesDate); //READ
router.post("/", objectivesController.createObjectives); //CREATE
router.put("/", objectivesController.updateObjectives); //UPDATE
router.delete("/", objectivesController.deleteObjectives); //DELETE


export default router;