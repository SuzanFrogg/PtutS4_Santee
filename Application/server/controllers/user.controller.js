import userModel from "../models/user.model.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

/**
 * Permet d'obtenir tous les utilisateurs
 */
let getAllUsers = async (req, res) => {
	const users = await userModel.find().select("-password");
	res.status(200).json(users);
}

/**
 * Permet d'obtenir l'information d'un utilisateur
 */
let userInfo = async (req, res) => {
	//Si l'id n'est pas présent dans la bdd
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).json({ error: "ID inconnu" });

	userModel.findById(req.params.id, (err, docs) => {
		//S'il n'y a pas d'erreurs
		if (!err) res.status(200).json(docs);
		else res.status(500).json({ error: err });
	}).select("-password");
}

let updateUser = async (req, res) => {
	//Si l'id n'est pas présent dans la bdd
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).json({ error: "ID inconnu" });
	
	try {
		await userModel.findByIdAndUpdate(
			req.params.id,
			{
				$set: {
					prenom: req.body.prenom,
					nom: req.body.nom
				}
			},
			{ new: true, upsert: true, setDefaultsOnInsert: true },
			(err, docs) => {
				if (!err) return res.status(200).json(docs);
				else return res.status(500).send({ error: err });
			}
		)
	}
	catch (err) {
		return res.status(500).json({ error: err });
	}
}

let deleteUser = async (req, res) => {
	//Si l'id n'est pas présent dans la bdd
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).json({ error: "ID inconnu" });
	
	try {
		await userModel.remove({ _id: req.params.id }).exec();
		res.status(200).json({ message: "Suppression réussie"});
	}
	catch (err) {
		return res.status(500).send({ error: err });
	}
}

export default {getAllUsers, userInfo, updateUser, deleteUser};