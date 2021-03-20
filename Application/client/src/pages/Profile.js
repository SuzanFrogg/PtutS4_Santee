import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../utils/store.js";
import Success from '../components/profile/Success';
import EditProfile from "../components/profile/EditProfile.js";
import { ReactComponent as Success1 } from "../media/icons/health-insurance.svg"; //Succès exemple, à supp


function Profile() {
	const { user, setUser } = useUser();
	const [listVaccines, setListVaccines] = useState([]);
	const [listAllergies, setListAllergies] = useState([]);
	//Modale gérant l'affichage de la modification du profil
	const [editModal, setEditModal] = useState(false);
	
	let depVaccines = JSON.stringify(listVaccines);
	let depAllergies = JSON.stringify(listAllergies);
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
	}, [depVaccines, depAllergies]);


	//Deconnexion
	const logout = async () => {
		await axios.get("/api/user/logout", { withCredentials: true });
		setUser({email: "--"});
		window.location = "/";
	};

	//Avoir l'age de la personne en fonction de sa date de naissance
	const getAge = (birthDate) => {
		let ageDifMs = Date.now() - birthDate.getTime();
		let ageDate = new Date(ageDifMs);
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}

	let expTotale = 100;

	return (
		<section className="profile-section">
			{editModal ? 
			<>
				<EditProfile user={user} allergies={listAllergies} vaccines={listVaccines} />
				<div className="profile-btns">
					<button onClick={() => setEditModal(false)}>Annuler</button>
				</div>
			</>
			:
			<>
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
								return <li key={key}>{vaccine.name}</li>
							})}
						</ul>
					</div>

					<div className="profile-details-box profile-details">
						<h3>Informations</h3>
						<span>Sexe : {user.sex}</span>
						<span>Age : {getAge(new Date(user.birth))} ans</span>
					</div>

					<div className="profile-details-box profile-allergies">
						<h3>Allergies</h3>
						{listAllergies ? 
							<ul>
								{listAllergies.map((allergy, key) => {
									return <li key={key}>{allergy.toAvoid}</li>
								})}
							</ul>
						:
							<span>Pas d'allergies</span>
						}
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
					<button onClick={() => setEditModal(true)}>Modifier</button>
				</div>
			</>}
		</section>
	);
}

export default Profile;