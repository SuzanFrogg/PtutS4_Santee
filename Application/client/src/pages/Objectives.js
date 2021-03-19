import React, { useEffect, useState } from "react";
import axios from "axios";
import { daysNames, monthsNames } from "../utils/date.js";

function Objectives() {

	//vaccins
	const [listObjectives, setListObjectives] = useState([]);

	useEffect(() => 
	{
		let isMounted = true;

		//Initialiser vaccins
		const fetchObj = async () =>
		{
			const response =  await axios.post('api/objectives/findDate', { "DateStart" :  "1900-04-01T15:00:00.002Z", "DateEnd" :  "2300-04-28T15:23:59.002Z" });
			//const response = await axios.get('/api/objectives/');
			if (isMounted) setListObjectives(response.data.objectives);
		}


		fetchObj();
		return () => { isMounted = false };
	}, [JSON.stringify(listObjectives)]);



	return (
		<section>
			<h1>Objectifs</h1>
					<ul>
						{listObjectives && listObjectives.map((objectif, key) => {
							//terminé?
							let termine = "Non";
							if(objectif.isDone)
							{
								termine = "Oui";
							}

							//date
							let date =  new Date(objectif.dateEnd);

							console.log(objectif.dateEnd);
							console.log(date);
							//date de fin
							return <li  key={key}>{objectif.obj} 
								<ul> 
								<li>TEMP id : {objectif._id}</li>
									<li>Terminé : {termine}</li>
									<li>Date de fin prévue : {daysNames[date.getDate()] + " " + date.getDate() + " " + monthsNames[date.getMonth()] + " " + date.getFullYear()}</li>
									</ul>
								</li>
						})}
					</ul>
		</section>
	);
}

export default Objectives;