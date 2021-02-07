import React from "react";
import {Link} from 'react-router-dom';

function Header() {
	return (
		<header>
			<nav>
				<div>
					<img src={''} alt="logo"/> 
				</div>
				<div>
					<ul>
						<Link to="/"><li>Accueil</li></Link>
						<Link to="/Stats"><li>Statistiques</li></Link>
						<Link to="/Calendar"><li>Calendrier</li></Link>
						<Link to="/Objectives"><li>Objectifs</li></Link>
						<Link to="/Profile"><li>Profil</li></Link>
					</ul>
				</div>
			</nav>
		</header>
	);
}

export default Header;