import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const UserContext = createContext();

const useUser = () => useContext(UserContext)

function UserWrapper({ children }) {
	const [working, setWorking] = useState(false);
	const [user, setUser] = useState({
		picture: "default-user.jpg",
		email: "--",
		pseudo: "--",
		sex: "--",
		birth: new Date().toJSON(),
		experience: {xp: 0, level: 0},
		success: []
	});

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
				axios.defaults.withCredentials = true;
	
				//On appelle la fonction de nouveau quand le refreshToken n'est plus valide
				setTimeout(() => {
					refreshToken();
				}, res.data.expiresIn - 10000); //-10s
	
				setUser({ ...user, ...res.data.user });
			})
			.catch((err) => console.log("No token"))
			.finally(() => {
				setWorking(true);
			});
		}
		refreshToken();
	}, [user.email]);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{working ? children : null}
		</UserContext.Provider>
	);
}

export {UserContext, useUser, UserWrapper};
