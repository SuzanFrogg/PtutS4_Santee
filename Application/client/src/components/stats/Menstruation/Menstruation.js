import React from "react";
import Menstruation_add from "./Menstruation_add";
import {useState} from "react";

function Menstruation()
{
    const [showAddForm, setShowAddForm] = useState(false);
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
			<div>
				<button onClick={(event) => setShowAddForm(true)}> Ajouter </button>
				{showAddForm && <Menstruation_add />}
			</div>
		</>
	);
}


export default Menstruation;