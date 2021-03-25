import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Diary from "../components/stats/Diary/Diary";
import Menstruation from "../components/stats/Menstruation/Menstruation";
import Sleep from "../components/stats/Sleep/Sleep";
import BloodDonation from "../components/stats/BloodDonation/BloodDonation";
import Weight from "../components/stats/Weight/Weight";

import { ReactComponent as DiaryIcon } from "../media/icons/stats/menu-book.svg";
import { ReactComponent as SleepIcon } from "../media/icons/stats/menu-sleep.svg";
import { ReactComponent as WeightIcon } from "../media/icons/stats/menu-weight.svg";
import { ReactComponent as BloodIcon } from "../media/icons/stats/menu-blood-donation.svg";
import { ReactComponent as PeriodIcon } from "../media/icons/stats/menu-menstrual-cycle.svg";

import TabItem from "../components/stats/Tab";
import { useUser } from "../utils/store";

function Stats(props) {
	let { user } = useUser();
	//On récupère le chemin du fichier
	const { url, path } = useRouteMatch();

	return (
		<section className="stats-section">
			<div className="stats-container">
				<ul className="stats-tabs">
					<TabItem destination={`${url}/diary`} text="Journal" icon={<DiaryIcon />} />
					<TabItem destination={`${url}/weight`} text="Poids" icon={<WeightIcon />} />
					<TabItem destination={`${url}/sleep`} text="Sommeil" icon={<SleepIcon />} />
					{user.sex === "F" && 
					<TabItem destination={`${url}/menstruation`} text="Règles" icon={<PeriodIcon />} />}
					<TabItem destination={`${url}/blood-donation`} text="Dons du sang" icon={<BloodIcon />} />
				</ul>
				<div className="stats-content">
					<Switch>
						<Route
							exact path={`${path}/diary`}
							render={(propsRender) => (
								<Diary {...propsRender} handleAlert={props.handleAlert} />
							)}
						/>
						<Route
							exact path={`${path}/weight`}
							render={(propsRender) => (
								<Weight {...propsRender} handleAlert={props.handleAlert} />
							)}
						/>
						<Route
							exact path={`${path}/sleep`}
							render={(propsRender) => (
								<Sleep {...propsRender} handleAlert={props.handleAlert} />
							)}
						/>
						{user.sex === "F" && 
						<Route
							exact path={`${path}/menstruation`}
							render={(propsRender) => (
								<Menstruation {...propsRender} handleAlert={props.handleAlert} />
							)}
						/>}
						<Route
							exact path={`${path}/blood-donation`}
							render={(propsRender) => (
								<BloodDonation {...propsRender} handleAlert={props.handleAlert} />
							)}
						/>
					</Switch>
				</div>
			</div>
		</section>
	);
}

export default Stats;
