import React from "react";

function Menstruation_add()
{
    return (
		<div>
			<h1>Règles</h1>

            <form action="">
                <label for="dateR">Date</label>
                <input type="date" name="dateR"></input> {/*placeholder current date ? */}

                <label>Flux</label> 
                <input type="img" src="../../temp1.png" name="lowFlux"></input>
                <input type="img" src="../../temp1.png" name="medianFlux"></input>
                <input type="img" src="../../temp1.png" name="hightFlux"></input>

                <label>Douleur</label>
                <input type="img" src="../../temp1.png" name="stomacPain"></input>
                <input type="img" src="../../temp1.png" name="headPain"></input>

                <input type="submit" name="submitMenstruation">Valider</input>


            </form>
		</div>
	);

}


export default Menstruation_add;