import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../utils/store.js";
import Success from '../components/profile/Success';
import EditProfile from "../components/profile/EditProfile.js";
import { ReactComponent as Success1 } from "../media/icons/health-insurance.svg"; //Succès exemple, à supp


function Profile(props) {
	const { user, setUser } = useUser();
	const [listVaccines, setListVaccines] = useState([]);
	const [listAllergies, setListAllergies] = useState([]);
	//Modale gérant l'affichage de la modification du profil
	const [editModal, setEditModal] = useState(false);
	
	let depVaccines = JSON.stringify(listVaccines);
	let depAllergies = JSON.stringify(listAllergies);

	//succès
	const [listSuccess, setSuccess] = useState([]);
    const [listSuccessDone] = useState([]);

	const [conditionSuccess] = useState([]);
	const [listDon, setlistDon] = useState([]);



	useEffect(() => {
		let isMounted = true;

		//Initialiser vaccins
		const fetchVaccin = async () =>
		{
			const response = await axios.get('/api/vaccines/');
			if (isMounted) {
				if (response.data.vaccines) setListVaccines(response.data.vaccines);
				else setListVaccines([]);
			}
		}

		//Initialiser allergies
		const fetchAllergy = async () =>
		{
			const response = await axios.get('/api/allergy/');
			if (isMounted) {
				if (response.data.allergies) setListAllergies(response.data.allergies);
				else setListAllergies([]);
			}
		}

		const fetchSuccess = async () =>
		{
			const response = await axios.get("/api/success");
			if (isMounted) {
				if (response.data) setSuccess(response.data);
				else setSuccess([]);
				
			}
		}

		const fetchDon = async () =>
		{
			const response = await axios.get("/api/don");
			if (isMounted) {
				if (response.data) setlistDon(response.data);
				else setlistDon([]);
				
			}
		}


		fetchDon();
		fetchSuccess();
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

	const addXp = async (xp) => {
		await axios.put(`/api/user/xp/${user._id}`, {xp});
	}

	//Avoir l'age de la personne en fonction de sa date de naissance
	const getAge = (birthDate) => {
		let ageDifMs = Date.now() - birthDate.getTime();
		let ageDate = new Date(ageDifMs);
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}
	
	const setConditionsSuccess = () =>
	{
		if(listDon.length >= 1)
		{
			conditionSuccess.push(true);
		}
		else 
		{
			conditionSuccess.push(false);
		}
	}

	const setListSuccessDone = () =>
		{
		}

	let xpLevel = 100;
	let levelUser = user.xp / xpLevel;
	setConditionsSuccess();

	console.log(conditionSuccess);


	return (
		<section className="profile-section">
			{editModal ?
				<EditProfile
					user={user}
					allergies={{list: listAllergies, set: setListAllergies}}
					vaccines={{list: listVaccines, set: setListVaccines}}
					modal={{editModal, setEditModal}}
					handleAlert={props.handleAlert}
				/>
			:
			<>
				<img className="profile-picture" src={`./uploads/profil/${user.picture}`} alt="profil" />
				<h2>{user.pseudo}</h2>

				<div className="profile-info">
					<div className="level-container">
						<div className="level">
							<div className="progress" style={{width: (user.xp * 100 / xpLevel) + "%"}}></div>
						</div>
						<div className="level-numbers">
							<span>{levelUser}</span>
							<span>{levelUser+1}</span>
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
							{/*<Success text="Succès 1" icon={<Success1 />} lock={false} />
							<Success text="Succès 2" icon={<Success1 />} lock={false} />
							<Success text="Succès 3" lock={true} />*/}
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