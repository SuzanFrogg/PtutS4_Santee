import express from "express";
const router = express.Router();
import donController from "../controllers/don.controller.js";

router.get("/", donController.getDon); //READ
router.post('/', donController.createDon); //CREATE
router.put("/updateSang/:donId", donController.updateDonSang); //UPDATE sang
router.put("/updatePlasma/:donId", donController.updateDonPlasma); //UPDATE plasma
router.put("/updatePlaquette/:donId", donController.updateDonPlaquette); //UPDATE plaquette
router.put("/addSang/", donController.addDonSang); //ADD sang 
router.put("/addPlasma/", donController.addDonPlasma); //ADD plasma
router.put("/addPlaquette/", donController.addDonPlaquette); //ADD plaquette
router.delete("/deleteSang/:donId", donController.deleteDonSang); //DELETE sang
router.delete("/deletePlasma:donId", donController.deleteDonPlasma); //DELETE plasma
router.delete("/deletePlaquette/:donId", donController.deleteDonPlaquette); //DELETE plaquette

export default router;