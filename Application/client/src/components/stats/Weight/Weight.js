import React from "react";
import Chart from 'chart.js';

function Weight()
{
	let Chart1 = new Chart('weightChart', {
		type: 'line',
		data:{
			//axe des abscisses
			labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'],
			datasets: [{
				label: 'poids',
				//données
				data:[
					67,
					68,
					70,
					69,
					69,
					70,
					71
				],
				borderWidth:3,
				borderColor: 'rgb(255,155,255)',
				fill: false

			}]

		},
		options: {
			responsive: true,
			title: {
				display: true,
				text: 'Courbe de poids'
			},
			tooltips: {
				mode: 'index',
				intersect: false,
			},
			hover: {
				mode: 'nearest',
				intersect: true
			},
			scales: {
				min: 60,
				max: 80
			}
		}
	});

	let Chart2 = new Chart('imcChart', {
		type: 'line',
		data:{
			//axe des abscisses
			labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'],
			datasets: [{
				label: 'poids',
				//données
				data:[
					22,
					22.5,
					22.3,
					22.3,
					22.2,
					22.3,
					22.4
				],
				borderWidth:3,
				borderColor: 'rgb(255,0,255)',
				fill: false

			},
			{
				label: 'IMC minimum',
				//données
				data:[
					18,
					18,
					18,
					18,
					18,
					18,
					18
				],
				borderWidth:3,
				borderColor: 'rgb(0,255,255)',
				fill: false

			},{
				label: 'IMC maximum',
				//données
				data:[
					25,
					25,
					25,
					25,
					25,
					25,
					25
				],
				borderWidth:3,
				borderColor: 'rgb(255,255,0)',
				fill: false

			}
		]},
		options: {
			responsive: true,
			title: {
				display: true,
				text: 'Courbe IMC'
			},
			tooltips: {
				mode: 'index',
				intersect: false,
			},
			hover: {
				mode: 'nearest',
				intersect: true
			},
			scales: {
				min: 15,
				max: 30
			}
		}
	
	});

	

    return (
		<div>
			<h2>Poids</h2>

			<canvas id="weightChart" height="300" width="500"></canvas>
			<canvas id="imcChart" height="300" width="500"></canvas>

		</div>
	);
}


export default Weight;