import React from "react";
import {useState} from "react";
import axios from "axios";


function BloodDonation_add(props)
{
  const [date, setDate] = useState("");
  const [dons, setDon] = useState("DonsSang");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (date === "" || dons === "")
        throw Error("missing data");

      if (dons === "DonsSang"){
        await axios.put("/api/don/addSang", {dateDon : date});
      }
      else if (dons === "DonsPlasma"){
        await axios.put("/api/don/addPlasma", {dateDon : date});
      }
      else if (dons === "DonsPlaquette"){
        await axios.put("/api/don/addPlaquette", {dateDon : date});
      }
      props.handleAlert("success", "Les données ont bien été ajoutées");
    }
    catch (err) {
      props.handleAlert("error", "L'ajout des données n'a pas pu être exécuté");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-dons">
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