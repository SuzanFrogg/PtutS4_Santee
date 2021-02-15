import React, { useState } from "react";
import axios from "axios";
import {getAccessToken, setAccessToken} from "./accessToken.js";

function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (event) => {
		event.preventDefault();

		const emailError = document.querySelector(".form-error.form-error-email");
		const passwordError = document.querySelector(".form-error.form-error-password");

		axios({
			method: "POST",
			url: "/api/user/login",
			withCredentials: true,
			data: {
				email,
				password
			}
		}).then((res) => {
			if (res.data.errors) {
				emailError.innerHTML = res.data.errors.email;
				passwordError.innerHTML = res.data.errors.password;
			}
			else {
				//On récupère le token reçu et on le stocke
				setAccessToken(res.data.accessToken);

				
				/* Exemple de requête avec le token */
				axios.get("/api/user", { headers: { Authorization: "Bearer " + getAccessToken() } })
				.then((res) => {
					console.log(res.data);
				})
				.catch((err) => {
					console.log(err);
				})
				/* Fin exemple */


				//window.location = "/";
			}
		}).catch((err) => {
			console.log(err);
		});
	};

	return (
		<form action="" onSubmit={handleLogin} className="form-login">
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

			<input type="submit" value="Se connecter" />
		</form>
	);
}

export default LoginForm;
