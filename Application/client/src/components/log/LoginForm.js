import React, { useState } from "react";
import axios from "axios";
import { ReactComponent as LockIcon } from "../../media/icons/padlock-full.svg";
import { ReactComponent as UserIcon } from "../../media/icons/user-full.svg";

function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (event) => {
		event.preventDefault();

		const emailError = document.querySelector(".form-login .form-error.form-error-email");
		const passwordError = document.querySelector(".form-login .form-error.form-error-password");

		//On lance la requête pour se connecter
		const response = await axios.post("/api/user/login", {email, password}, { withCredentials: true });
		
		if (response.data.errors) {
			emailError.innerHTML = response.data.errors.email;
			passwordError.innerHTML = response.data.errors.password;
		}
		else {
			axios.defaults.headers.common["authorization"] = `Bearer ${response.data.accessToken}`;
			window.location = "/";
		}
	};

	return (
		<>
		<h3>Connexion</h3>
		<form action="" onSubmit={handleLogin} className="form-login">
			<div className="form-input-container">
				<span className="form-input-icon"><UserIcon /></span>
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

			<input type="submit" value="Se connecter" />
		</form>
		</>
	);
}

export default LoginForm;
