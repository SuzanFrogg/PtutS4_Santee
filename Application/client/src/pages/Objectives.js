import React, { useEffect, useState } from "react";
import axios from "axios";

function Objectives() {

	//vaccins
	const [listObjectives, setListObjectives] = useState([]);

	useEffect(() => 
	{
		let isMounted = true;

		//Initialiser vaccins
		const fetchObj = async () =>
		{
			const response = await axios.get('/api/objectives/');//2021-02-04T15:13:30.002Z');
			if (isMounted) setListObjectives(response.data.objectives);
		}


		fetchObj();
		return () => { isMounted = false };
	}, [JSON.stringify(listObjectives)]);



	return (
		<section>
			<h3>objectifs</h3>
					<ul>
						{listObjectives && listObjectives.map((objectif, key) => {
							
							return <li  key={key}>{objectif.obj}</li>
						})}
					</ul>
		</section>
	);
}

export default Objectives;