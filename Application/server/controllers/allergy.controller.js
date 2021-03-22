import allergyModel from "../models/allergy.model.js";
import mongoose from "mongoose";

/**
 * Permet d'obtenir les informations d'allergy
 */
let getAllergies = async (req, res) => {
	if (req.user._id) {
		allergyModel.findOne(
			{ userId: req.user._id },
			(err, docs) => {
				if(!err) res.send(docs);
				else console.log('Error to get data : ' + err);
			}
		);
	}
	else {
		res.status(400).send("no user");
	}
};

/**
 * Permet de créer une donnée d'allergy 
 */
let createAllergies = async (req, res) => {
    let newAllergy= new allergyModel({
        userId: req.body.userId,
        allergies: {
            toAvoid: req.body.toAvoid,
        }
    });

    try {
        const allergy = await newAllergy.save();
        return res.status(201).json(allergy);
    }
    catch (err) {
        return res.status(400).send(err);
    }
};

/**
 * Permet de modifier l'ensemble de la liste des allergies
 */
 let updateAllAllergies = async (req, res) => {
	try {
		if(!mongoose.isValidObjectId(req.user._id))
			return res.status(400).json("wrong id : " + req.user._id);

		const docs = await allergyModel.findOneAndUpdate(
			{ userId: req.user._id },
			{
				$set: {
					"allergies": req.body.allergies
				}
			},
			{new: true}
		);
		if (docs) return res.status(200).json(docs);
		else return res.status(404).json({ error: "not found" });
	}
	catch (err) {
		return res.status(500).json({ error: err });
	}
};

/**
 * Permet de modifier une donnée de la liste d'allergies
 */
 let updateAllergies = async (req, res) => {
	try {
		//Vérifie les id
		if(!mongoose.isValidObjectId(req.params.allergyId))
			return res.status(400).json("wrong id : " + req.params.allergyId);
		if(!mongoose.isValidObjectId(req.user._id))
			return res.status(400).json("wrong id : " + req.user._id);

		const docs = await allergyModel.findOneAndUpdate(
			{ userId: req.user._id, "allergies._id": req.params.allergyId },
			{
				$set: {
					"allergies.$.toAvoid": req.body.toAvoid,
				}
			},
			{
				//Renvoie juste l'élément qui correspond (et pas toute la liste)
				projection: { allergies: { $elemMatch: { _id: req.params.allergyId } } },
				//Renvoie l'élément modifié
				new: true
			}
		);
		if (docs) return res.status(200).json(docs);
		else return res.status(404).json({ error: "not found" });
	}
	catch (err) {
		return res.status(500).json({ error: err });
	}
};


//ajioute une allergie au tableau
let addAllergies = async (req, res) => {
	try {
		//Vérifie l'id
		if(!mongoose.isValidObjectId(req.body.userId))
			return res.status(400).send("wrong id : " + req.body.userId);

		const docs = await allergyModel.findOneAndUpdate(
			{ userId: req.body.userId },
			{
				$push: 
				{
					allergies: 
					{
						toAvoid: req.body.toAvoid,
					}
				}
			},
			{
				//Renvoie juste le dernier élément (et pas toute la liste)
				projection: { allergies: {$slice: -1} },
				//Renvoie l'élément modifié
				new: true
			}
		);
		if (docs) return res.status(200).json(docs);
		else return res.status(404).json({ error: "not found" });
	}
	catch (err) {
		return res.status(500).json({ error: err });
	}
};


/**
 * Permet de supprimer une donnée d'allergy
 */
 let deleteAllergies = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.allergyId))
            return res.status(400).send("wrong id : " + req.params.allergyId);

        const docs = await allergyModel.findOneAndUpdate(
            { userId: req.body.userId, "allergies._id": req.params.allergyId },
            {
                $pull: {
                    allergies: {
                        _id: req.params.allergyId
                    }
                }
            },
            {
                //Renvoie l'élément modifié
                new: true
            }
        );
        if (docs) return res.status(200).json(docs);
        else return res.status(404).json({ error: "not found" });
    }
    catch (err) {
        return res.status(500).json({ error: err });
		//console.log(err);
    }
};

export default {getAllergies, createAllergies, updateAllAllergies, updateAllergies, addAllergies, deleteAllergies};