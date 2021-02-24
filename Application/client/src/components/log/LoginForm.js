import React, { useState } from "react";
import axios from "axios";

function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (event) => {
		event.preventDefault();

		const emailError = document.querySelector(".form-error.form-error-email");
		const passwordError = document.querySelector(".form-error.form-error-password");

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
