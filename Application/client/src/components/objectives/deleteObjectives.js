import React, {useState } from "react";
import { useUser } from "../../utils/store.js";
import axios from "axios";

function DeleteObjectives(props) {

    const uid = useUser();

	const idObj = props.obj._id;
	const test = "" + idObj;
	console.log(test);
	console.log(uid.user._id);
    
    const handleSubmit = async (nbButton) => {

        if (nbButton === 1)
        {
            await axios.delete(`/api/objectives/${test}` , { userId: uid.user._id}); 
        }

       props.handle(false);
    }

	return (

        <div className="deleteObjectives">
            <h3>Supprimer</h3>

            <p>Voulez vous vraiment supprimer cet objectif?</p>   

			<button  type ="button" onClick={() => handleSubmit(1) }>Valider</button>
			<button type ="button" onClick={() => handleSubmit(2) }>Annuler</button>            

        </div>

	);
}

export default DeleteObjectives;