import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import ErrorHTTP from "./pages/ErrorHTTP";

function App() {
	return (
		<BrowserRouter forceRefresh={true}>
			<Header />

			<main id="main-container">
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/" component={ErrorHTTP} />
				</Switch>
			</main>
		</BrowserRouter>
	);
}

export default App;