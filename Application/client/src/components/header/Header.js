import React from "react";
import HeaderItem from "./HeaderItem";

function Header() {
	return (
		<header>
			<div>
				<div>
					<img src="" alt="logo"/> 
				</div>
				<nav>
					<ul>
						<HeaderItem link="/" text="Accueil" />
						<HeaderItem link="/Stats" text="Statistiques" />
						<HeaderItem link="/Calendar" text="Calendrier" />
						<HeaderItem link="/Objectives" text="Objectifs" />
						<HeaderItem link="/Profile" text="Profil" />
					</ul>
				</nav>
			</div>
		</header>
	);
}

export default Header;