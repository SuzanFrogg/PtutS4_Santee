import React from "react";
import {useState} from "react";

function BloodDonation_add()
{
  const [date, setDate] = useState("");
  const [sang, setSang] = useState("");
  const [plaquette, setPlaquette] = useState("");
  const [plasma, setPlasma] = useState("");

  const handleSubmit = async (event) => {
      event.preventDefault();
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

        <label htmlFor="dons">Dons</label> 
        <input 
          type="image" 
          id="sang"
          src="../../../media/icons/stats/temp1.png"
          value={sang}
          onChange={(event) => setSang(event.target.value)}
        />
              
        <input 
          type="image" 
          id="plaquette"
          src="../../../media/icons/stats/temp1.png"
          value={plaquette}
          onChange={(event) => setPlaquette(event.target.value)}
        />

        <input 
          type="image" 
          id="plasma"
          src="../../../media/icons/stats/temp1.png"
          value={plasma}
          onChange={(event) => setPlasma(event.target.value)}
        />

        <input type="submit" value="Valider"/>

    </form>
);
}



export default BloodDonation_add;