import React from "react";

function Header() {
	return (
		<header>
			<nav>
				<div>
					<img src={''} alt="logo"/> 
				</div>
				<div>
					<ul>
						<li><a href="/">Accueil</a></li>
						<li><a href="../../pages/Stats">Statistiques</a></li>
						<li><a href="../../pages/Calendar">Calendrier</a></li>
						<li><a href="../../pages/Objectives">Objectifs</a></li>
						<li><a href="../../pages/Pofile">Profil</a></li>
					</ul>
				</div>
			</nav>
		</header>
	);
}

export default Header;