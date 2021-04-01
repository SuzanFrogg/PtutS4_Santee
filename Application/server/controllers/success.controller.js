import successModel from "../models/success.model.js";
import mongoose from "mongoose";

/**
 * Permet d'obtenir les informations d'un succes
 */
 let getAllSuccess = async (req, res) => {
    const succes = await successModel.find();
    res.status(200).json(succes);
}



export default {getAllSuccess};