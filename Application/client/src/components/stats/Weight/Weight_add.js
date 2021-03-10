import React from "react";
import {useState} from "react";

function Weight_add()
{
  const [date, setDate] = useState("");
  const [poids, setpoids] = useState("");
  const [taille, setTaille] = useState("");

  const handleSubmit = async (event) => {
      event.preventDefault();
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
                  onChange={(event) => setpoids(event.target.value)}
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