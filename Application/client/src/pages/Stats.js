import React from "react";
import {Switch, Route, Redirect, Link} from "react-router-dom";

import Diary from '../components/stats/Diary/Diary';
import Menstruation from '../components/stats/Menstruation/Menstruation';
import Sleep from '../components/stats/Sleep/Sleep';
import BloodDonation from '../components/stats/BloodDonation/BloodDonation';
import Weight from '../components/stats/Weight/Weight';

import { ReactComponent as DiaryIcon }from '../media/icons/stats/diary.svg';

function Stats(props) {
	const url = props.match.path;
	return (
		<div className="StatsPage">
			<h1>Vos statistiques</h1>
			<div className="statContainer">
				<ul>
					<li><Link to={`${url}/diary`}>Journal</Link></li>
					<li><Link to={`${url}/weight`}>Poids</Link></li>
					<li><Link to={`${url}/sleep`}>Sommeil</Link></li>
					<li><Link to={`${url}/menstruation`}>Règles</Link></li>
					<li><Link to={`${url}/blood-donation`}>Dons du sang</Link></li>
				</ul>
				<Switch>
					<Route exact path={`${url}/diary`} component={Diary} />
					<Route exact path={`${url}/weight`} component={Weight} />
					<Route exact path={`${url}/sleep`} component={Sleep} />
					<Route exact path={`${url}/menstruation`} component={Menstruation} />
					<Route exact path={`${url}/blood-donation`} component={BloodDonation} />
				</Switch>
			</div>
		</div>
	);
}

export default Stats;