import React from "react";
import {useState} from "react";
import axios from "axios";
import { useUser } from "../../../utils/store.js";

function Sleep_add()
{
    const uid = useUser();
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        await axios.put("/api/sleep/", {userId: uid.user._id, dateStart : dateStart, dateEnd : dateEnd});
    }
        

    return (
			<form action="" onSubmit={handleSubmit} className="form-sleep">
                <label htmlFor="dateStart">Date d'endormissement</label>
                <input 
                    type="datetime-local" 
                    id="dateStart"
                    value={dateStart}
                    onChange={(event) => setDateStart(event.target.value)}
                />
                <label htmlFor="dateend">Date de réveil</label>
                <input 
                    type="datetime-local" 
                    id="dateEnd"
                    value={dateEnd}
                    onChange={(event) => setDateEnd(event.target.value)}
                />

                <input type="submit" value="Valider"/>

            </form>
	);
}



export default Sleep_add;