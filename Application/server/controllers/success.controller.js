import successModel from "../models/success.model.js";
import mongoose from "mongoose";

/**
 * Permet d'obtenir les informations d'un succes
 */
let getSuccess = async (req, res) => {

    if(!mongoose.isValidObjectId(req.param.idSuccess))
			return res.status(400).send("wrong id : " + req.param.idSuccess);


    const docs = await successModel.findOne(
        { "success._id": req.param.idSuccess }
    );
    if (docs) return res.status(200).json(docs);
    else return res.status(404).json({ error: "not found" });

};



export default {getSuccess};