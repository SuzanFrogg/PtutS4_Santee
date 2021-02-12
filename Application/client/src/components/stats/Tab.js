import React from "react";
import {Link} from "react-router-dom";

function Tab(props) {
	return (
		<li>
			<Link to={props.destination}>
				{props.icon}
			</Link>
		</li>
	)
}

export default Tab
