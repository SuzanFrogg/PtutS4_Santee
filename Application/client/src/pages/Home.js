import React from "react";
import Tips from "../components/tip/Tips";
function Header() {
	return (
		<section>
			<h1>Bienvenue sur votre carnet de santé</h1>

			<div className="case-astuce">
				<p>Astuce du jour : </p>
				<Tips/>
			</div>
		</section>
	);
}

export default Header;