import mongoose from "mongoose";
import validator from "validator";
const {isEmail} = validator;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
		email: {
			type: String,
			required: true,
			unique: true,
			validate: [isEmail],
			lowercase: true,
			trim: true
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
			trim: true
		},
		pseudo: {
			type: String,
			required: true,
			maxlength: 64,
			unique: true,
			trim: true
		},
		nom: {
			type: String,
			maxlength: 64
		},
		prenom: {
			type: String,
			maxlength: 64
		},
		picture: {
			type: String,
			default: "default_user.png"
		}
	},
	{
		timestamps: true
	}
);

//On lance la fonction avant d'enregistrer 
userSchema.pre("save", async function(next) {
	//On génère le "sel" pour le mdp (C'est pour Mathys ça)
	const salt = await bcrypt.genSalt();
	//On hash le mot de passe
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

/**
 * Vérifie si c'est le bon mot de passe
 * @param {String} password Le mot de passe correspondant à l'utilisateur
 */
userSchema.methods.matchPassword = async function(password) {
	return await bcrypt.compare(password, this.password);
}

/**
 * On crée un token d'authentification pour sauvegarder l'id de l'utilisateur
 */
userSchema.methods.getAccessToken = async function() {
	return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "30s"
	});
}

/**
 * On crée un token de rafraichissement pour demander un nouveau token d'authentification
 */
userSchema.methods.getRefreshToken = async function() {
	return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "3d"
	});
}

export default mongoose.model("user", userSchema);