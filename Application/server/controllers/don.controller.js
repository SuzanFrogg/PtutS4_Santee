import donModel from "../models/don.model.js";
import mongoose from "mongoose";

/**
 * Permet d'obtenir les informations d'un don 
 */
let getDon = async (req, res) => {
	donModel.find((err, docs) => {
        if(!err) res.send(docs);
        else console.log('Error to get data : ' + err);
    })
};

/**
 * Permet de créer une donnée de don
 */
let createDon = async (req, res) => {
	let newDon = new donModel({
		userId: req.body.userId,
		Don: {
			typeDon: req.body.typeDon,
			dateDon: req.body.dateDon,
            nbDonSang: req.body.nbDonSang,
            nbDonPlasma: req.body.nbDonPlasma,
            nbDonPlaquette: req.body.nbDonPlaquette,
            nbPersonneSauve: req.body.nbPersonneSauve
		}
	});

	try {
		const don = await newDon.save();
		return res.status(201).json(don);
	}
	catch (err)
	{
		return res.status(400).send(err);
	}
};

/**
 * Permet de modifier les données de don
 */
let updateDon = async (req, res) => {
	try {
		//Vérifie les id
		if(!mongoose.isValidObjectId(req.params.donId))
			return res.status(400).json("wrong id : " + req.params.donId);
		if(!mongoose.isValidObjectId(req.body.userId))
			return res.status(400).json("wrong id : " + req.body.userId);

		const docs = await donModel.findOneAndUpdate(
			{ userId: req.body.userId, "don._id": req.params.donId },
			{
				$set: {
					"Don.$.typeDon": req.body.typeDon,
					"Don.$.dateDon": req.body.dateDon,
					"Don.$.nbDonSang": req.body.nbDonSang,
					"Don.$.nbDonPlasma": req.body.nbDonPlasma,
					"Don.$.nbDonPlaquette": req.body.nbDonPlaquette,
					"Don.$.nbPersonneSauve": req.body.nbPersonneSauve
				}
			},
			{
				//Renvoie juste l'élément qui correspond (et pas toute la liste)
				projection: { Don: { $elemMatch: { _id: req.params.donId } } },
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
 * Permet d'ajouter une donnée dans don
 */
let addDon = async (req, res) => {
	try {
        //Vérifie que l'id est le bon
		if(!mongoose.isValidObjectId(req.body.userId))
			return res.status(400).send("wrong id : " + req.body.userId);

		const docs = await donModel.findOneAndUpdate(
			{ userId: req.body.userId },
			{
				$push: {
					don: {
                        typeDon: req.body.typeDon,
                        dateDon: req.body.dateDon,
                        nbDonSang: req.body.nbDonSang,
                        nbDonPlasma: req.body.nbDonPlasma,
                        nbDonPlaquette: req.body.nbDonPlaquette,
                        nbPersonneSauve: req.body.nbPersonneSauve
					}
				}
			},
			{
				//Renvoie juste le dernier élément
				projection: { Don: {$slice: -1} },
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
 * Permet de supprimer une donnée de don
 */
let deleteDon = (req, res) => {
    //Vérifie que l'id est le bon
	if(!mongoose.isValidObjectId(req.params.id))
		return res.status(400).send("wrong id : " + req.params.id);

	sleepModel.findOneAndUpdate(
		{ userId: req.body.userId, "Don._id": req.params.donId },
		{
			$pull: {
				Don: {
					_id: req.params.donId
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

export default {getDon, createDon, updateDon, addDon, deleteDon};