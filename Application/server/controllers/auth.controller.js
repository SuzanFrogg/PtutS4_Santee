import userModel from "../models/user.model.js";
import errorsUtils from "../utils/errors.utils.js";
import jwt from "jsonwebtoken";

/**
 * On crée un token d'authentification pour sauvegarder l'utilisateur
 * @param {String} id l'id de l'utilisateur
 * @param {int} maxAge la durée de vie du token
 */
const createToken = (id, maxAge) => {
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
		const errors = errorsUtils.signUpErrors(err);
		res.status(400).json({ errors });
	}
}

/**
 * Permet de se connecter
 */
let login = async (req, res) => {
	const {email, password} = req.body;

	try {
		const user = await userModel.findOne({ email });
		if (!user)
			throw Error("invalid email");

		const isMatch = await user.matchPassword(password);
		if (!isMatch)
			throw Error("invalid password");

		const maxAge = 3 * 24 * 60 * 60 * 1000; //3 jours
		const token = createToken(user._id, maxAge);
		res.cookie("jwt", token, { httpOnly: true, maxAge });
		res.status(200).json({ user: user._id });
	}
	catch (err) {
		const error = err.message;
		res.status(400).json({ error });
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