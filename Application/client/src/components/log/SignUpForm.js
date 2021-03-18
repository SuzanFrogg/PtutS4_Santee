import React, { useState } from "react";
import axios from "axios";
import { ReactComponent as LockIcon } from "../../media/icons/padlock-full.svg";
import { ReactComponent as UserIcon } from "../../media/icons/user-full.svg";
import { ReactComponent as MailIcon } from "../../media/icons/email-full.svg";
import { ReactComponent as CakeIcon } from "../../media/icons/cake.svg";

function SignUpForm() {
	const [pseudo, setPseudo] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [sex, setSex] = useState("");
	const [birth, setBirth] = useState("");

	const handleSignUp = async (event) => {
		event.preventDefault();
		
		const pseudoError = document.querySelector(".form-signup .form-error.form-error-pseudo");
		const emailError = document.querySelector(".form-signup .form-error.form-error-email");
		const passwordError = document.querySelector(".form-signup .form-error.form-error-password");
		
		//On lance la requête pour s'inscrire
		const response = await axios.post("/api/user/register", {pseudo, email, password, sex, birth}, { withCredentials: true });

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
		<>
		<h3>Inscription</h3>
		<form action="" onSubmit={handleSignUp} className="form-signup">
			<div className="form-input-container">
				<span className="form-input-icon"><UserIcon /></span>
				<input
					type="text"
					id="form-pseudo"
					value={pseudo}
					onChange={(event) => setPseudo(event.target.value)}
					placeholder=" "
				/>
				<label htmlFor="form-pseudo">Pseudo</label>
			</div>
			<div className="form-error form-error-pseudo"></div>

			<div className="form-input-container">
				<span className="form-input-icon"><MailIcon /></span>
				<input
					type="text"
					id="form-email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					placeholder=" "
				/>
				<label htmlFor="form-email">Email</label>
			</div>
			<div className="form-error form-error-email"></div>

			<div className="form-input-container">
				<span className="form-input-icon"><LockIcon /></span>
				<input
					type="password"
					id="form-password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					placeholder=" "
				/>
				<label htmlFor="form-password">Mot de passe</label>
			</div>
			<div className="form-error form-error-password"></div>

			<div className="form-input-container">
				<span className="form-input-icon"><CakeIcon /></span>
				<input
					type="date"
					id="form-birth"
					value={birth}
					onChange={(event) => setBirth(event.target.value)}
				/>
				<label htmlFor="form-birth">Date de naissance</label>
			</div>

			<div className="form-input-container form-radio">
				<input
					type="radio"
					id="form-sex-f"
					value="F"
					name="sex"
					onChange={(event) => setSex(event.target.value)}
				/>
				<label htmlFor="form-sex-f">Femme</label>
				<input
					type="radio"
					id="form-sex-m"
					value="M"
					name="sex"
					onChange={(event) => setSex(event.target.value)}
					style={{marginLeft: "80px"}}
				/>
				<label htmlFor="form-sex-m">Homme</label>
			</div>

			<input type="submit" value="S'inscrire" />
		</form>
		</>
	);
}

export default SignUpForm;