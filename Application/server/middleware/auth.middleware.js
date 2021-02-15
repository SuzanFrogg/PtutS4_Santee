import userModel from "../models/user.model.js";

let checkUser = (req, res, next) => {
	//On récupère le token d'authentification dans le header (il est sous la forme "Bearer TOKEN_HERE")
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token) {
		try {
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

let requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
			if (err) {
				console.log(err);
			}
			else {
				console.log("Utilisateur connecté : " + decodedToken.id);
				next();
			}
		});
	}
	else {
		console.log("Pas de token");
	}
}

export default {checkUser, requireAuth};