import React, {useState } from "react";
import { useUser } from "../../utils/store.js";
import axios from "axios";

function ModifyObjectives(props) {

    const {user} = useUser();


	const [obj, setObj] = useState(props.obj.obj);
    const [isDone, setIsDone] = useState(props.obj.isDone);
	const [dateEnd, setDateEnd] = useState(props.obj.dateEnd);

   // let date =  new Date(dateEnd);
    /*const testDate = new Date.now();
    testDate.setDate(date.getDate());
    testDate.setFullYear(date.getFullYear());
    testDate.setMonth(date.getMonth());*/
   // console.log(date);

   
    const handleSubmit = async (nbButton) => {

        if (nbButton === 1)
        {

            await axios.put("/api/objectives/" + props.obj._id, { userId: user._id, isDone: isDone, obj: obj, dateEnd : dateEnd}); 

            window.location.reload(true); //recharger la page
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
						checked={isDone} 
						onChange={(event) => setIsDone(event.target.checked)}
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