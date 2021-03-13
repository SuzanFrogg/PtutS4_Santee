import React, {useState } from "react";
import { useUser } from "../../../utils/store.js";
import axios from "axios";

function AddVaccines(props) {

    const uid = useUser();


    const [name, setName] = useState("");
    const [possibleStartAge, setPossibleStartAge] = useState("");
    const [possibleEndAge, setPossibleEndAge] = useState("");
    const [doseNeeded, setDoseNeeded] = useState("");
    const [doseMade, setDoseMade] = useState("");


    
    const handleSubmit = async (nbButton) => {

        if (nbButton === 1)
        {
            await axios.put("/api/vaccines/", { userId: uid.uid, name: name, possibleStartAge : possibleStartAge, possibleEndAge : possibleEndAge, doseNeeded : doseNeeded, doseMade : doseMade});
        }

       props.handle(false);
    }

	return (

        <div className="addVaccine">
            <h3>Ajout d'un vaccin</h3>

            <form action="" className="form-vaccines">
                

                <label htmlFor="name">Nom</label> 
                <input 
                    type="text" 
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />

                <label htmlFor="possibleStartAge">Age de première prise</label> 
                <input 
                    type="number" 
                    id="possibleStartAge"
                    value={possibleStartAge}
                    onChange={(event) => setPossibleStartAge(event.target.value)}
                />

                <label htmlFor="possibleEndAge">Age de dernière prise</label> 
                <input 
                    type="number" 
                    id="possibleEndAge"
                    value={possibleEndAge}
                    onChange={(event) => setPossibleEndAge(event.target.value)}
                />

                <label htmlFor="doseNeeded">Dose a prendre</label> 
                <input 
                    type="number" 
                    id="doseNeeded"
                    value={doseNeeded}
                    onChange={(event) => setDoseNeeded(event.target.value)}
                />

                <label htmlFor="doseMade">Dose prises</label> 
                <input 
                    type="number" 
                    id="doseMade"
                    value={doseMade}
                    onChange={(event) => setDoseMade(event.target.value)}
                />
                
	

                <button  type ="button" onClick={() => handleSubmit(1) }  >Valider</button>
                <button type ="button" onClick={() => handleSubmit(2) }>Annuler</button>


            </form>
            

            

        </div>

	);
}

export default AddVaccines;