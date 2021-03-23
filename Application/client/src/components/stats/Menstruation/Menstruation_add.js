import React from "react";
import {useState} from "react";
import axios from "axios";
import { useUser } from "../../../utils/store.js";

function Menstruation_add()
{
    const uid = useUser();
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [flux, setFlux] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        await axios.put("/api/periods/", {userId: uid.user._id, dateStart : dateStart, dateEnd : dateEnd, flux : flux});
    }
        

    return (
		  <form action="" onSubmit={handleSubmit} className="form-dons">
          <label htmlFor="dateStart">Date de début</label>
          <input 
            type="date" 
            id="dateStart"
            value={dateStart}
            onChange={(event) => setDateStart(event.target.value)}
          />
          <label htmlFor="dateEnd">Date de fin</label>
          <input 
            type="date" 
            id="dateEnd"
            value={dateEnd}
            onChange={(event) => setDateEnd(event.target.value)}
          />

          <label htmlFor="flux">Flux</label> 
          <select id="fluxPeriods" onChange={(event) => setFlux(event.target.value)}>
            <option type="number" value='0'>Faible</option>
            <option type="number" value='1'>Moyen</option>
            <option type="number" value='2'>Elevé</option>
          </select>    

          <input type="submit" value="Valider"/>

      </form>
	);

}


export default Menstruation_add;
