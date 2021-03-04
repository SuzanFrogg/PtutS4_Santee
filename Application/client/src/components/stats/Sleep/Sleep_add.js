import React from "react";

function Sleep_add()
{
    const [date, setDate] = useState("");
    const [timeS, setTimeS] = useState("");
    const [timeR, setTimeR] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
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