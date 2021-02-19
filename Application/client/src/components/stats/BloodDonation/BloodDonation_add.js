import React from "react";

function BloodDonation_add()
{
    return (
		<div>
			<h2>Dons du Sang</h2>

			<form action="">
                <label for="dateD">Date</label>
                <input type="date" name="dateD"></input>

                <label>Dons</label> 
                <input type="img" src="../../temp1.png" name="sang"></input>
                <input type="img" src="../../temp1.png" name="plaquette"></input>
                <input type="img" src="../../temp1.png" name="plasma"></input>

                <input type="submit" name="submitDons">Valider</input>


            </form>
		</div>
	);
}



export default BloodDonation_add;