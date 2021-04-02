import React from "react";
import { Line } from "react-chartjs-2";
import WeightAdd from "./Weight_add";
import {useEffect, useState} from "react";
import axios from "axios";
import {daysNames, monthsNames} from "../../../utils/date.js";

function Weight(props)
{

	const [userWeight, setUserWeight] = useState([{mass:0, height:0, entryDate: new Date()}]);

	useEffect(() => {

		const fetchDon = async () =>
		{
			const dataWeight = await axios.get('/api/weight/', {withCredentials: true});
			if (dataWeight.data.Weight.length !== 0){
				setUserWeight(dataWeight.data.Weight);
			}
		}
		fetchDon();
	}, []);

	const getDateProche = () => {
		let listDate = [];
		let dateJour = new Date();
		dateJour = dateJour.getTime() / 86400000;
		for (let i=0; i<(userWeight.length); i++) {
			let date1 = new Date(Date.parse(userWeight[i].entryDate));
			date1 = date1.getTime() / 86400000;
			listDate.push(date1);
		}

		let dateProche = listDate[0];
		let res = 0;
		let temp;
		for (let j=0; j<(listDate.length); j++) {
			temp = dateJour - listDate[j];
			if (temp<dateJour-dateProche){
				dateProche = listDate[j];
				res = j;
			}
		}
		return res;
	};

	const getPoids = (i) => {
		let res = userWeight[i].mass;
		return res;
	};

	const getTaille = (i) => {
		let res = userWeight[i].height;
		return res;
	};


	const getTaille1 = (taille) => {
		let taille1= 0;
		taille1 = Math.floor(taille/100);
		return taille1;
	};

	const getTaille2 = (taille) => {
		let taille2= 0;
		taille2 = taille % 100;
		return taille2;
	};

	const getIMC = (poids, taille) => {
		let IMC = 0;
		IMC = poids/ ((taille/100)^2);
		IMC = Math.round(IMC * 100)/100;
		return IMC;
	};

	//Max et Min poids == Bornes graphiques
	const getPoidsMax = () => {
		let max = 0;
		for(let i = 0; i < userWeight.length; i++)
		{
			if(userWeight[i].mass > max)
				max = userWeight[i].mass;
		}

		return max;
	};

	const getPoidsMin = () => {
		let min = 9999;
		for(let i = 0; i < userWeight.length; i++)
		{
			if(userWeight[i].mass < min)
				min = userWeight[i].mass;
		}

		return min;
	};

	let maxPoids = getPoidsMax() + 10;
	let minPoids = getPoidsMin() - 10;

	//Max et Min IMC == Bornes graphiques
	const getIMCMax = () => {
		let max = 0;
		for(let i = 0; i < userWeight.length; i++)
		{
			let imc = getIMC(userWeight[i].mass, userWeight[i].height);
			if(imc > max)
				max = imc;
		}
		return max;
	};

	const getIMCMin = () => {
		let min = 50;
		for(let i = 0; i < userWeight.length; i++)
		{
			let imc = getIMC(userWeight[i].mass, userWeight[i].height);
			if(imc < min)
				min = imc;
		}

		return min;
	};

	let maxIMC = getIMCMax() + 2;
	let minIMC = getIMCMin() - 2;

	//Classification imc
	const getClasseIMC = () => {
		let IMC = getIMC(getPoids(getDateProche()),getTaille(getDateProche()));

		if(IMC <= 18.5)
			return "Insuffisance pondérale";
		else if(IMC > 18.5 && IMC < 25)
			return "Corpulence normale";
		else if(IMC >= 25 && IMC < 30)
			return "Surpoids";
		else if(IMC >= 30)
			return "Obésité";
	};

	//Met les dates dans l'ordre
	const dateCroissante = () => {
		let list = [userWeight[0]];
		for (let i=1; i<(userWeight.length); i++) {
			let sortie = false;
			let a = 0;
			while (sortie === false){
				let date1 = new Date(Date.parse(userWeight[i].entryDate));
				date1 = date1.getTime() / 86400000;
				let date2 = new Date(Date.parse(list[a].entryDate));
				date2 = date2.getTime() / 86400000;
				
				if (date1<date2){
					if (a===0){
						list.unshift(userWeight[i]);
					} else {
						list.splice(a, 0, userWeight[i]);
					}
					sortie = true;
				} else if (a === list.length-1){
					list.push(userWeight[i]);
					sortie = true;
				} else {
					a++;
				}
			}
		}
		return list;
	};

	const getData1 = (liste) => {
		let data = [];
		
		for (let i=0; i<(liste.length); i++) {
			let date = new Date(Date.parse(liste[i].entryDate));
			data.push({t: date, y: liste[i].mass});
		}
		return data;
	};

	const getData2 = (liste) => {
		let data = [];
		
		for (let i=0; i<(liste.length); i++) {
			let date = new Date(Date.parse(liste[i].entryDate));
			data.push({t: date, y: getIMC(liste[i].mass, liste[i].height)});
		}
		return data;
	};
	
	//Récupère la couleur principale
	let primaryColor = getComputedStyle(document.body).getPropertyValue('--main-color');
	let secondaryColor = getComputedStyle(document.body).getPropertyValue('--main-color-var1');
	
//Data du graphique de poids
	let dataChart1 = {
			//axe des abscisses
			datasets: [{
				label: 'poids',
				//données

				data: getData1(dateCroissante()),
				borderWidth:3,
				borderColor: primaryColor,
				fill: false,
				lineTension: 0
			}]		
	};

	
	//Option du Graphique de poids
	let optionsChart1 = {
		responsive: true,
		maintainAspectRatio: false,
		tooltips: {
			mode: 'nearest',
			intersect: false,
			callbacks: {
				title: function(tooltipItem, data) {
					let date = new Date(tooltipItem[0].xLabel);
					let dateFormat = daysNames[date.getDay()] + " " + date.getDate() + " "
					+ monthsNames[date.getMonth()] + " " + date.getFullYear();
					return dateFormat;
				}
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
		scales: {
			xAxes: [{
				type: 'time',
				time: {
					unit: 'month'
				},
				ticks:{
					beginAtZero: true
				}
			}],
			yAxes: [{
				ticks: {
					min: minPoids,
					max: maxPoids,
					stepSize: 10
				}
			}]
		},
		legend: {
			position: 'bottom',
			labels: {
				fontColor: 'rgb(0,0,0)',
				fontSize: 15
			}
		},
		datasets: {
			bar: {
				categoryPercentage: 0.5 //Pourcentage de la largeur disponible pour chaque bar
			}
		}
	};			
	
	//Data du graphique IMC
	let dataChart2 = {

			//axe des abscisses
			datasets: [{
				label: 'IMC',
				//données
				data: getData2(dateCroissante()),
				borderWidth:3,
				borderColor: primaryColor,
				fill: false
			}
		]
	};

	//Option du graphique IMC
	let optionsChart2 = {
		responsive: true,
		maintainAspectRatio: false,
		tooltips: {
			mode: 'nearest',
			intersect: false,
			callbacks: {
				title: function(tooltipItem, data) {
					let date = new Date(tooltipItem[0].xLabel);
					let dateFormat = date.getDate() + " "
					+ monthsNames[date.getMonth()] + " " + date.getFullYear();
					return dateFormat;
				}
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
		scales: {
			xAxes: [{
				gridLines: {display: false},
				type: 'time',
				time: {
					unit: 'month'
				}
			}],
			yAxes: [{
				ticks: {
					min: minIMC,
					max: maxIMC,
					stepSize: 1
				}
			}]
		},
		legend: {
			position: 'bottom',
			labels: {
				fontColor: 'rgb(0,0,0)',
				fontSize: 15
			}
		}
	};	
    const [showAddForm, setShowAddForm] = useState(false);	

    return (
		<>
			<h2>Poids</h2>
			<div className="data-recap">
				<div className="data-card">
					<p>Poids</p>
					<span>{getPoids(getDateProche())}<small>kg</small></span>
				</div>
				<div className="data-card">
					<p>Taille</p>
					<span>{getTaille1(getTaille(getDateProche()))}<small>m</small>{getTaille2(getTaille(getDateProche()))}</span>
				</div>
				<div className="data-card">
					<p>IMC</p>
					<span>{getIMC(getPoids(getDateProche()),getTaille(getDateProche()))}</span>
				</div>	
				<div className="data-card">
					<p>Classe IMC</p>
					<span>{getClasseIMC()}</span>
				</div>	
			</div>
			
			<h2>Graphiques</h2>
			<div className="data-box">
				<h3>Courbe de poids</h3>
				<Line data={dataChart1} options={optionsChart1} />
			</div>
			<div className="data-box">
				<h3>Courbe IMC</h3>
				<Line data={dataChart2} options={optionsChart2} />
			</div>

			<div className="data-add">
				<button onClick={(event) => setShowAddForm(true)}> Ajouter </button>
				{showAddForm && <WeightAdd handleAlert={props.handleAlert} />}
			</div>

			
		</>
	);
}


export default Weight;