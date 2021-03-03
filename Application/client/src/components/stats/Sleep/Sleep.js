import React from "react";
import { Bar } from "react-chartjs-2";

function Sleep(){

	//data graphique sommeil
	let dataChartBar = {
			//axe des abscisses
			datasets: [{
				label: "Heure de sommeil",
				
				labels: ["Lundi", 'Mardi', 'Mercredi', 'Vendredi', 'Samedi', 'Dimanche'],

				//données
				data: [{
					t: 'Feb 22 2021',
					y: 8
				}, {
					t: 'Feb 23 2021',
					y: 7
				}, {
					t: 'Feb 24 2021',
					y: 9
				}, {
					t: 'Feb 25 2021',
					y: 8
				}, {
					t: 'Feb 26 2021',
					y: 9
				}, {
					t: 'Feb 27 2021',
					y: 8
				}, {
					t: 'Feb 28 2021',
					y: 9
				}],
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
			display: true,
			text: "Nombre d'heures de sommeil",
			fontSize: 30,
			fontColor: 'rgb(0,0,0)'
		},
		tooltips: {
			mode: 'index',
			intersect: false
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
				type: 'time',
				time: {
					//Affiche un jour
					unit: 'day'
				},
				ticks: {
					display: true
				},
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
					<p>données</p>
				</div>
				<div className="data-case">
					<h3>Durée moyenne en week-end</h3>
					<p>données</p>
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