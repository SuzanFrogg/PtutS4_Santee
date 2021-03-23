import React from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import SleepAdd from "./Sleep_add";
import {ReactComponent as ArrowIcon} from '../../../media/icons/next-arrow.svg';
import {useEffect, useState} from "react";
import {daysNames, monthsNames} from "../../../utils/date.js";


function Sleep(){

	let today = new Date();
	today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
	const [currentDate, setCurrentDate] = useState(today);	
	const [sleepData, setsleepData] = useState([]);

	//se lance a chaque chargement
	useEffect(() => {

		//Récupération des informations de don
		const fetchSleep = async () =>
		{
			const dataSleep = await axios.get('/api/sleep/', {withCredentials: true});
			setsleepData(dataSleep.data);
		}

		fetchSleep();
		console.log(sleepData);
	}, [currentDate]);
	
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

	let lengthSleepWeek = [8, 9, 5, 7, 6, 8, 6];

	let avgSleepWeek = 0, avgSleepWE = 0, avgSleepGlobal = 0;

	lengthSleepWeek.slice(0, 4).forEach(hour => {avgSleepWeek+=hour; avgSleepGlobal+=hour});
	lengthSleepWeek.slice(5, 6).forEach(hour => {avgSleepWE+=hour; avgSleepGlobal+=hour});
	avgSleepWeek /= 5;
	avgSleepWE /= 2;
	avgSleepGlobal /= 7;

	//Dates
	let dateLegend = ["Feb 22 2021", "Feb 23 2021", "Feb 24 2021", "Feb 25 2021", "Feb 26 2021", "Feb 27 2021", "Feb 28 2021"];

	//Heures du coucher
	let hourSleepData = ["23:00", "23:00", "1:30", "22:00", "23:00", "00:00", "23:30"];

	//Heure du lever
	let hourWakeUpData = ["7:00", "8:00", "6:30", "5:00", "5:00", "8:00", "7:30"];

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
			titleFontStyle: 800,
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
				<h3>{daysNames[currentDate.getDay()] + " " + currentDate.getDate() + " " + monthsNames[currentDate.getMonth()] + " " + currentDate.getFullYear()}</h3>
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
				{showAddForm && <SleepAdd />}
			</div>
		</>
	);
}


export default Sleep;