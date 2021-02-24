import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const UserContext = createContext();

const useUser = () => useContext(UserContext)

function UserWrapper({ children }) {
	const [working, setWorking] = useState(false);
	const [uid, setUid] = useState(null);


	//Dès que la page est initialisé (mount) on demande le token d'authentification
	useEffect(() => {
		const refreshToken = () => {
			axios({
				method: "POST",
				url: "/refresh_token",
				withCredentials: true
			})
			.then((res) => {
				//A chaque requête effectué ont mettra le header avec notre token à l'intérieur
				axios.defaults.headers.common["authorization"] = `Bearer ${res.data.accessToken}`;
	
				//On appelle la fonction de nouveau quand le refreshToken n'est plus valide
				setTimeout(() => {
					refreshToken();
				}, res.data.expiresIn - 500); //-500ms
	
				setUid(res.data.userId);
			})
			.catch((err) => console.log("No token"))
			.finally(() => {
				setWorking(true);
			});
		}
		refreshToken();
	}, [uid]);

	return (
		<UserContext.Provider value={{ uid, setUid }}>
			{working ? children : null}
		</UserContext.Provider>
	);
}

export {UserContext, useUser, UserWrapper};
