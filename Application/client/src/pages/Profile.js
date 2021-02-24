import React from "react";
import axios from "axios";
import { useUser } from "../utils/store.js";

function Profile() {
	const { setUid } = useUser();

	const logout = async () => {
		await axios.get("/api/user/logout", { withCredentials: true });
		setUid(null);
		window.location = "/";
	};

	return (
		<section>
			<h1>Votre profil</h1>
			<button onClick={logout}>Se déconnecter</button>
		</section>
	);
}

export default Profile;