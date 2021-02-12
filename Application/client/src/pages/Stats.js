import React, { useState } from "react";

import Diary from '../components/stats/Diary/Diary';
import Menstruation from '../components/stats/Menstruation/Menstruation';
import Sleep from '../components/stats/Sleep/Sleep';
import BloodDonation from '../components/stats/BloodDonation/BloodDonation';
import Weight from '../components/stats/Weight/Weight';

import { ReactComponent as DiaryIcon }from '../media/icons/stats/diary.svg';

function Stats() {


	const [DiaryModal, setDiaryModal] = useState(true);
	const [WeightModal, setWeightModal] = useState(false);
	const [SleepModal, setSleepModal] = useState(false);
	const [MenstruationModal, setMenstruationModal] = useState(false);
	const [BloodDonationModal, setBloodDonationModal] = useState(false);

	const handleModals = (e) =>
	{
		setDiaryModal(false);
		setWeightModal(false);
		setSleepModal(false);
		setMenstruationModal(false);
		setBloodDonationModal(false);

		if(e.target.id == "diary")
		{
			setDiaryModal(true);
		}
		else if(e.target.id == "weight")
		{
			setWeightModal(true);
		}
		else if(e.target.id == "sleep")
		{
			setSleepModal(true);
		}
		else if(e.target.id == "menstruation")
		{
			setMenstruationModal(true);
		}
		else if(e.target.id == "bloodDonation")
		{
			setBloodDonationModal(true);
		}
	}
	


	return (
		<div classname="StatsPage">
			<h1>Vos statistiques</h1>
			<div className="statContainer">
				<ul>
					<li id="diary" onClick={handleModals}>Journal</li>
					<li id="weight" onClick={handleModals}>Poids</li>
					<li id="sleep" onClick={handleModals}>Sommeil</li>
					<li id="menstruation" onClick={handleModals}>Règles</li>
					<li id="bloodDonation" onClick={handleModals}>Dons du sang</li>
				</ul>
				{DiaryModal && <Diary />}
				{WeightModal && <Weight />}
				{SleepModal && <Sleep />}
				{MenstruationModal && <Menstruation />}
				{BloodDonationModal && <BloodDonation />}
			</div>
		</div>
	);
}

export default Stats;