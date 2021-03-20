import React, {useState } from "react";
import { useUser } from "../../utils/store.js";
import axios from "axios";

function ModifyObjectives(props) {

    const uid = useUser();


	const [obj, setObj] = useState(props.obj.obj);
    const [isDone, setIsDone] = useState("");//props.obj.isDone);
	const [dateEnd, setDateEnd] = useState(props.obj.dateEnd);

    
    const handleSubmit = async (nbButton) => {

        if (nbButton === 1)
        {
            console.log(isDone);
            //await axios.put("/api/objectives/", { userId: uid.user._id, isDone: isDone, obj: obj, dateEnd : dateEnd}); 
        }

       props.handle(false);
    }

	return (

        <div className="modifyObjectives">
            <h3>Modifier</h3>

            <form action="" className="form-objectives">
                

            <label htmlFor="obj">Objectif : </label> 
					<input 
						type="text" 
						id="obj"
						value={obj}
						onChange={(event) => setObj(event.target.value)}
					/>

                    <label htmlFor="isDone">Terminé</label> 
					<input 
						type="checkbox" 
						id="isDone"
						value="Terminé"  
						onChange={(event) => setIsDone(event.target.value)}
					/>

					<label htmlFor="dateEnd">Date limite pour atteindre l'objectif : </label> 
					<input 
						type="date" 
						id="dateEnd"
						value={dateEnd}
						onChange={(event) => setDateEnd(event.target.value)}
					/>
                
	

                <button  type ="button" onClick={() => handleSubmit(1) }  >Valider</button>
                <button type ="button" onClick={() => handleSubmit(2) }>Annuler</button>


            </form>
            

            

        </div>

	);
}

export default ModifyObjectives;