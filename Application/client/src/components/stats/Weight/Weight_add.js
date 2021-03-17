import React from "react";
import {useState} from "react";
import axios from "axios";
import { useUser } from "../../../utils/store.js";

function Weight_add()
{

    const user = useUser();
    const [date, setDate] = useState("");
    const [poids, setPoids] = useState("");
    const [taille, setTaille] = useState("");

    const handleSubmit = async (event) => {
      event.preventDefault();

      await axios.put("/api/weight/", {userId: user._id, entryDate : date, mass : poids});
    }
      

    return (
        <form action="" onSubmit={handleSubmit} className="form-sleep">
                <label htmlFor="dateS">Date</label>
                <input 
                    type="date" 
                    id="dateP"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                />

                <label htmlFor="time">Poids</label> 
                <input 
                    type="text" 
                    id="poids"
                    value={poids}
                    onChange={(event) => setPoids(event.target.value)}
                />
                
            <label htmlFor="time">Taille</label> 
                <input 
                    type="text" 
                    id="taille"
                    value={taille}
                    onChange={(event) => setTaille(event.target.value)}
                />

                <input type="submit" value="Valider"/>

            </form>
    );
}


export default Weight_add;