import astuceModel from "../models/astuce.model.js";
import mongoose from "mongoose";

/**
 * Permet d'obtenir les informations d'un sommeil 
 */
/*let getAllAstuce = async (req, res) => {

    if(!mongoose.isValidObjectId(req.param.idAstuce))
			return res.status(400).send("wrong id : " + req.param.idAstuce);

    const docs = await astuceModel.findOne(
        { "success._id": req.param.idAstuce }
    );
    if (docs) return res.status(200).json(docs);
    else return res.status(404).json({ error: "not found" });
    
};*/

/**
 * Permet d'obtenir une astuce aléatoire
 */
let getRandomAstuce = async (req, res) => {
    try {
        const tips = await astuceModel.aggregate( [ { $sample : { size : 1 } } ] );
        res.status(201).json(tips);
    }
    catch (err) {
        res.status(400).send({ error: err });
    }
};



export default {getRandomAstuce};