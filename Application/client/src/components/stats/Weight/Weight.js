import React from "react";
import { Line } from "react-chartjs-2";

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
		title: {
			display: true,
			text: 'Courbe de poids',
			fontSize: 30,
			fontColor: 'rgb(0,0,0)'
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
			title: {
				display: true,
				text: 'Courbe IMC',
				fontSize: 30,
				fontColor: 'rgb(0,0,0)'
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

			<Line data={dataChart1} options={optionsChart1} />
			<Line data={dataChart2} options={optionsChart2}/>
		</div>
	);
}


export default Weight;