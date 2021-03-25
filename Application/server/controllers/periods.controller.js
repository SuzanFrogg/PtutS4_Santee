import periodsModel from "../models/periods.model.js";
import mongoose from "mongoose";

/**
 * Permet d'obtenir les informations d'un cycle 
 */
 let getPeriods = async (req, res) => {
	if (req.user._id) {
		periodsModel.findOne(
			{ userId: req.user._id },
			(err, docs) => {
				if(!err) res.status(201).json(docs);
				else res.status(404).json({ errors: err });
			}
		);
	}
	else {
		res.status(400).send("no user");
	}
};

/**
 * Permet d'obtenir les informations d'un cycle en fonction de deux dates
 */
let getPeriodsDate = async (req, res) => {
	if (req.user._id) {
		const periods = await periodsModel.aggregate(
			[
				{$match: { //On récupère le document correspondant à l'id de l'utilisateur
					userId: req.user._id
				}},
				{$unwind: "$periods"},
				{$unset: "_id"}, //Enlève le champs id
				{$unset: "userId"}, //Enlève le champs userId
				{$match: {
					$or: [
						{"periods.dateStart": {$gte: new Date(req.body.dateStart), $lte: new Date(req.body.dateEnd)}},
						{"periods.dateEnd": {$gte: new Date(req.body.dateStart), $lte: new Date(req.body.dateEnd)}}
					]
				}},
				{$replaceRoot: {newRoot: "$periods"}}
			]
		)
		res.status(201).json(periods);
	}
	else {
		res.status(400).send("no user");
	}
};

/**
 * Permet de créer une donnée d'un cycle
 */
let createPeriods = async (req, res) => {
	let newPeriods = new periodsModel({
		userId: req.body.userId,
		periods: []
	});

	try {
		const periods = await newPeriods.save();
		return res.status(201).json(periods);
	}
	catch (err)
	{
		return res.status(400).send(err);
	}
};

/**
 * Permet de modifier les données d'un cycle
 */
let updatePeriods = async (req, res) => {
	try {
		//Vérifie les id
		if(!mongoose.isValidObjectId(req.params.periodsId))
			return res.status(400).json("wrong id : " + req.params.periodsId);
		if(!mongoose.isValidObjectId(req.body.userId))
			return res.status(400).json("wrong id : " + req.body.userId);

		const docs = await periodsModel.findOneAndUpdate(
			{ userId: req.user._id, "periods._id": req.params.periodsId },
			{
				$set: {
					"periods.$.dateStart": req.body.dateStart,
					"periods.$.dateEnd": req.body.dateEnd,
					"periods.$.flux": req.body.flux
				}
			},
			{
				//Renvoie juste l'élément qui correspond (et pas toute la liste)
				projection: { periods: { $elemMatch: { _id: req.params.periodsId } } },
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
 * Permet d'ajouter une donnée d'un cycle
 */
let addPeriods = async (req, res) => {
	try {
        //Vérifie que l'id est le bon
		if(!mongoose.isValidObjectId(req.body.userId))
			return res.status(400).send("wrong id : " + req.body.userId);

		const docs = await periodsModel.findOneAndUpdate(
			{ userId: req.user._id },
			{
				$push: {
					periods: {
                        dateStart: req.body.dateStart,
                        dateEnd: req.body.dateEnd,
                        flux: req.body.flux
					}
				}
			},
			{
				//Renvoie juste le dernier élément
				projection: { periods: {$slice: -1} },
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
 * Permet de supprimer une donnée d'un cycle
 */
let deletePeriods = (req, res) => {
    //Vérifie que l'id est le bon
	if(!mongoose.isValidObjectId(req.params.id))
		return res.status(400).send("wrong id : " + req.params.id);

	sleepModel.findOneAndUpdate(
		{ userId: req.user._id, "Periods._id": req.params.periodsId },
		{
			$pull: {
				periods: {
					_id: req.params.periodsId
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

export default {getPeriods, getPeriodsDate, createPeriods, updatePeriods, addPeriods, deletePeriods};