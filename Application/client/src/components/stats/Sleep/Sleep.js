import React from "react";
import Chart from "chart.js";

function Sleep(){

	
	let BarChart = new Chart('myChart', {
		type: 'bar',
		data:{
			//axe des abscisses
			datasets: [{
				label: 'Heure de sommeil',
				//données
				data: [{
					t: 'Feb 21 2021',
					y: 5
				}, {
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
				}],
				backgroundColor:'rgb(50,144,255)',
				borderWidth:1,
				borderColor: '#777',
				hoverBorderColor:'#000',
				hoverBorderWidth:3,
			}]
		},
		options: {
			responsive: true,
			title: {
				display: true,
				text: "Nombre d'heures de sommeil"
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
						unit: 'week'
					}
				}],
				yAxes: [{
					ticks: {
						suggestedMin: 0,
						suggestedMax: 12
					}
				}]
			}
		}

	});	

	
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
					<h3>Fluctuation moyenne</h3>
					<p>données</p>
				</div>						
			</div>
			
			<div className="Chart">
				<canvas id="myChart" height="300" width="500"></canvas>		
			</div>	
		</div>

	);
}


export default Sleep;