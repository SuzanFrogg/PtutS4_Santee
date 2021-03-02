import React from "react";
import {Route, Switch} from "react-router-dom";
import { useUser } from "../utils/store.js";

import Header from "../components/header/Header";
import Home from "../pages/Home";
import ErrorHTTP from "../pages/ErrorHTTP";
import Stats from "../pages/Stats";
import Objectives from "../pages/Objectives";
import Profile from "../pages/Profile";
import Calendar from "../pages/Calendar";
import PrivatePage from "../pages/PublicPage";

function MainRouter() {
	const { uid } = useUser();

	return (
		<>
			{uid ?
				<>
					<Header />
					
					<main className="main-container">
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/stats" component={Stats} />
							<Route exact path="/objectives" component={Objectives} />
							<Route exact path="/profile" component={Profile} />
							<Route exact path="/calendar" component={Calendar} />
							<Route path="/" component={ErrorHTTP} />
						</Switch>
					</main>
				</>
			: <Route path="/" component={PrivatePage} />}
		</>
	)
}

export default MainRouter;
