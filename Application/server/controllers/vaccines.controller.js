import vaccinesModel from "../models/vaccines.model.js";
import mongoose from "mongoose";

/**
 * Permet d'obtenir les informations d'un vaccin 
 */
let getVaccines = async (req, res) => {
	if (req.user._id) {
		vaccinesModel.findOne(
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
 * Permet de créer une donnée de vaccin
 */
let createVaccines = async (req, res) => {
    let newVaccines = new vaccinesModel({
        userId: req.body.userId,
        vaccines: {
            name: req.body.name,
            possibleStartAge: req.body.possibleStartAge,
            possibleEndAge: req.body.possibleEndAge,
            doseNeeded: req.body.doseNeeded,
            doseMade: req.body.doseMade
        }
    });

    try {
        const vaccines = await newVaccines.save();
        return res.status(201).json(vaccines);
    }
    catch (err) {
        return res.status(400).send(err);
    }
};

/**
 * Permet de modifier les données de vaccin
 */
 let updateVaccines = async (req, res) => {
	try {
		//Vérifie les id
		if(!mongoose.isValidObjectId(req.params.vaccinesId))
			return res.status(400).json("wrong id : " + req.params.vaccinesId);
		if(!mongoose.isValidObjectId(req.body.userId))
			return res.status(400).json("wrong id : " + req.body.userId);

		const docs = await vaccinesModel.findOneAndUpdate(
			{ userId: req.body.userId, "vaccines._id": req.params.vaccinesId },
			{
				$set: {
					"vaccines.$.name": req.body.name,
                    "vaccines.$.possibleStartAge": req.body.possibleStartAge,
                    "vaccines.$.possibleEndAge": req.body.possibleEndAge,
                    "vaccines.$.doseNeeded": req.body.doseNeeded,
                    "vaccines.$.doseMade": req.body.doseMade
					
				}
			},
			{
				//Renvoie juste l'élément qui correspond (et pas toute la liste)
				projection: { vaccines: { $elemMatch: { _id: req.params.vaccinesId } } },
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

let addVaccines = async (req, res) => {
	try {
		//Vérifie l'id
		if(!mongoose.isValidObjectId(req.body.userId))
			return res.status(400).send("wrong id : " + req.body.userId);

		const docs = await vaccinesModel.findOneAndUpdate(
			{ userId: req.body.userId },
			{
				$push: 
				{
					vaccines: 
					{
						name: req.body.name,
						possibleStartAge: req.body.possibleStartAge,
						possibleEndAge: req.body.possibleEndAge,
						doseNeeded: req.body.doseNeeded,
						doseMade: req.body.doseMade
					}
				}
			},
			{
				//Renvoie juste le dernier élément (et pas toute la liste)
				projection: { vaccines: {$slice: -1} },
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
 * Permet de supprimer une donnée de vaccin
 */
 let deleteVaccines = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.vaccinesId))
            return res.status(400).send("wrong id : " + req.params.vaccinesId);

        const docs = await vaccinesModel.findOneAndUpdate(
            { userId: req.body.userId, "vaccines._id": req.params.vaccinesId },
            {
                $pull: {
                    vaccines: {
                        _id: req.params.vaccinesId
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

export default {getVaccines, createVaccines, updateVaccines,addVaccines, deleteVaccines};