import React from "react";
import {BrowserRouter} from "react-router-dom";
import { UserWrapper } from "./utils/store.js";
import MainRouter from "./routing/MainRouter";

function App() {
	return (
		<UserWrapper>
			<BrowserRouter /*forceRefresh={true}*/>
				<MainRouter />
			</BrowserRouter>
		</UserWrapper>
	);
}

export default App;