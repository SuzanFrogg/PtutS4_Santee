import sleepModel from "../models/sleep.model.js";
import sleepNestedSchema from "../models/sleep.model.js";
import mongoose from "mongoose";

/**
 * Permet d'obtenir les informations d'un sommeil 
 */
let getSleep = async (req, res) => {
	sleepModel.find((err, docs) => {
		if(!err) res.send(docs);
		else console.log('Error to get data : ' + err);
	})
};

/**
 * Permet de créer une donnée de sleep
 */
let createSleep = async (req, res) => {
	let newSleep = new sleepModel({
		userId: req.body.userId,
		Sleep: {
			dateStart: req.body.dateStart,
			dateEnd: req.body.dateEnd
		}
	});

	try {
		const sleep = await newSleep.save();
		return res.status(201).json(sleep);
	}
	catch (err)
	{
		return res.status(400).send(err);
	}
};

/**
 * Permet de modifier les données de sleep
 */
 let updateSleep = async (req, res) => {
	try {
		//Vérifie les id
		if(!mongoose.isValidObjectId(req.params.sleepId))
			return res.status(400).json("wrong id : " + req.params.sleepId);
		if(!mongoose.isValidObjectId(req.body.userId))
			return res.status(400).json("wrong id : " + req.body.userId);

		const docs = await sleepModel.findOneAndUpdate(
			{ userId: req.body.userId, "Sleep._id": req.params.sleepId },
			{
				$set: {
					"Sleep.$.dateStart": req.body.dateStart,
					"Sleep.$.dateEnd": req.body.dateEnd
				}
			},
			{
				//Renvoie juste l'élément qui correspond (et pas toute la liste)
				projection: { Sleep: { $elemMatch: { _id: req.params.sleepId } } },
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
 * Permet d'ajouter une donnée dans sleep
 */
let addSleep = async (req, res) => {
	try {
		//Vérifie l'id
		if(!mongoose.isValidObjectId(req.body.userId))
			return res.status(400).send("wrong id : " + req.body.userId);

		const docs = await sleepModel.findOneAndUpdate(
			{ userId: req.body.userId },
			{
				$push: {
					Sleep: {
						dateStart: req.body.dateStart,
						dateEnd: req.body.dateEnd
					}
				}
			},
			{
				//Renvoie juste le dernier élément (et pas toute la liste)
				projection: { Sleep: {$slice: -1} },
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
 * Permet de supprimer une donnée de sleep
 */
let deleteSleep = (req, res) => {
	if(!mongoose.isValidObjectId(req.params.id))
		return res.status(400).send("wrong id : " + req.params.id);

	sleepModel.findOneAndUpdate(
		{ userId: req.body.userId, "Sleep._id": req.params.sleepId },
		{
			$pull: {
				Sleep: {
					_id: req.params.sleepId
				}
			}
		},
		{
			//Renvoie l'élément modifié
			new: true
		},
		(err, docs) => {
			if(!err) res.send(docs);
			else console.log("Delete error : " + err);
		}
	);
};

export default {getSleep, createSleep, updateSleep, addSleep, deleteSleep};