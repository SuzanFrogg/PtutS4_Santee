import axios from "axios";
import React, { useState } from "react";

function EditProfile(props) {
	const [pseudo, setPseudo] = useState(props.user.pseudo);
	const [listVaccines, setListVaccines] = useState(props.vaccines.list);
	const [listAllergies, setListAllergies] = useState(props.allergies.list);

	/**
	 * Permet de gérer la modification des vaccins
	 * @param {String} vaccineId L'id du vaccin qu'on veut modifier
	 * @param {String} value La valeur changé qu'on va appliquer
	 * @param {String} keyName Le nom de la clé de ce qu'on veut changer dans l'objet
	 */
	 const handleEditVaccines = (vaccineId, value, keyName) => {
		setListVaccines((state) => {
			return state.map((item) => {
				if (vaccineId === item._id)
					return {...item, [keyName]: value};
				else
					return item;
			});
		});
	}
	const addVaccines = () => {
		setListVaccines((state) => {
			let objectToAdd = {
				doseMade: 0,
				doseNeeded: 1,
				name: "",
				possibleEndAge: 20,
				possibleStartAge: 0
			};
			if (state) {
				return [...state, objectToAdd];
			}
			else {
				return [objectToAdd];
			}
		});
	}

	const handleEditAllergies = (allergyId, value, keyName) => {
		setListAllergies((state) => {
			return state.map((item) => {
				if (allergyId === item._id)
					return {...item, [keyName]: value};
				else
					return item;
			});
		});
	}
	const addAllergies = () => {
		setListAllergies((state) => {
			let objectToAdd = {
				toAvoid: ""
			};
			if (state) {
				return [...state, objectToAdd];
			}
			else {
				return [objectToAdd];
			}
		});
	}

	const save = async () => {
		try {
			props.vaccines.set(listVaccines);
			props.allergies.set(listAllergies);
			await axios.put("/api/vaccines/all", {vaccines: listVaccines});
			await axios.put("/api/allergy/all", {allergies: listAllergies});
			props.handleAlert("success", "Les modifications ont bien été apporté au profil");
		}
		catch (err) {
			props.handleAlert("error", "Une erreur est survenue dans la modification du profil");
		}
	}

	return (
		<>
			<img className="profile-picture" src={`./uploads/profil/${props.user.picture}`} alt="profil" />
			<input 
				type="text"
				id="name"
				value={pseudo}
				onChange={(event) => setPseudo(event.target.value)}
			/>

			<div className="profile-info">
				<div className="profile-details-box profile-vaccines profile-edit">
					<h3>Vaccins</h3>
					<ul className="edit-list">
						{listVaccines && listVaccines.map((vaccine, key) => {
							return (
								<li key={key}>
									<input
										type="text"
										value={vaccine.name}
										onChange={(event) => handleEditVaccines(vaccine._id, event.target.value, "name")}
									/>
									<details>
										<summary>Détails</summary>
										<div className="edit-doseNeeded">
											<label>Doses nécessaires :</label>
											<input
												type="number"
												value={vaccine.doseNeeded}
												onChange={(event) => handleEditVaccines(vaccine._id, event.target.value, "doseNeeded")}
											/>
										</div>
										<div className="edit-doseMade">
											<label>Doses faites :</label>
											<input
												type="number"
												value={vaccine.doseMade}
												onChange={(event) => handleEditVaccines(vaccine._id, event.target.value, "doseMade")}
											/>
										</div>
										<div className="edit-possibleStartAge">
											<label>Age de début :</label>
											<input
												type="number"
												value={vaccine.possibleStartAge}
												onChange={(event) => handleEditVaccines(vaccine._id, event.target.value, "possibleStartAge")}
											/>
										</div>
										<div className="edit-possibleEndAge">
											<label>Age de fin :</label>
											<input
												type="number"
												value={vaccine.possibleEndAge}
												onChange={(event) => handleEditVaccines(vaccine._id, event.target.value, "possibleEndAge")}
											/>
										</div>
									</details>
								</li>
							)
						})}
					</ul>
					<button onClick={() => addVaccines()}>Ajouter</button>
				</div>

				<div className="profile-details-box profile-allergies profile-edit">
					<h3>Allergies</h3>
					<ul className="edit-list">
						{listAllergies && listAllergies.map((allergy, key) => {
							return (
							<li key={key}>
								<input
									type="text"
									value={allergy.toAvoid}
									onChange={(event) => handleEditAllergies(allergy._id, event.target.value, "toAvoid")}
								/>
							</li>)
						})}
					</ul>
					<button onClick={() => addAllergies()}>Ajouter</button>
				</div>
			</div>
			
			<div className="profile-btns">
				<button onClick={() => {save(); props.modal.setEditModal(false);}}>Enregistrer</button>
				<button onClick={() => props.modal.setEditModal(false)}>Annuler</button>
			</div>
		</>
	)
}

export default EditProfile;