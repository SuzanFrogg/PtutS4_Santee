import React from "react";

function Weight_add()
{
    return (
		<div>
			<h2>Poids</h2>

			<form action="">
                <label for="dateP">Date</label>
                <input type="date" name="dateP"></input>

                <label>Poids</label> 
                <input type="text" name="poids"></input>

                <label>Taille</label>
                <input type="text" name="taille"></input>

                <input type="submit" name="submitP">Valider</input>


            </form>
		</div>
	);
}


export default Weight_add;