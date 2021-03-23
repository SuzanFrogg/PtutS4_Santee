import React from "react";
import {useState} from "react";
import axios from "axios";
import { useUser } from "../../../utils/store.js";


function BloodDonation_add()
{

  const uid = useUser();
  const [date, setDate] = useState("");
  const [dons, setDon] = useState("");

  const handleSubmit = async (event) => {
      event.preventDefault();

      await axios.put("/api/don/", {userId: uid.user._id, date : date, don : dons});
  }
      

  return (
    <form action="" onSubmit={handleSubmit} className="form-dons">
        <label htmlFor="dateD">Date</label>
        <input 
          type="date" 
          id="dateD"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />

        <label htmlFor="dons">Type de don</label> 
        <select id="fluxPeriods" onChange={(event) => setDon(event.target.value)}>
            <option type="text" value='DonsSang'>Sang</option>
            <option type="text" value='DonsPlasma'>Plasma</option>
            <option type="text" value='DonsPlaquette'>Plaquette</option>
        </select>

        <input type="submit" value="Valider"/>

    </form>
  );
}



export default BloodDonation_add;