import express from "express";
const router = express.Router();
import donController from "../controllers/don.controller.js";

router.get("/", donController.getDon); //READ
router.post('/', donController.createDon); //CREATE
router.put("/:donId", donController.updateDon); //UPDATE
router.put("/", donController.addDon); //UPDATE
router.delete("/:donId", donController.deleteDon); //DELETE

export default router;