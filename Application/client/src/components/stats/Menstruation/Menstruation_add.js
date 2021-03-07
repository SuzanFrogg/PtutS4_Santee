import React from "react";
import {useState} from "react";

function Menstruation_add()
{
    const [date, setDate] = useState("");
    const [low, setLow] = useState("");
    const [medium, setMedium] = useState("");
    const [high, setHigh] = useState("");
    const [estomac, setStomach] = useState("");
    const [tete, setHead] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
    }
        

    return (
		  <form action="" onSubmit={handleSubmit} className="form-dons">
          <label htmlFor="dateR">Date</label>
          <input 
            type="date" 
            id="dateR"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />

          <label htmlFor="flux">Flux</label> 
          <input 
            type="img" 
            name="low"
            src="../../temp1.png"
            value={low}
            onChange={(event) => setLow(event.target.value)}
          />
                
		  <input 
            type="img" 
            name="medium"
            src="../../temp1.png"
            value={medium}
            onChange={(event) => setMedium(event.target.value)}
          />

          <input 
            type="img" 
            name="high"
            src="../../temp1.png"
            value={high}
            onChange={(event) => setHigh(event.target.value)}
          />

          <label htmlFor="douleur">Douleur</label> 
          <input 
            type="img" 
            id="estomac"
            src="../../temp1.png"
            value={estomac}
            onChange={(event) => setStomach(event.target.value)}
          />

          <input 
            type="img" 
            id="tete"
            src="../../temp1.png"
            value={tete}
            onChange={(event) => setHead(event.target.value)}
          />

          <input type="submit" value="Valider"/>

      </form>
	);

}


export default Menstruation_add;
