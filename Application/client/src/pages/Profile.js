import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../utils/store.js";
import Success from '../components/profile/Success';
import AddVaccines from '../components/profile/vaccines/addVaccines';
import ModifyVaccines from '../components/profile/vaccines/modifyVaccines';
//import DeleteVaccines from '../components/profile/vaccines/deleteVaccines';
import AddAllergy from '../components/profile/allergy/addAllergy';


function Profile() {
	const { uid, setUid } = useUser();
	const [user, setUser] = useState({
		picture: "default-user.jpg",
		pseudo: "",
		sex: "",
		birth: "",
		experience: {xp: 0, level: 0},
		success: []
	});

	//gérer vaccins
	//ajouts
	const [showAddVaccineFrom, setAddVaccineForm] = useState(false);
	const handleAddVaccines = (val) => setAddVaccineForm(val)


	const [showVaccineFrom, setVaccineForm] = useState(false);

	//modifier
	const [showModifyVaccineFrom, setModifyVaccineForm] = useState(false);
	const handleModifyVaccines = (val) => setModifyVaccineForm(val)

	//supprimer
	const [showDeleteVaccineFrom, setDeleteVaccineForm] = useState(false);
	const handleDeleteVaccines =  (val) => setModifyVaccineForm(val)

	//vaccins
	const [listvaccines, setListVaccines] = useState([]);


	//gerer allergies
	const [listAllergies, setListAllergies] = useState([]);

	//ajouts
	const [showAddAllergyFrom, setAddAllergyForm] = useState(false);
	const handleAddAllergy = (val) => setAddAllergyForm(val)
	
	
	//se lance a chaque chargement
	useEffect(() => {
		let isMounted = true;
		const fetchUser = async () => {
			const response = await axios.get(`/api/user/${uid}`);
			if (isMounted) setUser({ ...user, ...response.data });
		}

		//initialiser vaccins
		const fetchVaccin = async () =>
		{
			const response = await axios.get('/api/vaccines/');
			if (isMounted) setListVaccines(response.data.vaccines);
		}

		//initialiser allergies
		const fetchAllergy = async () =>
		{
			const response = await axios.get('/api/allergy/');
			if (isMounted) setListAllergies(response.data.allergies);
		}

		fetchUser();
		fetchVaccin();
		fetchAllergy();
		return () => { isMounted = false };
	}, [user, uid]);


	//deconection
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
								<li onClick={(event) => setVaccineForm(true)} key={key}>{vaccine.name}</li>
							)
						})}
					</ul>
				
				

					{/* Formulaire modifier/delete*/}
					{showVaccineFrom && <button onClick={(event) => setModifyVaccineForm(true)}>Modifier</button>}
					{showVaccineFrom && <button onClick={(event) => setDeleteVaccineForm(true)}>Supprimer</button>}
					{showVaccineFrom && <button onClick={(event) => setVaccineForm(false)}>Annuler</button>}

					{showModifyVaccineFrom && <ModifyVaccines handle={handleModifyVaccines}/> }
					{/*showDeleteVaccineFrom && <DeleteVaccines handle={handleDeleteVaccines} /> */}


					{/*Ajouter Vaccin*/}
					<button onClick={(event) => setAddVaccineForm(true)}>+</button>
					{showAddVaccineFrom && <AddVaccines handle={handleAddVaccines} /> }


				</div>

				
				

				<div className="detailsP">
					<h3>Informations</h3>
					<ul>
						<li>Sexe : {user.sex}</li>
						<li>Age : {age} ans</li>
					</ul>
				</div>

				<div className="allergiesP">
					<h3>Allergies</h3>
					<ul>
						{listAllergies && listAllergies.map((allergy, key) => {
								return (
									<li key={key}>{allergy.toAvoid}</li>
								)
							})}
					</ul>

					{/*Ajouter Allergy*/}
					<button onClick={(event) => setAddAllergyForm(true)}>+</button>
					{showAddAllergyFrom && <AddAllergy handle={handleAddAllergy} /> }


				</div>

				<Success />
			</div>

			<button onClick={logout}>Se déconnecter</button>
			<button>Modifier</button>
		</section>
	);
}

export default Profile;