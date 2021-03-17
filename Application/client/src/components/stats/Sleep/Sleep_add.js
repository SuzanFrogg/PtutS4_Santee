import React from "react";
import {useState} from "react";
import axios from "axios";
import { useUser } from "../../../utils/store.js";

function Sleep_add()
{
    const user = useUser();
    const [date, setDate] = useState("");
    const [timeS, setTimeS] = useState("");
    const [timeR, setTimeR] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        await axios.put("/api/sleep/", {userId: user._id, dateStart : timeS, dateEnd : timeR});
    }
        

    return (
			<form action="" onSubmit={handleSubmit} className="form-sleep">
                <label htmlFor="dateS">Date</label>
                <input 
                    type="date" 
                    id="dateS"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                />

                <label htmlFor="time">Temps</label> 
                <input 
                    type="time" 
                    id="timeS"
                    value={timeS}
                    onChange={(event) => setTimeS(event.target.value)}
                />
                
				<input 
                    type="time" 
                    id="timeR"
                    value={timeR}
                    onChange={(event) => setTimeR(event.target.value)}
                />

                <input type="submit" value="Valider"/>

            </form>
	);
}


export default Sleep_add;