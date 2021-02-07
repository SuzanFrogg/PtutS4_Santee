import mongoose from "mongoose";
import validator from "validator";
const {isEmail} = validator;
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
		email: {
			type: String,
			required: true,
			unique: true,
			validate: isEmail,
			lowercase: true,
			trim: true
		},
		password: {
			type: String,
			required: true,
			minLength: 6,
			trim: true
		},
		pseudo: {
			type: String,
			required: true,
			maxLength: 64,
			unique: true,
			trim: true
		},
		nom: {
			type: String
		},
		prenom: {
			type: String
		},
		image: {
			type: String
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
 * Trouve l'adresse mail et vérifie si c'est le bon mot de passe
 * @param {String} email L'adresse mail de l'utilisateur auquel on veut se connecter
 * @param {String} password Le mot de passe correspondant au mail de l'utilisateur
 */
userSchema.statics.login = async function(email, password) {
	const user = await this.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		}
	}
	throw Error("Email ou mot de passe incorrect")
}

export default mongoose.model("user", userSchema);