import React from "react";
import {Switch, Route, Link, useRouteMatch} from "react-router-dom";

import Diary from '../components/stats/Diary/Diary';
import Menstruation from '../components/stats/Menstruation/Menstruation';
import Sleep from '../components/stats/Sleep/Sleep';
import BloodDonation from '../components/stats/BloodDonation/BloodDonation';
import Weight from '../components/stats/Weight/Weight';

import { ReactComponent as DiaryIcon } from '../media/icons/stats/menu-book.svg';
import { ReactComponent as SleepIcon } from '../media/icons/stats/menu-sleep.svg';
import { ReactComponent as WeightIcon } from '../media/icons/stats/menu-weight.svg';
import { ReactComponent as BloodIcon } from '../media/icons/stats/menu-blood-donation.svg';
import { ReactComponent as PeriodIcon } from '../media/icons/stats/menu-menstrual-cycle.svg';

import TabItem from "../components/stats/Tab";

function Stats(props) {
	//On récupère le chemin du fichier
	const {url, path} = useRouteMatch();

	return (
		<section className="stats-section">
			<h1>Vos statistiques</h1>
			<div className="stats-container">
				<ul className="stats-tabs">
					<TabItem destination={`${url}/diary`} text="Journal" icon={<DiaryIcon />} />
					<TabItem destination={`${url}/weight`} text="Poids" icon={<WeightIcon />} />
					<TabItem destination={`${url}/sleep`} text="Sommeil" icon={<SleepIcon />} />
					<TabItem destination={`${url}/menstruation`} text="Règles" icon={<PeriodIcon />} />
					<TabItem destination={`${url}/blood-donation`} text="Dons du sang" icon={<BloodIcon />} />
				</ul>
				<div className="stats-content">
					<Switch>
						<Route exact path={`${path}/diary`} component={Diary} />
						<Route exact path={`${path}/weight`} component={Weight} />
						<Route exact path={`${path}/sleep`} component={Sleep} />
						<Route exact path={`${path}/menstruation`} component={Menstruation} />
						<Route exact path={`${path}/blood-donation`} component={BloodDonation} />
					</Switch>
				</div>
			</div>
		</section>
	);
}

export default Stats;