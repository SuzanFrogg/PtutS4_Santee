import React from "react";
import axios from "axios";
import MenstruationAdd from "./Menstruation_add";
import {useEffect, useState} from "react";

function Menstruation(props)
{
    const [showAddForm, setShowAddForm] = useState(false);

	const [userPeriods, setUserPeriods] = useState([]);
	//const [dateStartP, setDateStart] = useState(0);
	//const [dateEndP, setDateEnd] = useState(0);

	//se lance a chaque chargement
	useEffect(() => {
		let isMounted = true;

		//Récupération des informations de pperdiodes
		const fetchPeriod = async () =>
		{
			const dataPeriod = await axios.get('/api/periods/', {withCredentials: true});
			if (isMounted) {
				setUserPeriods(dataPeriod.data.periods);
				/*for (let i=0; i<(userPeriods.length); i++) {
					setDateStart(userPeriods[i].dateStart);
					setDateEnd(userPeriods[i].dateEnd);
				}*/
			}
		}

		fetchPeriod();
		return () => { isMounted = false };
	}, [userPeriods]);

	const dateDiff = (dateStart, dateEnd) => {
		let date1 = new Date(Date.parse(dateStart));
		let date2 = new Date(Date.parse(dateEnd));
		date1 = date1.getTime() / 86400000;
		date2 = date2.getTime() / 86400000;
		return new Number(date2 - date1).toFixed(0);
	}

	/*const getMoyCycle = (periods, dateStart, dateEnd) => {
		let moy = 0;
		let temp = 0;
		for (let i=0; i<(periods.length); i++) {
			temp += dateDiff(dateStart,dateEnd);
		}
		if (moy)
			moy = (temp / (periods.length));
		return moy;
	}*/

	const getMoyRegle = () => {
		let moy = 0;
		let somme = 0
		if(userPeriods != null && userPeriods.length != 0)
		{
			for(let i =0; i < userPeriods.length; i++)
			{
				let dateEnd = new Date(userPeriods[i].dateEnd);
				let dateStart = new Date(userPeriods[i].dateStart);

				let dif =dateDiff(dateStart,dateEnd) ;
				somme += parseInt(dif);
				
			}

			moy = somme / userPeriods.length;
		}
		
		return Math.round(moy);
	}

    return (
		<>
			<h2>Règles</h2>
			<div className="data-recap">
				{/*<div className="data-card">
					<p>Durée moyenne du cycle</p>
					<span>{getMoyCycle(userPeriods, dateStartP, dateEndP)}<small>j</small></span>
				</div> */}
				<div className="data-card">
					<p>Durée moyenne des règles</p>
					<span>{getMoyRegle()}<small>j</small></span>
				</div>					
			</div>
			<div className="data-add">
				<button onClick={(event) => setShowAddForm(true)}>Ajouter</button>
				{showAddForm && <MenstruationAdd handleAlert={props.handleAlert} />}
			</div>
		</>
	);
}

export default Menstruation;