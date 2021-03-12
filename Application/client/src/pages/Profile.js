import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../utils/store.js";
import Success from '../components/profile/Success';
import AddVaccines from '../components/profile/addVaccines';

function Profile() {
	const { uid, setUid } = useUser();
	const [user, setUser] = useState({
		picture: "default-user.jpg",
		pseudo: "",
		sex: "",
		dateOfBirth: "",
		experience: {xp: 0, level: 0},
		success: []
	});

	//ajouts vaccins
	const [showAddVaccineFrom, setVaccineForm] = useState(false);

	const [listvaccines, setListVaccines] = useState([]);
	const handleAdd = (val) => setVaccineForm(val)
	
	
	useEffect(() => {
		const fetchUser = async () => {
			const response = await axios.get(`/api/user/${uid}`);
			setUser({ ...user, ...response.data });
		}
		fetchUser();

		const fetchVaccin = async () =>
		{
			const response = await axios.get('/api/vaccines/');
			setListVaccines(response.data.vaccines);
		}
		fetchVaccin();
	}, [user, uid]);

	const logout = async () => {
		await axios.get("/api/user/logout", { withCredentials: true });
		setUid(null);
		window.location = "/";
	};

	let expTotale = 100;
	let age = 19;

	return (
		<section>
			<h1>Votre profil</h1>
			
			<div className="profilInfo">
				<img onClick={logout} src={`./uploads/profil/${user.picture}`} tag="PP" alt="profil"></img>
				<h2>{user.pseudo}</h2>

				<p> Niveau : {user.experience.level}</p>
				<div id="level" style={{width: "70%"}}>
					<div id="progress" style={{width: user.experience.xp * 100 / expTotale + "%"}}></div>
				</div>

				<div className="vaccinsP">
					<h3>Vaccins</h3>
					<ul>
						{listvaccines && listvaccines.map((vaccine, key) => {
							return (
								<li key={key}>{vaccine.name}</li>
							)
						})}
					</ul>
				</div>
				
				{/*Ajouter Vaccin*/}
				<button onClick={(event) => setVaccineForm(true)}>+</button>
				{showAddVaccineFrom && <AddVaccines handle={handleAdd} /> }

				<div className="detailsP">
					<h3>Informations</h3>
					<ul>
						<li>Sexe : {user.experience.xp}</li>
						<li>Age : {age} ans</li>
					</ul>
				</div>

				<div className="allergiesP">
					<h3>Allergies</h3>
					<ul>
						<li>Allergie1</li>
						<li>Allergie2</li>
					</ul>
				</div>

				<Success />
			</div>

			<button onClick={logout}>Se déconnecter</button>
			<button>Modifier</button>
		</section>
	);
}

export default Profile;