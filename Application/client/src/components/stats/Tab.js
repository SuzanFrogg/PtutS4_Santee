import React from "react";
import {NavLink} from "react-router-dom";

function Tab(props) {
	return (
		<li>
			<NavLink to={props.destination} activeClassName="tab-active">
				{props.icon}
			</NavLink>
		</li>
	)
}

export default Tab
