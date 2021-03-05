import React from "react";
import {ReactComponent as PocheSang} from '../../../media/icons/stats/Grand_blood_bag.svg';

function BloodDonation()
{	
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
		</>
	);
}



export default BloodDonation;