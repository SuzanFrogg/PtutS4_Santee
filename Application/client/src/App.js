import React, { useState } from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import ErrorHTTP from "./pages/ErrorHTTP";
import Stats from "./pages/Stats";
import Objectives from "./pages/Objectives";
import Profile from "./pages/Profile";
import Calendar from "./pages/Calendar";
import PrivatePage from "./pages/PrivatePage";
import PrivateRoute from "./routing/PrivateRoute";
import axios from "axios";

function App() {
	/*const [uid, setUid] = useState(null);

	useEffect(async () => {
		await axios({
			method: "GET",
			url: "/jwtid",
			withCredentials: true
		}).then((res) => setUid(res.data))
		.catch((err) => console.log("No token"));
	}, [uid])*/

	return (
		<BrowserRouter /*forceRefresh={true}*/>
			<Header />

			<main className="main-container">
				<Switch>
					{/*<PrivateRoute exact path="/" component={PrivatePage} />*/}
					<Route exact path="/" component={PrivatePage} />
					<Route path="/stats" component={Stats} />
					<Route exact path="/objectives" component={Objectives} />
					<Route exact path="/profile" component={Profile} />
					<Route exact path="/calendar" component={Calendar} />
					<Route path="/" component={ErrorHTTP} />
				</Switch>
			</main>
		</BrowserRouter>
	);
}

export default App;