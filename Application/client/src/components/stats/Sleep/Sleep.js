import React from "react";
import { Bar } from "react-chartjs-2";

function Sleep(){
	//DONNEES
	//Heures de sommeil

	let lunHeure = 8;
	let marHeure = 9;
	let merHeure = 5;
	let jeuHeure = 7;
	let venHeure = 6;
	let samHeure = 8;
	let dimHeure = 8;

	let moyHeureSem = (lunHeure + marHeure + merHeure + jeuHeure + venHeure)/5;
	let moyHeureWE = (samHeure + dimHeure)/2;

	//Dates

	let lunDate = 'Feb 22 2021';
	let marDate = 'Feb 23 2021';
	let merDate = 'Feb 24 2021';
	let jeuDate = 'Feb 25 2021';
	let venDate = 'Feb 26 2021';
	let samDate = 'Feb 27 2021';
	let dimDate = 'Feb 28 2021';

	//Heures du coucher

	let lunCoucher = '23:00';
	let marCoucher = '23:00';
	let merCoucher = '1:30';
	let jeuCoucher = '22:00';
	let venCoucher = '23:00';
	let samCoucher = '00:00';
	let dimCoucher = '23:30';

	//Heure du lever

	let lunLever = '7:00';
	let marLever = '8:00';
	let merLever = '6:30';
	let jeuLever = '5:00';
	let venLever = '5:00';
	let samLever = '8:00';
	let dimLever = '7:30';



	//data graphique sommeil
	let dataChartBar = {
		labels: ['Lundi', 'Mardi','Mercredi', 'Jeudi','Vendredi', 'Samedi','Dimanche'],
			//axe des abscisses
			datasets: [{
				label: ["Heure de sommeil"],

				//données
				//heures de sommeil
				data: [lunHeure,marHeure,merHeure,jeuHeure,venHeure,8,6],
				//dates
				data1: [lunDate,marDate,merDate,jeuDate,venDate,samDate,dimDate],
				//Heure du coucher
				data2: [lunCoucher,marCoucher,merCoucher,jeuCoucher,venCoucher,samCoucher,dimCoucher],
				//Heure du lever
				data3: [lunLever,marLever,merLever,jeuLever,venLever,samLever,dimLever],
				backgroundColor:'rgb(50,144,255)',
				borderWidth:1,
				borderColor: '#777',
				hoverBorderColor:'#000',
				hoverBorderWidth:3
			}]
		};

	//Option graphique sommeil
	let optionChartBar = {
		responsive: true,
		title: {
			display: true, //affiche le titre
			text: "Nombre d'heures de sommeil",
			fontSize: 30,
			fontColor: 'rgb(0,0,0)'
		},
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
				offset: true, //décalage par rapport à l'origine
				categoryPercentage: 0.5
			}],
			yAxes: [{
				ticks: {
					beginAtZero: true,
					max: 12
				}
			}]
		}		
	};	

    return (
		<div>
			<h2>Sommeil</h2>

			<div className="data-recap">
				<div className="data-case">
					<h3>Heure moyenne du réveil</h3>
					<p>données</p>
				</div>
				<div className="data-case">
					<h3>Heure moyenne du coucher</h3>
					<p>données</p>
				</div>
				<div className="data-case">
					<h3>Durée moyenne en semaine</h3>
					<p>{Math.round(moyHeureSem)}h</p>
				</div>
				<div className="data-case">
					<h3>Durée moyenne en week-end</h3>
					<p>{Math.round(moyHeureWE)}h</p>
				</div>
				<div className="data-case">
					<h3>Fluctuation moyenne du sommeil</h3>
					<p>données</p>
				</div>						
			</div>
			
			<div className="Chart">
				<Bar data={dataChartBar} options={optionChartBar}/>		
			</div>	
		</div>

	);
}


export default Sleep;