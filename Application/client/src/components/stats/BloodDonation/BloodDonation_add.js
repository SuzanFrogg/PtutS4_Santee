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

      if (dons == "DonsSang"){
        await axios.put("/api/don/addSang", {userId: uid.user._id, dateDon : date});
      }
      else if (dons == "DonsPlasma"){
        await axios.put("/api/don/addPlasma", {userId: uid.user._id, dateDon : date});
      }
      else if (dons == "DonsPlaquette"){
        await axios.put("/api/don/addPlaquette", {userId: uid.user._id, dateDon : date});
      }
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