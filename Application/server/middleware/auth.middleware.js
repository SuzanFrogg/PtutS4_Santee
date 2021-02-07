import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

let checkUser = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
			if (err) {
				res.locals.user = null;
				res.cookie("jwt", "", { maxAge: 1 });
			}
			else {
				let user = await userModel.findById(decodedToken.id);
				res.locals.user = user;
			}
			next();
		});
	}
	else {
		res.locals.user = null;
		next();
	}
}

let requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
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