import React from "react";
import { Line } from "react-chartjs-2";
import WeightAdd from "./Weight_add";
import {useEffect, useState} from "react";
import axios from "axios";

function Weight()
{
	//Data du graphique de poids
	let dataChart1 = {
			//axe des abscisses
			datasets: [{
				label: 'poids',
				//données
				data:[
					{
						t: 'Feb 5 2021',
						y: 57
					},
					{
						t: 'Mar 15 2021',
						y: 59.2
					},
					{
						t: 'May 25 2021',
						y: 58.9
					},
					{
						t: 'Aug 3 2021',
						y: 60.2
					}
				],
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
					min: 50,
					max: 65,
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
	
	//Data du graphique IMC
	let dataChart2 = {

			//axe des abscisses
			datasets: [{
				label: 'poids',
				//données
				data:[{
					t: 'Jan 21 2021',
					y: 18.2
				}, {
					t: 'Feb 2 2021',
					y: 18.3
				}, {
					t: 'Feb 23 2021',
					y: 18.4
				}, {
					t: 'Mar 25 2021',
					y: 18.3
				}, {
					t: 'May 26 2021',
					y: 18.3
				}
				],
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

	let poidsActu;
	let tailleActu;

	//se lance a chaque chargement
	useEffect(() => {
		let isMounted = true;

		//Récupération des informations de weight
		const fetchDon = async () =>
		{
			const dataWeight = await axios.get('/api/weights/', {withCredentials: true});
			if (isMounted) {
				poidsActu = dataWeight.mass;
				tailleActu = dataWeight.height;
			}
		}

		fetchDon();
		return () => { isMounted = false };
	});

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

    const [showAddForm, setShowAddForm] = useState(false);	

    return (
		<>
			<h2>Poids</h2>
			<div className="data-recap">
				<div className="data-card">
					<p>Poids</p>
					<span>10<small>kg</small></span>
				</div>
				<div className="data-card">
					<p>Taille</p>
					<span>{getTaille1(176)}<small>m</small>{getTaille2(176)}</span>
				</div>
				<div className="data-card">
					<p>IMC</p>
					<span>{getIMC(65,176)}</span>
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

			<div>
				<button onClick={(event) => setShowAddForm(true)}> Ajouter </button>
				{showAddForm && <WeightAdd />}
			</div>
		</>
	);
}


export default Weight;