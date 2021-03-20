import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../utils/store.js";
import Success from '../components/profile/Success';
import AddVaccines from '../components/profile/vaccines/addVaccines';
//import ModifyVaccines from '../components/profile/vaccines/modifyVaccines';
//import DeleteVaccines from '../components/profile/vaccines/deleteVaccines';
import AddAllergy from '../components/profile/allergy/addAllergy';
import { ReactComponent as Success1 } from "../media/icons/health-insurance.svg"; {/* Succès exemple, à supp */}


function Profile() {
	const { user, setUser } = useUser();

	//gérer vaccins
	//ajouts
	const [showAddVaccineFrom, setAddVaccineForm] = useState(false);
	const handleAddVaccines = (val) => setAddVaccineForm(val);


	const [showVaccineFrom, setVaccineForm] = useState(false);

	//modifier
	const [showModifyVaccineFrom, setModifyVaccineForm] = useState(false);
	const handleModifyVaccines = (val) => setModifyVaccineForm(val);

	//supprimer
	const [showDeleteVaccineFrom, setDeleteVaccineForm] = useState(false);
	const handleDeleteVaccines =  (val) => setModifyVaccineForm(val);

	//vaccins
	const [listVaccines, setListVaccines] = useState([]);

	//gerer allergies
	const [listAllergies, setListAllergies] = useState([]);

	//ajouts
	const [showAddAllergyFrom, setAddAllergyForm] = useState(false);
	const handleAddAllergy = (val) => setAddAllergyForm(val);
	
	
	//se lance a chaque chargement
	useEffect(() => {
		let isMounted = true;

		//Initialiser vaccins
		const fetchVaccin = async () =>
		{
			const response = await axios.get('/api/vaccines/');
			if (isMounted) setListVaccines(response.data.vaccines);
		}

		//Initialiser allergies
		const fetchAllergy = async () =>
		{
			const response = await axios.get('/api/allergy/');
			if (isMounted) setListAllergies(response.data.allergies);
		}

		fetchVaccin();
		fetchAllergy();
		return () => { isMounted = false };
	}, [user, JSON.stringify(listVaccines), JSON.stringify(listAllergies)]);


	//deconection
	const logout = async () => {
		await axios.get("/api/user/logout", { withCredentials: true });
		setUser({email: "--"});
		window.location = "/";
	};

	const getAge = (birthDate) => {
		console.log(birthDate);
		let ageDifMs = Date.now() - birthDate.getTime();
		let ageDate = new Date(ageDifMs);
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}

	let expTotale = 100;

	return (
		<section className="profile-section">
			<img className="profile-picture" src={`./uploads/profil/${user.picture}`} alt="profil" />
			<h2>{user.pseudo}</h2>

			<div className="profile-info">
				<div className="level-container">
					<div className="level">
						<div className="progress" style={{width: (user.experience.xp * 100 / expTotale) + "%"}}></div>
					</div>
					<div className="level-numbers">
						<span>{user.experience.level}</span>
						<span>{user.experience.level+1}</span>
					</div>
				</div>

				<div className="profile-details-box profile-vaccines">
					<h3>Vaccins</h3>
					<ul>
						{listVaccines && listVaccines.map((vaccine, key) => {
							return <li onClick={(event) => setVaccineForm(true)} key={key}>{vaccine.name}</li>
						})}
					</ul>

					{/* Formulaire modifier/delete*/}
					{showVaccineFrom && <button onClick={(event) => setModifyVaccineForm(true)}>Modifier</button>}
					{showVaccineFrom && <button onClick={(event) => setDeleteVaccineForm(true)}>Supprimer</button>}
					{showVaccineFrom && <button onClick={(event) => setVaccineForm(false)}>Annuler</button>}

					{/*showModifyVaccineFrom && <ModifyVaccines handle={handleModifyVaccines}/>*/ }
					{/*showDeleteVaccineFrom && <DeleteVaccines handle={handleDeleteVaccines} /> */}


					{/*Ajouter Vaccin*/}
					<button onClick={(event) => setAddVaccineForm(true)}>+</button>
					{showAddVaccineFrom && <AddVaccines handle={handleAddVaccines} /> }
				</div>

				<div className="profile-details-box profile-details">
					<h3>Informations</h3>
					<span>Sexe : {user.sex}</span>
					<span>Age : {getAge(user.birth)} ans</span>
				</div>

				<div className="profile-details-box profile-allergies">
					<h3>Allergies</h3>
					<ul>
						{listAllergies && listAllergies.map((allergy, key) => {
							return <li key={key}>{allergy.toAvoid}</li>
						})}
					</ul>

					{/*Ajouter Allergy*/}
					<button onClick={(event) => setAddAllergyForm(true)}>+</button>
					{showAddAllergyFrom && <AddAllergy handle={handleAddAllergy} /> }
				</div>

				

				<div className="profile-details-box profile-success">
					<h3>Succès</h3>
					<ul>
						<Success text="Succès 1" icon={<Success1 />} lock={false} />
						<Success text="Succès 2" icon={<Success1 />} lock={false} />
						<Success text="Succès 3" lock={true} />
					</ul>
				</div>
			</div>

			<div className="profile-btns">
				<button onClick={logout}>Se déconnecter</button>
				<button>Modifier</button>
			</div>
		</section>
	);
}

export default Profile;