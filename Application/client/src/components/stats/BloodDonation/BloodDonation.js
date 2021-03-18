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
	let nbDonSang = 3;
	let nbDonPlasma = 1;
	let nbDonPlaquette = 0;

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
				/*listSang.forEach((don) => {
					nbDonSang++;
				});
				listPlasma.forEach((don) => {
					nbDonPlasma++;
				});
				listPlaquette.forEach((don) => {
					nbDonPlaquette++;
				});*/
			}
		}

		fetchDon();
		return () => { isMounted = false };
	});

	const getNbPersoSauver = (nbDonSang, nbDonPlasma, nbDonPlaquette) => {
		let nbSauver = 0;
		nbSauver += (nbDonSang*3)+(nbDonPlasma*3)+(nbDonPlaquette*3);
		return nbSauver;
	}

	const AjoutImgDon = (nbDon) => {
		/*for(let i = 0; i < nbDon; i++){
			var el = document.getElementById("data-card");
   			el.innerHTML='<MiniPocheSang id=miniPocheSang/>';
		}*/
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
				<div className="data-card" id="data-card1">
					<p>Nombre de don de sang</p>
					<span id="test">
						{AjoutImgDon(nbDonSang)}
						<MiniPocheSang id="miniPocheSang"/>
					</span>
				</div>
				<div className="data-card">
					<p>Nombre de don de plasma</p>
					<span>
						{AjoutImgDon(nbDonPlasma)}
						<MiniPocheSang id="miniPocheSang"/>
					</span>
				</div>
				<div className="data-card">
					<p>Nombre de don de plaquette</p>
					<span>
						{AjoutImgDon(nbDonPlaquette)}
						<MiniPocheSang id="miniPocheSang"/>
					</span>
				</div>
				<div className="data-card">
					<p>Nombre de personnes sauvées</p>
					<span>{getNbPersoSauver(nbDonSang, nbDonPlasma, nbDonPlaquette)}</span>
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