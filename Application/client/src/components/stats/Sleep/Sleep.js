import React from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import SleepAdd from "./Sleep_add";
import {ReactComponent as ArrowIcon} from '../../../media/icons/next-arrow.svg';
import {useEffect, useState} from "react";
import {daysNames, monthsNames} from "../../../utils/date.js";


function Sleep(props) {

	let today = new Date();
	today = new Date(today.getFullYear(), today.getMonth(), today.getDate()-today.getDay()+1);
	const [currentDate, setCurrentDate] = useState(today);

	//On initialise notre liste de données
	let sleepDataDefault = [];
	for (let i = 0; i < 7; i++) {
		sleepDataDefault[i] = { _id: null, dateStart: today, dateEnd: today };
	}
	const [sleepData, setsleepData] = useState(sleepDataDefault);
	
	const dateWithoutTime = (date) => {
		date.setHours(0, 0, 0, 0);
		return date;
	};

	//se lance a chaque chargement
	useEffect(() => {

		//Récupération des informations de don
		const fetchSleep = async (dateStart, dateEnd) =>
		{
			const dataSleep = await axios.post('/api/sleep/findDate', {dateStart, dateEnd});

			//On récupère les données et les mets dans un tableau de la semaine
			//Case vide si pas de donnée et taille de 7 pour correspondre aux jours
			let dataTemp = [];
			for (let i = 0; i < 7; i++) {
				//Par défaut
				dataTemp[i] = {
					_id: null,
					dateStart: new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate()+i),
					dateEnd: new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate()+i)
				};

				//Avec les données (on remplace la donnée par défaut s'il y a une donnée)
				dataSleep.data.forEach((dayData) => {
					let date = new Date(dayData.dateStart);
					let correctGetDay = date.getDay()-1;
					correctGetDay = correctGetDay === -1 ? 6 : correctGetDay;
					if (correctGetDay == i) {
						let dateStartData = date;
						let dateEndData = new Date(dayData.dateEnd);
						dataTemp[i] = {_id: dayData._id, dateStart: dateStartData, dateEnd: dateEndData};
					}
				});
			}

			setsleepData(dataTemp);
		}

		let monday = currentDate.getDate() - currentDate.getDay() + 1;
		const month = currentDate.getMonth();
		const year = currentDate.getFullYear();
		
		//Premier jour de la semaine en cours
		let dateStart = new Date(year, month, monday);
		//Dernier jour de la semaine en cours
		let dateEnd = new Date(year, month, monday + 6);

		fetchSleep(dateStart, dateEnd);
	}, [currentDate]);
	
	const formatDate = (date) => {
		return date.getDate() + " "
		+ monthsNames[date.getMonth()] + " "
		+ date.getFullYear();
	}

	const formatHour = (date) => {
		let minute = date.getMinutes();
		let hour = date.getHours();

		if(hour < 10)
			hour = "0" + date.getHours();

		if(minute < 10)
			minute = "0" + date.getMinutes();

		return hour + ":" + minute;
	}

	//Get semaine prec et suiv
	const getPrevWeek = () => {
		let newDate = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() - 7 + 1));
		setCurrentDate(newDate);
	};

	const getNextWeek = () => {
		let newDate = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7 + 1));
		setCurrentDate(newDate);
	};

	//DONNEES
	//Heures de sommeil

	let lengthSleepWeek = [sleepData[0].dateEnd.getHours() - sleepData[0].dateStart.getHours(), sleepData[1].dateEnd.getHours() - sleepData[1].dateStart.getHours(), sleepData[2].dateEnd.getHours() - sleepData[2].dateStart.getHours(), sleepData[3].dateEnd.getHours() - sleepData[3].dateStart.getHours(), sleepData[4].dateEnd.getHours() - sleepData[4].dateStart.getHours(), sleepData[5].dateEnd.getHours() - sleepData[5].dateStart.getHours(), sleepData[6].dateEnd.getHours() - sleepData[6].dateStart.getHours()];

	let avgSleepWeek = 0, avgSleepWE = 0, avgSleepGlobal = 0;

	lengthSleepWeek.slice(0, 4).forEach(hour => {avgSleepWeek+=hour; avgSleepGlobal+=hour});
	lengthSleepWeek.slice(5, 6).forEach(hour => {avgSleepWE+=hour; avgSleepGlobal+=hour});
	avgSleepWeek /= 5;
	avgSleepWE /= 2;
	avgSleepGlobal /= 7;

	//Dates
	let dateLegend = [formatDate(sleepData[0].dateStart), formatDate(sleepData[1].dateStart), formatDate(sleepData[2].dateStart), formatDate(sleepData[3].dateStart), formatDate(sleepData[4].dateStart), formatDate(sleepData[5].dateStart), formatDate(sleepData[6].dateStart)];

	//Heures du coucher
	let hourSleepData = [formatHour(sleepData[0].dateStart), formatHour(sleepData[1].dateStart), formatHour(sleepData[2].dateStart), formatHour(sleepData[3].dateStart), formatHour(sleepData[4].dateStart), formatHour(sleepData[5].dateStart), formatHour(sleepData[6].dateStart)];

	//Heure du lever
	let hourWakeUpData = [formatHour(sleepData[0].dateEnd), formatHour(sleepData[1].dateEnd), formatHour(sleepData[2].dateEnd), formatHour(sleepData[3].dateEnd), formatHour(sleepData[4].dateEnd), formatHour(sleepData[5].dateEnd), formatHour(sleepData[6].dateEnd)];

	//Récupère la couleur principale
	let primaryColor = getComputedStyle(document.body).getPropertyValue('--main-color');
	let secondaryColor = getComputedStyle(document.body).getPropertyValue('--main-color-var1');


	//data graphique sommeil
	let dataChartBar = {
		labels: ['Lundi', 'Mardi','Mercredi', 'Jeudi','Vendredi', 'Samedi','Dimanche'],
			//axe des abscisses
			datasets: [{
				label: ["Heure de sommeil"],

				/*Données*/
				//Heures de sommeil
				data: lengthSleepWeek,
				//Dates
				data1: dateLegend,
				//Heure du coucher
				data2: hourSleepData,
				//Heure du lever
				data3: hourWakeUpData,
				//Styles
				maxBarThickness: 80,
				backgroundColor: primaryColor,
				hoverBackgroundColor: secondaryColor
			}]
		};

	//Option graphique sommeil
	let optionChartBar = {
		responsive: true,
		maintainAspectRatio: false, //Le graphique ne garde pas la même forme (bien pour le responsive)
		//Infobulle
		tooltips: {
			mode: 'label',
			intersect: false,
			//Affichage de la date dans l'infobulle
			callbacks: {
				afterLabel: function(tooltipItem, data) {
					return 'Date: ' + data.datasets[tooltipItem.datasetIndex].data1[tooltipItem.index] +
							'\nHeure du coucher: ' + data.datasets[tooltipItem.datasetIndex].data2[tooltipItem.index] +
							'\nHeure du lever: ' + data.datasets[tooltipItem.datasetIndex].data3[tooltipItem.index];
				},
			},
			backgroundColor: "#2f2f2f",
			titleFontFamily: "karla",
			titleFontStyle: 600,
			titleFontSize: 20,
			titleMarginBottom: 10,
			bodyFontFamily: "karla",
			bodyFontStyle: "600",
			bodyFontSize: 15
		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		legend: {
			position: 'bottom'
		},
		scales: {
			xAxes: [{
				gridLines: {display: false}, //Enlève grille de fond
				offset: true //décalage par rapport à l'origine
			}],
			yAxes: [{
				gridLines: {display: false},
				ticks: {
					beginAtZero: true,
					max: 12
				}
			}]
		},
		datasets: {
			bar: {
				categoryPercentage: 0.5 //Pourcentage de la largeur disponible pour chaque bar
			}
		}
	};

    const [showAddForm, setShowAddForm] = useState(false);

    return (
		<>
			<div className="calendar-header">
				<button onClick={getPrevWeek}><ArrowIcon /></button>
				<h3>{"Semaine du " + currentDate.getDate() + " " + monthsNames[currentDate.getMonth()] + " " + currentDate.getFullYear()}</h3>
				<button onClick={getNextWeek}><ArrowIcon /></button>
			</div>
			<h2>Sommeil</h2>
			<div className="data-recap">
				<div className="data-card">
					<p>Heure moyenne du réveil</p>
					<span>22:30</span>
				</div>
				<div className="data-card">
					<p>Heure moyenne du coucher</p>
					<span>2:30</span>
				</div>
				<div className="data-card">
					<p>Durée moyenne en semaine</p>
					<span>{Math.round(avgSleepWeek)}<small>h</small></span>
				</div>
				<div className="data-card">
					<p>Durée moyenne en week-end</p>
					<span>{Math.round(avgSleepWE)}<small>h</small></span>
				</div>
				<div className="data-card">
					<p>Durée moyenne total de la semaine</p>
					<span>{Math.round(avgSleepGlobal)}<small>h</small></span>
				</div>
				<div className="data-card">
					<p>Fluctuation moyenne du sommeil</p>
					<span>7<small>h</small></span>
				</div>						
			</div>

			<h2>Graphiques</h2>
			<div className="data-box">
				<h3>Nombre d'heures de sommeil</h3>
				<Bar data={dataChartBar} options={optionChartBar} />		
			</div>

			<div className="data-add">
				<button onClick={(event) => setShowAddForm(true)}> Ajouter </button>
				{showAddForm && <SleepAdd handleAlert={props.handleAlert} />}
			</div>
		</>
	);
}


export default Sleep;