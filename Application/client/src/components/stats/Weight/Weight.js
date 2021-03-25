import React from "react";
import { Line } from "react-chartjs-2";
import WeightAdd from "./Weight_add";
import {useEffect, useState} from "react";
import axios from "axios";

function Weight()
{
	

	const [userWeight, setUserWeight] = useState([{mass:0},{height:0},{entryDate: new Date()}]);

	useEffect(() => {
		let isMounted = true;

		const fetchDon = async () =>
		{
			const dataWeight = await axios.get('/api/weight/', {withCredentials: true});
			if (isMounted) {
				setUserWeight(dataWeight.data.Weight);
			}
			
		}
		fetchDon();
		return () => { isMounted = false };
	});

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
	}

	const getPoids = (i) => {
		let res = userWeight[i].mass;
		return res;
	}

	const getTaille = (i) => {
		let res = userWeight[i].height;
		return res;
	}


	const getTaille1 = (taille) => {
		let taille1= 0;
		taille1 = Math.floor(taille/100);
		return taille1;
	}

	const getTaille2 = (taille) => {
		let taille2= 0;
		taille2 = taille % 100;
		return taille2;
	}

	const getIMC = (poids, taille) => {
		let IMC = 0;
		IMC = poids/ ((taille/100)^2);
		IMC = Math.round(IMC * 100)/100;
		return IMC;
	}


	const dateCroissante = () => {
		let list = [userWeight[0]];
		for (let i=1; i<(userWeight.length); i++) {
			let sortie = false;
			let a = 0;
			while (sortie == false){
				let date1 = new Date(Date.parse(userWeight[i].entryDate));
				date1 = date1.getTime() / 86400000;
				let date2 = new Date(Date.parse(list[a].entryDate));
				date2 = date2.getTime() / 86400000;
				
				if (date1<date2){
					if (a==0){
						list.unshift(userWeight[i]);
					} else {
						list.splice(a, 0, userWeight[i]);
					}
					sortie = true;
				} else if (a == list.length-1){
					list.push(userWeight[i]);
					sortie = true;
				} else {
					a++;
				}
			}
		}
		return list;
		

	}

	const getData1 = (liste) => {
		let data = [];
		
		for (let i=0; i<(liste.length); i++) {
			let date = new Date(Date.parse(liste[i].entryDate));
			data.push({t: date, y: liste[i].mass});
		}
		return data;
	}

	const getData2 = (liste) => {
		let data = [];
		
		for (let i=0; i<(liste.length); i++) {
			let date = new Date(Date.parse(liste[i].entryDate));
			data.push({t: date, y: getIMC(liste[i].mass, liste[i].height)});
		}
		return data;
	}
	
//Data du graphique de poids
	let dataChart1 = {
			//axe des abscisses
			datasets: [{
				label: 'poids',
				//données

				data: getData1(dateCroissante()),
				borderWidth:3,
				borderColor: 'rgb(255,155,255)',
				fill: false

			}]		
	};

	//Option du Graphique de poids
	let optionsChart1 = {
		responsive: true,
		tooltips: {
			mode: 'index',
			intersect: false,
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
					min: 10,
					max: 130,
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
				borderColor: 'rgb(255,0,255)',
				fill: false

			},
			{
				label: 'IMC minimum',
				//données
				data:[{
					t: 'Jan 1 2021',
					y: 18
				}, {
					t: 'Dec 31 2021',
					y: 18
				}],
				borderWidth:3,
				borderColor: 'rgb(0,255,255)',
				fill: false

			},{
				label: 'IMC maximum',
				//données
				data:[{
					t: 'Jan 1 2021',
					y: 25
				}, {
					t: 'Dec 31 2021',
					y: 25
				}
				],
				borderWidth:3,
				borderColor: 'rgb(255,255,0)',
				fill: false

			}
		]
	};

	//Option du graphique IMC
	let optionsChart2 = {
		responsive: true,
			tooltips: {
				mode: 'index',
				intersect: false,
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
					}
				}],
				yAxes: [{
					ticks: {
						min: 15,
						max: 30,
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
				{showAddForm && <WeightAdd />}
			</div>
		</>
	);
}


export default Weight;