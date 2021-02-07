import userModel from "../models/user.model.js";

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
	catch(err) {
		res.status(400).send({ err });
	}
}

export default {signUp};