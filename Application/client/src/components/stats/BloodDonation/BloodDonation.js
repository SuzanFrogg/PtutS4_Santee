import React from "react";
import axios from "axios";
//import {ReactComponent as PocheSang} from '../../../media/icons/stats/Grand_blood_bag.svg';
import {ReactComponent as MiniPocheSang} from '../../../media/icons/stats/Mini_blood_bag.svg';
import BloodDonationAdd from "./BloodDonation_add";
import {useEffect, useState} from "react";


function BloodDonation(props) {
    const [showAddForm, setShowAddForm] = useState(false);

	const [listSang, setListSang] = useState([]);
	const [listPlasma, setListPlasma] = useState([]);
	const [listPlaquette, setListPlaquette] = useState([]);
	const [nbDonSang, setNbDonSang] = useState(0);
	const [nbDonPlasma, setNbDonPlasma] = useState(0);
	const [nbDonPlaquette, setNbDonPlaquette] = useState(0);
	
	//se lance a chaque chargement
	useEffect(() => {
		let isMounted = true;

		//Récupération des informations de don
		const fetchDon = async () =>
		{
			const dataDons = await axios.get('/api/don/', {withCredentials: true});
			if (isMounted) {
				setListSang(dataDons.data.DonsSang);
				setListPlasma(dataDons.data.DonsPlasma);
				setListPlaquette(dataDons.data.DonsPlaquette);
				setNbDonSang(dataDons.data.DonsSang.length);
				setNbDonPlasma(dataDons.data.DonsPlasma.length);
				setNbDonPlaquette(dataDons.data.DonsPlaquette.length);
			}
		}

		fetchDon();
		return () => { isMounted = false };
	}, [nbDonSang, nbDonPlasma, nbDonPlaquette]);

	const getNbPersoSauver = (nbDonSang, nbDonPlasma, nbDonPlaquette) => {
		let nbSauver = 0;
		nbSauver += (nbDonSang*3)+(nbDonPlasma*3)+(nbDonPlaquette*3);
		return nbSauver;
	}

	const AjoutImgDon = (nbDons) => {
		const imgDon = [];
		for (let i=0; i<nbDons; i++) {
			imgDon.push(<MiniPocheSang className="miniPocheSang" key={i} />);
		}
		return (nbDons === 0) ? "0" : imgDon;
	}

    return (
		<>
			<h2>Don du Sang</h2>
			<div className="data-recap">
				<div className="data-card" id="data-card">
					<p>Nombre de don de sang</p>
					<span>{AjoutImgDon(nbDonSang)}</span>
				</div>
				<div className="data-card">
					<p>Nombre de don de plasma</p>
					<span>{AjoutImgDon(nbDonPlasma)}</span>
				</div>
				<div className="data-card">
					<p>Nombre de don de plaquette</p>
					<span>{AjoutImgDon(nbDonPlaquette)}</span>
				</div>
				<div className="data-card">
					<p>Nombre de personnes sauvées</p>
					<span>{getNbPersoSauver(nbDonSang, nbDonPlasma, nbDonPlaquette)}</span>
				</div>
			</div>

			<div className="data-add">
				<button onClick={(event) => setShowAddForm(true)}> Ajouter </button>
				{showAddForm && <BloodDonationAdd handleAlert={props.handleAlert} />}
			</div>
		</>
	);
}

export default BloodDonation;