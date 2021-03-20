import React,{useEffect, useState} from "react";
import axios from "axios";

function Tips() {
    const [tips, setTips] = useState("Pas d'astuce pour aujourd'hui !");
    useEffect(()=> {
        let isMounted = true;

        //Recup d'une astuce
        const fetchTip = async () => {
            const dataTips = await axios.get('api/astuce',{withCredentials: true});
            if(isMounted) {
                setTips(dataTips.data.astuce);
            }
        }

        fetchTip();
		return () => { isMounted = false };
    },[]);

    return (
        <>
            <p>{tips}</p>
        </>
    );
}

export default Tips