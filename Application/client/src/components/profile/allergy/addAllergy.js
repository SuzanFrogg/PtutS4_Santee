import React, {useState } from "react";
import { useUser } from "../../../utils/store.js";
import axios from "axios";

function AddAllergy(props) {

    const {user} = useUser();


    const [toAvoid, setToAvoid] = useState("");


    
    const handleSubmit = async (nbButton) => {

        if (nbButton === 1)
        {
            await axios.put("/api/allergy/", { userId: user._id, toAvoid : toAvoid});
        }

       props.handle(false);
    }

	return (

        <div className="addAllergy">
            <h3>Ajout d'une Allergie</h3>

            <form action="" className="form-allergy">
                

                <label htmlFor="name">A eviter</label> 
                <input 
                    type="text" 
                    id="toAvoid"
                    value={toAvoid}
                    onChange={(event) => setToAvoid(event.target.value)}
                />

                <button  type ="button" onClick={() => handleSubmit(1) }  >Valider</button>
                <button type ="button" onClick={() => handleSubmit(2) }>Annuler</button>


            </form>
            

            

        </div>

	);
}

export default AddAllergy;