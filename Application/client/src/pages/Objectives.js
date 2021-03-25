import React, { useEffect, useState } from "react";
import { useUser } from "../utils/store.js";
import axios from "axios";
import { daysNames, monthsNames } from "../utils/date.js";
import ModifyObjectives from "../components/objectives/modifyObjectives";
import DeleteObjectives from "../components/objectives/deleteObjectives";

function Objectives(props) {
	//user
	const {user} = useUser();

	//objectifs
	const [listObjectives, setListObjectives] = useState([]);

    const [refreshKey, setRefreshKey] = useState(0);
	let depObjectives = JSON.stringify(listObjectives);
	useEffect(() => 
	{
		let isMounted = true;

		//Initialiser objectifs
		const fetchObj = async () =>
		{
			//const response =  await axios.post('api/objectives/findDate', { "dateStartS" :  "1900-04-01T15:00:00.002Z", "dateEndS" :  "2021-02-28T15:23:59.002Z" });
			const response = await axios.get('/api/objectives/');
			if (isMounted) setListObjectives(response.data.objectives);
		}


		fetchObj();
		return () => { isMounted = false };
	}, [depObjectives, refreshKey]);



	//add
	const [obj, setObj] = useState("");
	const [dateEnd, setDateEnd] = useState("");

	//modify && delete
	const [showObjectivesForm, setObjectivesForm] = useState(false);
	const [objectifInstance, setObjectifInstance] = useState({});

	//modifier
	const [showModifyObjectivesForm, setModifyObjectivesForm] = useState(false);
	const handleModifyObjectives = (val) => setModifyObjectivesForm(val);

	//supprimer
	const [showDeleteObjectivesForm, setDeleteObjectivesForm] = useState(false);
	const handleDeleteObjectives =  (val) => setDeleteObjectivesForm(val);



    //fonction d'ajout
    const handleSubmitAdd = async (event) => 
	{
		event.preventDefault();
		try {
			if (obj === "" || dateEnd === "")
				throw Error("missing data");
			
			await axios.put("/api/objectives/", {obj, dateEnd}); //par default en non terminé 
			props.handleAlert("success", "Les données ont bien été ajoutées");

			//Permet de reéxécuter le useEffect donc de recharger les données
			setRefreshKey(oldKey => oldKey +1);
		}
		catch (err) {
			props.handleAlert("error", "L'ajout des données n'a pas pu être exécuté");
		}
    }

	//recuperer un objectif
	return (
		<section className="objectives-section">
			<h1>Objectifs</h1>

			<div className="data-box obj-section-left">
				<h2>Vos Objectifs</h2>
				{/*S'il y a pas de données on affiche un message*/}
				{(listObjectives || listObjectives === []) && <span>Vous n'avez pas encore d'objectifs</span>}
				<ul>
					{listObjectives && listObjectives.map((objectif, key) => {
						//terminé?
						let termine = "Non";
						if(objectif.isDone)
						{
							termine = "Oui";
						}

						//date
						let date =  new Date(objectif.dateEnd);

						//date de fin
						return <li onClick={(event) => {setObjectivesForm(true); setObjectifInstance(objectif)}} key={key}>{objectif.obj} 
							<ul> 
								<li>Terminé : {termine}</li>
								<li>Date de fin prévue : {daysNames[date.getDay()] + " " + date.getDate() + " " + monthsNames[date.getMonth()] + " " + date.getFullYear()}</li>
							</ul>
						</li>
					})}
				</ul>

				<div className="modify-objectives-form">
					{/* Formulaire modifier/delete*/}
					{showObjectivesForm && !showModifyObjectivesForm && <button onClick={(event) => {setModifyObjectivesForm(true);setObjectivesForm(false); }}>Modifier</button>}
					{showObjectivesForm && !showModifyObjectivesForm && <button onClick={(event) => {setDeleteObjectivesForm(true);setObjectivesForm(false); }}>Supprimer</button>}
					{showObjectivesForm && !showModifyObjectivesForm && <button onClick={(event) => setObjectivesForm(false)}>Annuler</button>}

					{showModifyObjectivesForm && <ModifyObjectives handle={handleModifyObjectives} obj={objectifInstance}/>}
					{showDeleteObjectivesForm && <DeleteObjectives handle={handleDeleteObjectives} obj={objectifInstance}/>}

				</div>
			</div> 

			<div className="data-add obj-section-right">
				<h2>Ajouter un objectif</h2>
				<form onSubmit={handleSubmitAdd} className="form-objectives">
					<label htmlFor="obj">Objectif : </label> 
					<input 
						type="text" 
						id="obj"
						value={obj}
						onChange={(event) => setObj(event.target.value)}
					/>

					<label htmlFor="dateEnd">Date limite pour atteindre l'objectif : </label> 
					<input 
						type="date" 
						id="dateEnd"
						value={dateEnd}
						onChange={(event) => setDateEnd(event.target.value)}
					/>

					<input type="submit" value="Ajouter" />
				</form>
			</div>
		</section>
	);
}

export default Objectives;