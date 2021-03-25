import donModel from "../models/don.model.js";
import mongoose from "mongoose";

/**
 * Permet d'obtenir les informations d'un don 
 */
let getDon = async (req, res) => {
	if (req.user._id) {
		donModel.findOne(
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
 * Permet de créer une donnée de don
 */
let createDon = async (req, res) => {
	let newDon = new donModel({
		userId: req.body.userId,
		DonsSang: [],
		DonsPlasma: [],
		DonsPlaquette: []
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
 * Permet de modifier les données de don de sang
 */
let updateDonSang = async (req, res) => {
	try {
		//Vérifie les id
		if(!mongoose.isValidObjectId(req.params.donId))
			return res.status(400).json("wrong id : " + req.params.donId);
		if(!mongoose.isValidObjectId(req.user._id))
			return res.status(400).json("wrong id : " + req.user._id);

		const docs = await donModel.findOneAndUpdate(
			{ userId: req.user._id, "DonsSang._id": req.params.donId },
			{
				$set: {
					"DonsSang.$.dateDon": req.body.dateDon
				}
			},
			{
				//Renvoie juste l'élément qui correspond (et pas toute la liste)
				projection: { 
					DonsSang: { $elemMatch: { _id: req.params.donId } }
				},
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
 * Permet de modifier les données de don de plasma
 */
 let updateDonPlasma = async (req, res) => {
	try {
		//Vérifie les id
		if(!mongoose.isValidObjectId(req.params.donId))
			return res.status(400).json("wrong id : " + req.params.donId);
		if(!mongoose.isValidObjectId(req.user._id))
			return res.status(400).json("wrong id : " + req.user._id);

		const docs = await donModel.findOneAndUpdate(
			{ userId: req.user._id, "DonsPlasma._id": req.params.donId },
			{
				$set: {
					"DonsPlasma.$.dateDon": req.body.dateDon
				}
			},
			{
				//Renvoie juste l'élément qui correspond (et pas toute la liste)
				projection: { 
					DonsPlasma: { $elemMatch: { _id: req.params.donId } }
				},
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
 * Permet de modifier les données de don de plaquette
 */
 let updateDonPlaquette = async (req, res) => {
	try {
		//Vérifie les id
		if(!mongoose.isValidObjectId(req.params.donId))
			return res.status(400).json("wrong id : " + req.params.donId);
		if(!mongoose.isValidObjectId(req.user._id))
			return res.status(400).json("wrong id : " + req.user._id);

		const docs = await donModel.findOneAndUpdate(
			{ userId: req.user._id, "DonsPlaquette._id": req.params.donId },
			{
				$set: {
					"DonsPlaquette.$.dateDon": req.body.dateDon
				}
			},
			{
				//Renvoie juste l'élément qui correspond (et pas toute la liste)
				projection: { 
					DonsPlaquette: { $elemMatch: { _id: req.params.donId } }
				},
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
 * Permet d'ajouter une donnée dans don de sang
 */
let addDonSang = async (req, res) => {
	try {
        //Vérifie que l'id est le bon
		if(!mongoose.isValidObjectId(req.user._id))
			return res.status(400).send("wrong id : " + req.user._id);

		const docs = await donModel.findOneAndUpdate(
			{ userId: req.user._id },
			{
				$push: {
					DonsSang: {
                        dateDon: req.body.dateDon
					}
				}
			},
			{
				//Renvoie juste le dernier élément
				projection: { DonsSang: {$slice: -1} },
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
 * Permet d'ajouter une donnée dans don de plasma
 */
 let addDonPlasma = async (req, res) => {
	try {
        //Vérifie que l'id est le bon
		if(!mongoose.isValidObjectId(req.user._id))
			return res.status(400).send("wrong id : " + req.user._id);

		const docs = await donModel.findOneAndUpdate(
			{ userId: req.user._id },
			{
				$push: {
					DonsPlasma: {
                        dateDon: req.body.dateDon
					}
				}
			},
			{
				//Renvoie juste le dernier élément
				projection: { DonsPlasma: {$slice: -1} },
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
 * Permet d'ajouter une donnée dans don de plaquette
 */
 let addDonPlaquette = async (req, res) => {
	try {
        //Vérifie que l'id est le bon
		if(!mongoose.isValidObjectId(req.user._id))
			return res.status(400).send("wrong id : " + req.user._id);

		const docs = await donModel.findOneAndUpdate(
			{ userId: req.user._id },
			{
				$push: {
					DonsPlaquette: {
                        dateDon: req.body.dateDon
					}
				}
			},
			{
				//Renvoie juste le dernier élément
				projection: { DonsPlaquette: {$slice: -1} },
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
 * Permet de supprimer une donnée de don de sang
 */
let deleteDonSang = (req, res) => {
    //Vérifie que l'id est le bon
	if(!mongoose.isValidObjectId(req.params.id))
		return res.status(400).send("wrong id : " + req.params.id);

	sleepModel.findOneAndUpdate(
		{ userId: req.user._id, "DonsSang._id": req.params.donId },
		{
			$pull: {
				DonsSang: {
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

/**
 * Permet de supprimer une donnée de don de plasma
 */
 let deleteDonPlasma = (req, res) => {
    //Vérifie que l'id est le bon
	if(!mongoose.isValidObjectId(req.params.id))
		return res.status(400).send("wrong id : " + req.params.id);

	sleepModel.findOneAndUpdate(
		{ userId: req.user._id, "DonsPlasma._id": req.params.donId },
		{
			$pull: {
				DonsPlasma: {
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

/**
 * Permet de supprimer une donnée de don de plaquette
 */
 let deleteDonPlaquette = (req, res) => {
    //Vérifie que l'id est le bon
	if(!mongoose.isValidObjectId(req.params.id))
		return res.status(400).send("wrong id : " + req.params.id);

	sleepModel.findOneAndUpdate(
		{ userId: req.user._id, "DonsPlaquette._id": req.params.donId },
		{
			$pull: {
				DonsPlaquette: {
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

export default {getDon, createDon, updateDonSang, updateDonPlasma, updateDonPlaquette, addDonSang, addDonPlasma, addDonPlaquette, deleteDonSang, deleteDonPlasma, deleteDonPlaquette};