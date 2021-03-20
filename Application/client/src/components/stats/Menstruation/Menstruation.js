import React from "react";
import axios from "axios";
import MenstruationAdd from "./Menstruation_add";
import {useEffect, useState} from "react";

function Menstruation()
{
    const [showAddForm, setShowAddForm] = useState(false);

	let userPeriods = [];
	let dateStartP = [];
	let dateEndP = [];

	//se lance a chaque chargement
	useEffect(() => {
		let isMounted = true;

		//Récupération des informations de don
		const fetchDon = async () =>
		{
			const dataDons = await axios.get('/api/periods/', {withCredentials: true});
			if (isMounted) {
				userPeriods = dataDons.data.periods;
				for (let i=0; i<(userPeriods.length); i++) {
					dateStartP = userPeriods[i].dateStart;
					dateEndP = userPeriods[i].dateEnd;
				}
			}
		}

		fetchDon();
		return () => { isMounted = false };
	});

	const getMoyCycle = (periods, dateStart, dateEnd) => {
		let moy = 0;
		return moy;
	}

	const getMoyRegle = (periods, dateStart, dateEnd) => {
		let moy = 0;
		let dS = dateStart;
		let dE = dateEnd;
		for (let i=0; i<(periods.length); i++) {
			moy += (dS[i] - dE[i]);
		}
		return moy;
	}

    return (
		<>
			<h2>Règles</h2>
			<div className="data-recap">
				<div className="data-card">
					<p>Durée moyenne du cycle</p>
					<span>{getMoyCycle(userPeriods, dateStartP, dateEndP)}<small>j</small></span>
				</div>
				<div className="data-card">
					<p>Durée moyenne des règles</p>
					<span>{getMoyRegle(userPeriods, dateStartP, dateEndP)}<small>j</small></span>
				</div>					
			</div>
			<div>
				<button onClick={(event) => setShowAddForm(true)}> Ajouter </button>
				{showAddForm && <MenstruationAdd />}
			</div>
		</>
	);
}


export default Menstruation;