import React from "react";
import {ReactComponent as PocheSang} from '../../../media/icons/stats/Grand_blood_bag.svg';

function BloodDonation()
{	
    return (
		<div>
			<h2>Don du Sang</h2>

			<div className="data-recap">
				<div className="data-case">
					<h3>Nombre de don de sang</h3>
					<p>données</p>
				</div>
				<div className="data-case">
					<h3>Nombre de don de plaquettes</h3>
					<p>données</p>
				</div>
				<div className="data-case">
					<h3>Nombre de don de plasma</h3>
					<p>données</p>
				</div>
				<div className="data-case">
					<h3>Nombre de personnes sauvées</h3>
					<p>données</p>
				</div>
			</div>
			
			<PocheSang/>
		</div>
	);
}



export default BloodDonation;