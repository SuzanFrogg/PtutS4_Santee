import React from "react";
import axios from "axios";
import {ReactComponent as PocheSang} from '../../../media/icons/stats/Grand_blood_bag.svg';
import {ReactComponent as MiniPocheSang} from '../../../media/icons/stats/Mini_blood_bag.svg';
import BloodDonationAdd from "./BloodDonation_add";
import {useEffect, useState} from "react";


function BloodDonation() {
    const [showAddForm, setShowAddForm] = useState(false);

	let listSang;
	let listPlasma;
	let listPlaquette;

	//se lance a chaque chargement
	useEffect(() => {
		let isMounted = true;

		//Récupération des informations de don
		const fetchDon = async () =>
		{
			const dataDons = await axios.get('/api/don/');
			if (isMounted) {
				listSang = dataDons.data.DonsSang;
				listPlasma = dataDons.data.DonsPlasma;
				listPlaquette = dataDons.data.DonsPlaquette;
			}
		}

		fetchDon();
		return () => { isMounted = false };
	});
	
	const nbDonSang = 2;

	const getNbPersoSauver = (listSang, listPlasma, listPlaquette) => {
		const nb = 3;
		//Calcul du nombre de personne sauver
		return nb;
	}

	const Clone_Element = (dv) => {
		var O_Clone = dv.cloneNode(true);
		document.getElementById("miniPocheSang").appendChild( O_Clone);
	}

	const getNbDonSang = (listSang) => {
		const nb = 0;
		for(let i = 0; i < nb; i++){
			//document.getElementById("miniPocheSang");
		}
		return nb;
	}

	const getNbDonPlasma = (listPlasma) => {
		const nb = 1;
		for(let i = 0; i < nb; i++){
			//document.getElementById("miniPocheSang");
		}
		return nb;
	}

	const getNbDonPlaquette = (listPlaquette) => {
		let nb = 1;
		for(let i = 0; i < nb; i++){
			//document.getElementById("miniPocheSang");
		}
		return nb;
	}

	/*for(let i = 0; i < nbDon; i++){
		//Recup objet destination
		let divDon = document.getElementById("data-card");
		//Cretation image
		let imgDon = document.createElement('img');
		//Ajout image
		divDon.appendChild(imgDon);
		//Affecte l'image
		imgDon.src = "../../../media/icons/stats/Mini_blood_bag.svg";
	}*/

    return (
		<>
			<h2>Don du Sang</h2>
			<div className="data-recap">
				<div className="data-card" id="data-card">
					<p>Nombre de don de sang</p>
					<span>
						{getNbDonSang(listSang)}
						<MiniPocheSang id="miniPocheSang"/>
					</span>
				</div>
				<div className="data-card">
					<p>Nombre de don de plasma</p>
					<span>
						{getNbDonPlasma(listPlasma)}
						<MiniPocheSang id="miniPocheSang"/>
					</span>
				</div>
				<div className="data-card">
					<p>Nombre de don de plaquette</p>
					<span>
						{getNbDonPlaquette(listPlaquette)}
						<MiniPocheSang id="miniPocheSang"/>
					</span>
				</div>
				<div className="data-card">
					<p>Nombre de personnes sauvées</p>
					<span>{getNbPersoSauver(listSang, listPlasma, listPlaquette)}</span>
				</div>
			</div>

			<PocheSang/>

			<div>
				<button onClick={(event) => setShowAddForm(true)}> Ajouter </button>
				{showAddForm && <BloodDonationAdd />}
			</div>
		</>
	);
}

export default BloodDonation;