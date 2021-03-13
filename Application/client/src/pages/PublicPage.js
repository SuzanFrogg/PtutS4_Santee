import React, { useState } from "react";
import LoginForm from "../components/log/LoginForm";
import SignUpForm from "../components/log/SignUpForm";
import { ReactComponent as HealthIcon } from "../media/icons/health-insurance.svg";

function PublicPage() {
	const [signUpModal, setSignUpModal] = useState(true);

	const handleModals = (event) => {
		if (event.target.id === "form-btn-login")
			setSignUpModal(false);
		else if (event.target.id === "form-btn-signup")
			setSignUpModal(true);
	}

	return (
		<main className="main-hero">
			<div className="main-hero-title">
				<h1>Votre santé à portée de main</h1>
				<HealthIcon />
			</div>
			<div className="main-form-container">
				{signUpModal ?
					<>
						<SignUpForm />
						<p>
							Vous êtes déjà inscrit ? Connectez-vous <span id="form-btn-login" onClick={handleModals}>ici</span>
						</p>
					</>
					:
					<>
						<LoginForm />
						<p>
							Vous n'êtes pas inscrit ? Inscrivez-vous <span id="form-btn-signup" onClick={handleModals}>ici</span>
						</p>
					</>
				}
			</div>
			<div className="background-shape">
				<div className="bg-shape"></div>
				<div className="bg-shape"></div>
				<div className="bg-shape"></div>
				<div className="bg-shape"></div>
				<div className="bg-shape"></div>
			</div>
		</main>
	)
}

export default PublicPage;