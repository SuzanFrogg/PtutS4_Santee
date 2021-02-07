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
		return res.status(400).send("ID unknown : " + req.params.id);

	userModel.findById(req.params.id, (err, docs) => {
		//S'il n'y a pas d'erreurs
		if (!err)
			res.send(docs)
		else
			console.log("ID unknown : " + err);
	}).select("-password");
}

export default {getAllUsers, userInfo};