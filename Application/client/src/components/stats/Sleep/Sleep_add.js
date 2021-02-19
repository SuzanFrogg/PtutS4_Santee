import React from "react";

function Sleep_add()
{
    return (
		<div>
			<h2>Sommeil</h2>

			<form action="">
                <label for="dateS">Date</label>
                <input type="date" name="dateS"></input>

                <label>Temps</label> 
                <input type="time" name="timeS"></input>
				<input type="time" name="timeR"></input>

                <input type="submit" name="submitSommeil">Valider</input>

            </form>
		</div>
	);
}


export default Sleep_add;