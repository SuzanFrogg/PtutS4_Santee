import React from "react";
import {Link} from 'react-router-dom';
import HeaderItem from "./HeaderItem";
import { ReactComponent as Home } from "../../media/icons/fi-home.svg";
import { ReactComponent as Stats } from "../../media/icons/fi-stats.svg";
import { ReactComponent as Calendar } from "../../media/icons/fi-calendar.svg";
import { ReactComponent as Objectives } from "../../media/icons/fi-badge.svg";

function Header() {
	return (
		<header>
			<div className="header-logo">
				<Link to="/">
					<img src="" alt="logo"/> 
				</Link>
			</div>
			<ul className="header-menu">
				<HeaderItem isExact={true} link="/" text="Accueil" icon={<Home />} />
				<HeaderItem isExact={false} link="/stats" text="Statistiques" icon={<Stats />} />
				<HeaderItem isExact={true} link="/calendar" text="Calendrier" icon={<Calendar />} />
				<HeaderItem isExact={true} link="/objectives" text="Objectifs" icon={<Objectives />} />
			</ul>
			<div className="header-profile">
				<Link to="/profile">
					<img src="/uploads/profil/default-user.jpg" alt="Profil"/>
				</Link>
			</div>
		</header>
	);
}

export default Header;