import React, { useState } from "react";
import {Route, Switch} from "react-router-dom";
import { useUser } from "../utils/store.js";

import Header from "../components/header/Header";
import Home from "../pages/Home";
import ErrorHTTP from "../pages/ErrorHTTP";
import Stats from "../pages/Stats";
import Objectives from "../pages/Objectives";
import Profile from "../pages/Profile";
import Calendar from "../pages/Calendar";
import PublicPage from "../pages/PublicPage";

function MainRouter() {
	const { user } = useUser();
	const [alert, setAlert] = useState(null);

	/**
	 * Affiche une alerte en haut de la page
	 * @param {String} type Deux valeurs possible : success et error
	 * @param {String} message Le message d'alerte à afficher
	 */
	let handleAlert = (type, message) => {
		setAlert(<span className={`alert-${type}`}>{message}</span>);
		//On enlève l'alerte après 3 secondes
		setTimeout(() => setAlert(null), 5000);
	}

	return (
		<>
			<div id="alert">{alert}</div>
			{(user.email !== "--") ?
				<>
					<Header />
					
					<main className="main-container">
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/stats" component={Stats} />
							<Route exact path="/objectives" component={Objectives} />
							<Route exact path="/profile" render={(props) => (<Profile {...props} handleAlert={handleAlert} />)} />
							<Route exact path="/calendar" component={Calendar} />
							<Route path="/" component={ErrorHTTP} />
						</Switch>
					</main>
				</>
			: <Route path="/" render={(props) => (<PublicPage {...props} handleAlert={handleAlert} />)} />}
		</>
	)
}

export default MainRouter;
