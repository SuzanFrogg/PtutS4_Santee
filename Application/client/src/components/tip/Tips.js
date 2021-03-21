import React,{useEffect, useState} from "react";
import axios from "axios";

function Tips() {
    const [tips, setTips] = useState("Pas d'astuce pour aujourd'hui !");
    useEffect(()=> {
        let isMounted = true;
        console.log("useEffect");
        //Recup d'une astuce
        const fetchTip = async () => {
            console.log(tips);
            const dataTips = await axios.get('api/astuce/',{withCredentials: true});
            console.log("test" +dataTips.data);
            if(isMounted) {
                setTips(dataTips.data.astuce);
            }
        }

        fetchTip();
        console.log("fetch : "+tips);
		return () => { isMounted = false };
    },[tips]);

    return (
        <>
            <p>{tips}</p>
        </>
    );
}

export default Tips