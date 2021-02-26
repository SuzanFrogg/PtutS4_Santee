import React from "react";
import Chart from "chart.js";

function Sleep(){

	let BarChart = new Chart('myChart', {
		type: 'bar',
		data:{
			//axe des abscisses
			labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
			datasets: [{
				label: 'Heure de sommeil',
				//données
				data:[
					7,
					6,
					9,
					8,
					7,
					9,
				],
				backgroundColor:[
					'rgba(50,144,255,0.6)',
					'rgba(50,144,255,0.6)',
					'rgba(50,144,255,0.6)',
					'rgba(50,144,255,0.6)',
					'rgba(50,144,255,0.6)',
					'rgba(50,144,255,0.6)',
					'rgba(50,144,255,0.6)',
				],
				borderWidth:1,
				borderColor: '#777',
				hoverBorderColor:'#000',
				hoverBorderWidth:3
			}]
		}
	});

	//Echelle du graphique
	Chart.scaleService.updateScaleDefaults('linear', {
		ticks: {
			min: 0,
			max: 12
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
			
			<canvas id="myChart" height="300" width="500"></canvas>			
		</div>

	);
}


export default Sleep;