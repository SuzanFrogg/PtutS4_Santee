import React from "react";
import axios from "axios";
import {ReactComponent as PocheSang} from '../../../media/icons/stats/Grand_blood_bag.svg';
import {ReactComponent as MiniPocheSang} from '../../../media/icons/stats/Mini_blood_bag.svg';
import BloodDonationAdd from "./BloodDonation_add";
import {useEffect, useState} from "react";


function BloodDonation() {
    const [showAddForm, setShowAddForm] = useState(false);

	let listSang = [];
	let listPlasma = [];
	let listPlaquette = [];
	let nbDonSang = 3;
	let nbDonPlasma = 1;
	let nbDonPlaquette = 0;

	//se lance a chaque chargement
	useEffect(() => {
		let isMounted = true;

		//Récupération des informations de don
		const fetchDon = async () =>
		{
			const dataDons = await axios.get('/api/don/', {withCredentials: true});
			if (isMounted) {
				listSang = dataDons.data.DonsSang;
				listPlasma = dataDons.data.DonsPlasma;
				listPlaquette = dataDons.data.DonsPlaquette;
				/*for (const [index, value] of listSang.entries()) {
					nbDonSang++;
				  }
				  for (const [index, value] of listPlasma.entries()) {
					nbDonPlasma++;
				  }
				  for (const [index, value] of listPlaquette.entries()) {
					nbDonPlaquette++;
				  }*/
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

	const AjoutImgDon = (list) => {
		const imgDon = [];
		let nbItems = 3;
		for (let i=0; i<nbItems; i++) {
			imgDon.push(<MiniPocheSang id="miniPocheSang"/>);
		}	
		return imgDon;
	}

    return (
		<>
			<h2>Don du Sang</h2>
			<div className="data-recap">
				<div className="data-card" id="data-card">
					<p>Nombre de don de sang</p>
					<span id="span-img">
						{AjoutImgDon(listSang)}
					</span>
				</div>
				<div className="data-card">
					<p>Nombre de don de plasma</p>
					<span id="span-img">
						{AjoutImgDon(listPlasma)}
					</span>
				</div>
				<div className="data-card">
					<p>Nombre de don de plaquette</p>
					<span id="span-img">
						{AjoutImgDon(listPlaquette)}
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