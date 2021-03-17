import React from "react";
import { ReactComponent as Lock } from "../../media/icons/lock.svg";

function Success(props) {
	return (
        <li className="success-item">
            <div className="success-icon">{props.lock ? <Lock /> : props.icon}</div>
            <p>{props.text}</p>
        </li>
	);
}

export default Success;