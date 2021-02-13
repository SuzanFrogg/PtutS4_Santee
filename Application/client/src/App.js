import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import ErrorHTTP from "./pages/ErrorHTTP";
import Stats from "./pages/Stats";
import Objectives from "./pages/Objectives";
import Profile from "./pages/Profile";
import Calendar from "./pages/Calendar";

function App() {
	return (
		<BrowserRouter /*forceRefresh={true}*/>
			<Header />

			<main className="main-container">
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/stats" component={Stats} />
					<Route path="/objectives" exact component={Objectives} />
					<Route path="/profile" exact component={Profile} />
					<Route path="/calendar" exact component={Calendar} />
					<Route path="/" component={ErrorHTTP} />
				</Switch>
			</main>
		</BrowserRouter>
	);
}

export default App;