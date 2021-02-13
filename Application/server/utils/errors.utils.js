let signUpErrors = (err) => {
	let errors = {pseudo: "", email: "", password: ""};

	if (err.message.includes("email"))
		errors.email = "Email incorrect";
	if (err.message.includes("password"))
		errors.password = "Le mot de passe doit faire au moins 6 caractères";
	if (err.message.includes("pseudo"))
		errors.pseudo = "Pseudo incorrect ou déjà pris";
	
	if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
		errors.email = "Cet email est déjà pris";
	if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
		errors.pseudo = "Ce pseudo est déjà pris";

	return errors;
}

let loginErrors = (err) => {
	let errors = {email: "", password: ""};
	console.log(err);

	if (err.message.includes("email"))
		errors.email = "Email incorrect";
	if (err.message.includes("password"))
		errors.password = "Mot de passe incorrect";

	return errors;
}

let uploadErrors = (err) => {
	let errors = {format: "", maxSize: ""};

	if (err.message.includes("invalid file"))
		errors.format = "Format invalide";
	if (err.message.includes("max size"))
		errors.maxSize = "Le fichier dépasse 500ko";

	return errors;
}

export default {signUpErrors, loginErrors, uploadErrors};