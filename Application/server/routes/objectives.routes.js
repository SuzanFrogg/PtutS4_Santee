import express from "express";
const router = express.Router();
import objectivesController from "../controllers/objectives.controller.js";

router.get("/", objectivesController.getObjectivesAll); //READ
router.post("/findDate", objectivesController.getObjectivesDate); //READ
router.post("/", objectivesController.createObjectives); //CREATE
router.put("/:objectivesId", objectivesController.updateObjectives); //UPDATE
router.put("/", objectivesController.addObjectives); //add
router.delete("/:objectivesId", objectivesController.deleteObjectives); //DELETE


export default router;