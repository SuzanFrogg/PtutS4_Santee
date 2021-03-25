import React from "react";
import {useState} from "react";
import axios from "axios";

function Weight_add(props)
{
    const [date, setDate] = useState("");
    const [poids, setPoids] = useState("");
    const [taille, setTaille] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (date === "" || poids === "" || taille === "")
                throw Error("missing data");

            await axios.put("/api/weight/", {entryDate: date, mass: poids, height: taille});
            props.handleAlert("success", "Les données ont bien été ajoutées");
        }
        catch (err) {
            props.handleAlert("error", "L'ajout des données n'a pas pu être exécuté");
        }
    }
      

    return (
        <form action="" onSubmit={handleSubmit} className="form-weight">
                <label htmlFor="dateS">Date</label>
                <input 
                    type="date" 
                    id="dateP"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                />

                <label htmlFor="weight">Poids</label> 
                <input 
                    type="number" 
                    id="poids"
                    value={poids}
                    onChange={(event) => setPoids(event.target.value)}
                />
                
            <label htmlFor="height">Taille</label> 
                <input 
                    type="number" 
                    id="taille"
                    value={taille}
                    onChange={(event) => setTaille(event.target.value)}
                />

                <input type="submit" value="Valider"/>

            </form>
    );
}


export default Weight_add;