import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

/**
 * Permet de vérifier que l'utilisateur est en droit de faire des requêtes
 */
let checkUser = (req, res, next) => {
	//On récupère le token d'authentification situé dans le header (il est sous la forme "Bearer TOKEN_HERE")
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	//S'il y a bien un token dans le header
	if (token) {
		try {
			//On vérifie que le token est un token valide
			jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
				if (err) throw err;
				let user = await userModel.findById(decodedToken.id);
				req.user = user;
				next();
			});
		}
		catch (err) {
			res.status(403).json({ err: "invalid Token" });
		}
	}
	else {
		res.status(401).json({ err: "access denied" });
	}
}

export default {checkUser};