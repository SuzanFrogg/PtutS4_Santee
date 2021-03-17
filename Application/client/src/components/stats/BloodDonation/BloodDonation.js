import React from "react";
import {ReactComponent as PocheSang} from '../../../media/icons/stats/Grand_blood_bag.svg';
import {ReactComponent as MiniPocheSang} from '../../../media/icons/stats/Mini_blood_bag.svg';
import BloodDonationAdd from "./BloodDonation_add";
import {useState} from "react";


function BloodDonation() {
    const [showAddForm, setShowAddForm] = useState(false);

	let donsSang;
	let donsPlasma;
	let donsPlaquette;
	let nbDon = 2;

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
						<MiniPocheSang id="miniPocheSang"/>
					</span>
				</div>
				<div className="data-card">
					<p>Nombre de don de plaquettes</p>
					<span>
						<MiniPocheSang id="miniPocheSang"/>
					</span>
				</div>
				<div className="data-card">
					<p>Nombre de don de plasma</p>
					<span>
						<MiniPocheSang id="miniPocheSang"/>
					</span>
				</div>
				<div className="data-card">
					<p>Nombre de personnes sauvées</p>
					<span>3</span>
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