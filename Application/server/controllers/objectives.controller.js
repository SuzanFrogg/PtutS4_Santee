import objectivesModel from "../models/objectives.model.js";
import mongoose from "mongoose";


/**
 * Permet d'obtenir les informations d'un objectives
 */
 let getObjectivesAll = async (req, res) => {

    if (req.user._id) {
		objectivesModel.findOne(
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
 * Permet d'obtenir les informations d'un objectives  a partir d'une date
 */
let getObjectivesDate = async (req, res) => {
	if (req.user._id) {
		const objectif = await objectivesModel.aggregate(
			[
				{$match: { //On récupère le document correspondant à l'id de l'utilisateur
					userId: req.user._id
				}},
				{$unwind: "$objectives"},
				{$unset: "_id"}, //Enlève le champs id
				{$unset: "userId"}, //Enlève le champs userId
				{$match:
					{"objectives.dateEnd": {$gte: new Date(req.body.dateStart), $lte: new Date(req.body.dateEnd)}}
				},
				{$replaceRoot: {newRoot: "$objectives"}}
			]
		)
		res.status(201).json(objectif);
	}
	else {
		res.status(400).send("no user");
	}
   
};


/**
 * Permet de créer une donnée d'un calendrier
 */
let createObjectives = async (req, res) => {
   let newObjectif = new objectivesModel({
        userId: req.body.userId,
        objectives: []
    });

    try {
        const obj = await newObjectif.save();
        return res.status(201).json(obj);
    }
    catch (err) {
        return res.status(400).send(err);
    }

};

/**
 * Permet de modifier les données d'un objectif
 */
let updateObjectives = async (req, res) => {

	try {
		//Vérifie les id
		if(!mongoose.isValidObjectId(req.params.objectivesId))
			return res.status(400).json("wrong id : " + req.params.objectivesId);
		if(!mongoose.isValidObjectId(req.body.userId))
			return res.status(400).json("wrong id : " + req.body.userId);

		const docs = await objectivesModel.findOneAndUpdate(
			{ userId: req.body.userId, "objectives._id": req.params.objectivesId },
			{
				$set: {
					"objectives.$.obj": req.body.obj,
                    "objectives.$.isDone": req.body.isDone,
                    "objectives.$.dateEnd": req.body.dateEnd
					
				}
			},
			{
				//Renvoie juste l'élément qui correspond (et pas toute la liste)
				projection: { objectives: { $elemMatch: { _id: req.params.objectivesId } } },
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

let addObjectives = async (req, res) => {
	try {
		//Vérifie l'id
		if(!mongoose.isValidObjectId(req.body.userId))
			return res.status(400).send("wrong id : " + req.body.userId);

		const docs = await objectivesModel.findOneAndUpdate(
			{ userId: req.body.userId },
			{
				$push: 
				{
					objectives : 
					{
						obj : req.body.obj,
						isDone : req.body.isDone,
						dateEnd : req.body.dateEnd
					}
				}
			},
			{
				//Renvoie juste le dernier élément (et pas toute la liste)
				projection: { objectives: {$slice: -1} },
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
 * Permet de supprimer une donnée d'un calendrier
 */
let deleteObjectives = async(req, res) => {
	try {
		if(!mongoose.isValidObjectId(req.params.objectivesId))
			return res.status(400).send("wrong id : " + req.params.objectivesId);

        const docs = await objectivesModel.findOneAndUpdate(
            { userId: req.user._id, "objectives._id": req.params.objectivesId },
            {
                $pull: {
                    objectives: {
                        _id: req.params.objectivesId
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
    }

};

export default {getObjectivesAll, getObjectivesDate, createObjectives, updateObjectives, addObjectives, deleteObjectives};