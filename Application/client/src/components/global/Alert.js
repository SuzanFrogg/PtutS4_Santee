import React from "react";

function Alert(props) {
	return (
		<div className={`alert ${props.state}`}>
			{props.text}
		</div>
	)
}

export default Alert;
