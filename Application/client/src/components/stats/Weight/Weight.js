import React from "react";
import Chart from 'chart.js';

function Weight()
{
	let Chart1 = new Chart('weightChart', {
		type: 'line',
		data:{
			//axe des abscisses
			//labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'],
			datasets: [{
				label: 'poids',
				//données
				data:[{
					t: 'Jan 21 2021',
					y: 57
				}, {
					t: 'Feb 2 2021',
					y: 59
				}, {
					t: 'Feb 23 2021',
					y: 58
				}, {
					t: 'Mar 25 2021',
					y: 60
				}, {
					t: 'May 26 2021',
					y: 61
				}
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
				xAxes: [{
					type: 'time',
					time: {
						unit: 'month'
					}
				}],
				yAxes: [{
					ticks: {
						suggestedMin: 50,
						suggestedMax: 65,
						stepSize: 1
					}
				}]
			}
		}
	});

	let Chart2 = new Chart('imcChart', {
		type: 'line',
		data:{
			//axe des abscisses
			//labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'],
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
				xAxes: [{
					type: 'time',
					time: {
						unit: 'month'
					}
				}],
				yAxes: [{
					ticks: {
						suggestedMin: 15,
						suggestedMax: 30,
						stepSize: 1
					}
				}]
			}
		}
	
	});

	

    return (
		<div>
			<h2>Poids</h2>

			<div className="data-recap">
				<div className="data-case">
					<h3>Poids</h3>
					<p>données</p>
				</div>
				<div className="data-case">
					<h3>Taille</h3>
					<p>données</p>
				</div>
				<div className="data-case">
					<h3>IMC</h3>
					<p>données</p>
				</div>						
			</div>

			<canvas id="weightChart" height="300" width="500"></canvas>
			<canvas id="imcChart" height="300" width="500"></canvas>

		</div>
	);
}


export default Weight;