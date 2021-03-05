import React from "react";

function Menstruation()
{
    return (
		<>
			<h2>Règles</h2>
			<div className="data-recap">
				<div className="data-card">
					<p>Durée moyenne du cycle</p>
					<span>28<small>j</small></span>
				</div>
				<div className="data-card">
					<p>Durée moyenne des règles</p>
					<span>28<small>j</small></span>
				</div>
				<div className="data-card">
					<p>Fluctuation moyenne du cycle</p>
					<span>28<small>j</small></span>
				</div>						
			</div>
		</>
	);
}


export default Menstruation;