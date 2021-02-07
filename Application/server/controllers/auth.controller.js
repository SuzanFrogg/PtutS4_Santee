import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60 * 1000;//3 jours

const createToken = (id) => {
	return jwt.sign({id}, process.env.TOKEN_SECRET, {
		expiresIn: maxAge
	});
}


/**
 * Inscris un utilisateur (dans la bdd)
 */
let signUp = async (req, res) => {
	//On récupère ce que le client nous envoie
	const {pseudo, email, password} = req.body;

	try {
		const user = await userModel.create({pseudo, email, password});
		res.status(201).json({ user: user._id });
	}
	catch (err) {
		res.status(400).json({ error: "ID inconnu" });
	}
}

/**
 * Permet de se connecter
 */
let login = async (req, res) => {
	const {email, password} = req.body;

	try {
		const user = await userModel.login(email, password);
		const token = createToken(user._id);
		res.cookie("jwt", token, { httpOnly: true, maxAge });
		res.status(200).json({ user: user._id });
	}
	catch (err) {
		res.status(400).json({ error: err });
	}
}

/**
 * Permet de se déconnecter
 */
let logout = async (req, res) => {
	res.cookie("jwt", "", { maxAge: 1 });
	res.redirect("/");
}

export default {signUp, login, logout};