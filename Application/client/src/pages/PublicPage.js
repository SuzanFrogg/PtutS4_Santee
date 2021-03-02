import React, { useState } from "react";
import LoginForm from "../components/log/LoginForm";
import SignUpForm from "../components/log/SignUpForm";

function PublicPage() {
	const [signUpModal, setSignUpModal] = useState(true);
	const [loginModal, setLoginModal] = useState(false);

	const handleModals = (event) => {
		if (event.target.id === "form-btn-login") {
			setSignUpModal(false);
			setLoginModal(true);
		}
		else if (event.target.id === "form-btn-signup") {
			setSignUpModal(true);
			setLoginModal(false);
		}
	}

	return (
		<div className="form-container">
			<ul>
				<li id="form-btn-login" onClick={handleModals}>Se connecter</li>
				<li id="form-btn-signup" onClick={handleModals}>S'inscrire</li>
			</ul>
			{loginModal && <LoginForm />}
			{signUpModal && <SignUpForm />}
		</div>
	)
}

export default PublicPage;