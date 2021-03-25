import React, { useState } from "react";
import axios from "axios";
import { ReactComponent as LockIcon } from "../../media/icons/padlock-full.svg";
import { ReactComponent as UserIcon } from "../../media/icons/user-full.svg";
import { ReactComponent as MailIcon } from "../../media/icons/email-full.svg";
import { ReactComponent as CakeIcon } from "../../media/icons/cake.svg";

function SignUpForm(props) {
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
		const birthError = document.querySelector(".form-signup .form-error.form-error-birth");
		const sexError = document.querySelector(".form-signup .form-error.form-error-sex");
		

		try {
			//On lance la requête pour s'inscrire
			const response = await axios.post("/api/user/register", {pseudo, email, password, sex, birth}, { withCredentials: true });
		
			if (response.data.errors) {
				pseudoError.innerHTML = response.data.errors.pseudo;
				emailError.innerHTML = response.data.errors.email;
				passwordError.innerHTML = response.data.errors.password;
				birthError.innerHTML = response.data.errors.birth;
				sexError.innerHTML = response.data.errors.sex;
			}
			else {
				pseudoError.innerHTML = "";
				emailError.innerHTML = "";
				passwordError.innerHTML = "";
				birthError.innerHTML = "";
				sexError.innerHTML = "";

				const resvaccines = await axios.post("/api/vaccines", {userId: response.data.user._id}, { withCredentials: true });
				const resallergy = await axios.post("/api/allergy", {userId: response.data.user._id}, { withCredentials: true });
				//TODO : le reste des requêtes

				if (!resvaccines.data || !resallergy.data) {
					props.handleAlert("error", "Une erreur est survenue lors de la création du profil");
				}
				else {
					props.handleAlert("success", "Votre compte à bien été créé");
					setPseudo("");
					setEmail("");
					setPassword("");
					setSex("");
					setBirth("");
				}
			}
		}
		catch (error) {
			props.handleAlert("error", "Une erreur est survenue lors de la création du profil");
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
			<div className="form-error form-error-birth"></div>

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
			<div className="form-error form-error-sex"></div>

			<input type="submit" value="S'inscrire" />
		</form>
		</>
	);
}

export default SignUpForm;