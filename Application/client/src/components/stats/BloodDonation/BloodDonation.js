import React from "react";
import {ReactComponent as PocheSang} from '../../../media/icons/stats/Grand_blood_bag.svg';
import BloodDonation_add from "./BloodDonation_add";
import {useState} from "react";


function BloodDonation()
{	
    const [showAddForm, setShowAddForm] = useState(false);
    return (
		<>
			<h2>Don du Sang</h2>
			<div className="data-recap">
				<div className="data-card">
					<p>Nombre de don de sang</p>
					<span>3</span>
				</div>
				<div className="data-card">
					<p>Nombre de don de plaquettes</p>
					<span>3</span>
				</div>
				<div className="data-card">
					<p>Nombre de don de plasma</p>
					<span>3</span>
				</div>
				<div className="data-card">
					<p>Nombre de personnes sauvées</p>
					<span>3</span>
				</div>
			</div>
			
			<PocheSang/>

			<div>
				<button onClick={(event) => setShowAddForm(true)}> Ajouter </button>
				{showAddForm && <BloodDonation_add />}
			</div>
		</>
	);
}



export default BloodDonation;