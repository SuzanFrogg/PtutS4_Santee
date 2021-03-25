import React from "react";
import axios from "axios";

function DeleteObjectives(props) {

    const handleSubmit = async (nbButton) => {
        if (nbButton === 1)
        {
            await axios.delete("/api/objectives/" + props.obj._id);
            window.location.reload(); //recharger la page
        }

       props.handle(false);
    }

	return (

        <div className="data-delete">
            <h3>Supprimer</h3>

            <p>Voulez vous vraiment supprimer cet objectif?</p>   

			<button  type ="button" onClick={() => handleSubmit(1) }>Valider</button>
			<button type ="button" onClick={() => handleSubmit(2) }>Annuler</button>            

        </div>

	);
}

export default DeleteObjectives;