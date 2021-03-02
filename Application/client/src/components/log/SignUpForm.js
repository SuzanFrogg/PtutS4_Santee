import React, { useState } from "react";
import axios from "axios";

function SignUpForm() {
	const [pseudo, setPseudo] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignUp = async (event) => {
		event.preventDefault();
		
		const pseudoError = document.querySelector(".form-signup .form-error.form-error-pseudo");
		const emailError = document.querySelector(".form-signup .form-error.form-error-email");
		const passwordError = document.querySelector(".form-signup .form-error.form-error-password");

		//On lance la requête pour s'inscrire
		const response = await axios.post("/api/user/register", {pseudo, email, password}, { withCredentials: true });

		if (response.data.errors) {
			pseudoError.innerHTML = response.data.errors.pseudo;
			emailError.innerHTML = response.data.errors.email;
			passwordError.innerHTML = response.data.errors.password;
		}
		else {
			window.location = "/";
		}
	}

	return (
		<form action="" onSubmit={handleSignUp} className="form-signup">
			<label htmlFor="form-pseudo">Pseudo</label>
			<input
				type="text"
				id="form-pseudo"
				value={pseudo}
				onChange={(event) => setPseudo(event.target.value)}
			/>
			<div className="form-error form-error-pseudo"></div>

			<label htmlFor="form-email">Email</label>
			<input
				type="text"
				id="form-email"
				value={email}
				onChange={(event) => setEmail(event.target.value)}
			/>
			<div className="form-error form-error-email"></div>

			<label htmlFor="form-password">Mot de passe</label>
			<input
				type="password"
				id="form-password"
				value={password}
				onChange={(event) => setPassword(event.target.value)}
			/>
			<div className="form-error form-error-password"></div>

			<input type="submit" value="S'inscrire" />
		</form>
	);
}

export default SignUpForm;