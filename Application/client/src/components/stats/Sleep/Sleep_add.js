import React from "react";
import {useState} from "react";
import axios from "axios";

function Sleep_add(props)
{
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (dateStart === "" || dateEnd === "")
                throw Error("missing data");
            
            await axios.put("/api/sleep/", {dateStart, dateEnd});
            props.handleAlert("success", "Les données ont bien été ajoutées");
        }
        catch (err) {
            props.handleAlert("error", "L'ajout des données n'a pas pu être exécuté");
        }
    }
        

    return (
			<form action="" onSubmit={handleSubmit} className="form-sleep">
                <label htmlFor="dateStart">Date d'endormissement</label>
                <input 
                    type="datetime-local" 
                    id="dateStart"
                    value={dateStart}
                    onChange={(event) => setDateStart(event.target.value)}
                />
                <label htmlFor="dateend">Date de réveil</label>
                <input 
                    type="datetime-local" 
                    id="dateEnd"
                    value={dateEnd}
                    onChange={(event) => setDateEnd(event.target.value)}
                />

                <input type="submit" value="Valider"/>

            </form>
	);
}



export default Sleep_add;